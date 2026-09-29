import EducationFormEntry from "./EducationFormEntry";
import WorkHistoryFormEntry from "./WorkHistoryFormEntry";
import { getEducationTemplate, getWorkHistoryTemplate, deepCopyData} from "../dataTemplates";
import { useState } from "react";

export default function Form({data, setLoadFormIfTrue, updateData}) {
    const [badInputs, setBadInputs] = useState({work: [], education: []});
    
    function addEntry(workOrEducation) {
        let updatedData = deepCopyData(data);
        let id = crypto.randomUUID();
        
        if (workOrEducation === 'work') {
            updatedData.workHistory.push({id: id, workHistory: getWorkHistoryTemplate()});
        } else if (workOrEducation === 'education') {
            updatedData.education.push({id: id, education: getEducationTemplate()});
        }

        updateData(updatedData);
    }
    
    function deleteEntry(workOrEducation, id) {
        let updatedData = deepCopyData(data);
        let copyBI = copyBadInputs();
        
        let dataArrayToSearch;
        let badInputArrayToSearch;

        if (workOrEducation === 'work') {
            dataArrayToSearch = updatedData.workHistory;
            badInputArrayToSearch = copyBI.work;
        } else if (workOrEducation === 'education') {
            dataArrayToSearch = updatedData.education;
            badInputArrayToSearch = copyBI.education;
        } else {
            return;
        }
        
        // Delete from data
        for (let i = 0; i < dataArrayToSearch.length; i++) {
            if (dataArrayToSearch[i].id === id) {
                dataArrayToSearch.splice(i, 1);
                break;
            }
        }

        // Delete from badInputs
        for (let i = 0; i < badInputArrayToSearch.length; i++) {
            if (badInputArrayToSearch[i].id === id) {
                badInputArrayToSearch.splice(i, 1);
                break;
            }
        }

        updateData(updatedData);
        setBadInputs(copyBI);
    }

    function updatePersonalInformation(newVal, whatsUpdating) {
        let updatedData = deepCopyData(data);

        if (whatsUpdating === 'firstName') {
            updatedData.firstName = newVal;
        } else if (whatsUpdating === 'lastName') {
            updatedData.lastName = newVal;
        } else if (whatsUpdating === 'email') {
            updatedData.email = newVal;
        } else if (whatsUpdating === 'phone') {
             updatedData.phone = newVal;
        }

        updateData(updatedData);
    }

    function updateBadInputs(id, workOrEducation, addOrRemove, field) {
        let copyBI = copyBadInputs();

        /**
         * Check comment inside copyBadInputs to see data structure format
         */

        let arrayToSearch;
        if (workOrEducation === 'work') {
            arrayToSearch = copyBI.work;
        } else {
            arrayToSearch = copyBI.education;
        }

        // Find the entry with the matching ID and process as needed
        let entry = findEntryByID(arrayToSearch, id);
        if (entry) {
            let index = entry.fields.indexOf(field);
            if (addOrRemove === 'add' && index === -1) {
                entry.fields.push(field);
            } else if (addOrRemove === 'remove' && index !== -1) {
                entry.fields.splice(index, 1);

                // If there's no more issues, remove this entry
                if (entry.fields.length === 0) {
                    arrayToSearch.splice(i, 1);
                }
            }
        } else if (addOrRemove === 'add') { // If an entry wasn't found but something needs to be added, make a new entry
            arrayToSearch.push({id: id, fields: [field]});
        }

        setBadInputs(copyBI);
    }

    function findEntryByID(arrayToSearch, id) {
        for (let i = 0; i < arrayToSearch.length; i++) {
            if (arrayToSearch[i].id  === id) {
                return arrayToSearch[i];
            }
        }
    }

    function copyBadInputs() {
        let copyBI = {work: [], education: []};
        /**
         * {
         *  work: [{id, [fields]}, ...]
         *  education: [{id, [fields]}, ...]
         * }
         */

        for (let i = 0; i < badInputs.work.length; i++) {
            let badWork = badInputs.work[0];
            let newBadWork = {id: badWork.id, fields:[...badWork.fields]};
            copyBI.work.push(newBadWork);
        }

        for (let i = 0; i < badInputs.education.length; i++) {
            let badEducation = badInputs.education[0];
            let newBadEducation = {id: badEducation.id, fields:[...badEducation.fields]};
            copyBI.education.push(newBadEducation);
        }

        return copyBI;
    }

    /**
     * Handles form submission by checking if inputs are valid
     * - The Form checks if required inputs are present, this function is solely for checking the validity of inputs
     * - If so, calls Parent component's setter for context switching
     * @param {Event} e 'submit' event from the Form
     */
    function handleFormSubmission(e) {

        e.preventDefault();
        let noIssues = true;
        
        if (badInputs.work.length > 0 || badInputs.education.length > 0) {
            noIssues = false;
        }

        if (noIssues) {
            setLoadFormIfTrue(false);
        }
    }
    
    return (
    <form onSubmit={handleFormSubmission}>
        <div>
            <h1>Personal Information</h1>
            <div id="nameContainer">
                <label htmlFor="firstName">First Name: </label>
                <input type="text" name="firstName" id='firstName' value={data.firstName} onChange={(e)=> updatePersonalInformation(e.target.value, 'firstName')} required></input>
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" name="lastName" id="lastName" value={data.lastName} onChange={(e)=> updatePersonalInformation(e.target.value, 'lastName')} required></input>
            </div>
            <div id="contactInfoContainer">
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" autoComplete="email" value={data.email} onChange={(e)=> updatePersonalInformation(e.target.value, 'email')} required></input>
                <label htmlFor="phone">Phone: </label>
                <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone" id="phone" autoComplete="off" value={data.phone} onChange={(e)=> updatePersonalInformation(e.target.value, 'phone')} required></input>
            </div>
        </div>
        <div>
            <h1>Work History</h1>
            {data.workHistory.map((entry) => (
                <WorkHistoryFormEntry
                    key={entry.id}
                    workHistoryObject={entry}
                    data={data}
                    updateData={updateData}
                    updateBadInputs={updateBadInputs}
                    deleteEntry={deleteEntry}>
                </WorkHistoryFormEntry>
            ))}
            <button type='button' onClick={() => addEntry('work')}>Add Work History</button>
        </div>
        <div>
            <h1>Education</h1>
            {data.education.map((entry) => (
                <EducationFormEntry
                    key={entry.id}
                    educationObject={entry}
                    data={data}
                    updateData = {updateData}
                    updateBadInputs= {updateBadInputs}
                    deleteEntry={deleteEntry}>
                </EducationFormEntry>
            ))}
            <button type='button' onClick={() => addEntry('education')}>Add Education</button>
        </div>
        <button>Submit</button>
    </form>
    )
}