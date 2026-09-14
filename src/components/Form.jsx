import EducationFormEntry from "./EducationFormEntry";
import WorkHistoryFormEntry from "./WorkHistoryFormEntry";
import { getEducationTemplate, getWorkHistoryTemplate } from "../dataTemplates";

export default function Form({data, setLoadFormIfTrue, updateData}) {
    function addEntry(workOrEducation) {
        let updatedData = {...data};
        let id = crypto.randomUUID();
        
        if (workOrEducation === 'work') {
            updatedData.workHistory.push({id: id, workHistory: getWorkHistoryTemplate()});
        } else if (workOrEducation === 'education') {
            updateData.education.push({id: id, education: getEducationTemplate()});
        }

        updateData(updatedData);
    }
    
    function deleteEntry(workOrEducation, id) {
        let updatedData = {...data};
        let arrayToSearch;

        if (workOrEducation === 'work') {
            arrayToSearch = updatedData.workHistory;
        } else if (workOrEducation === 'education') {
            arrayToSearch = updatedData.education;
        } else {
            return;
        }
        
        arrayToSearch = arrayToSearch.filter((entry) => {
            entry.id != id;
        });

        updateData(updatedData);
    }

    function updatePersonalInformation(newVal, whatsUpdating) {
        let updatedData = {...data};

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
    
    return (
    <form>
        <div>
            <h1>Personal Information</h1>
            <div id="nameContainer">
                <label htmlFor="firstName">First Name: </label>
                <input type="text" name="firstName" id='firstName' onChange={(e)=> updatePersonalInformation(e.target.value, 'firstName')} required>{data.firstName}</input>
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" name="lastName" id="lastName" onChange={(e)=> updatePersonalInformation(e.target.value, 'lastName')} required>{data.lastName}</input>
            </div>
            <div id="contactInfoContainer">
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" autoComplete="email" onChange={(e)=> updatePersonalInformation(e.target.value, 'email')} required>{data.email}</input>
                <label htmlFor="phone">Phone: </label>
                <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone" id="phone" autoComplete="off" onChange={(e)=> updatePersonalInformation(e.target.value, 'phone')} required>{data.phone}</input>
            </div>
        </div>
        <div>
            <h1>Work History</h1>
            {data.workHistory.map((entry) => (
                <WorkHistoryFormEntry
                    key={entry.id}
                    workHistoryObject={entry}
                    deleteEntry={deleteEntry}>
                </WorkHistoryFormEntry>
            ))}
            <button onClick={() => addEntry('createNewWorkHistoryEntry')}>Add Work History</button>
        </div>
        <div>
            <h1>Education</h1>
            {data.education.map((entry) => (
                <EducationFormEntry
                    key={entry.id}
                    educationObject={entry}
                    deleteEntry={deleteEntry}>
                </EducationFormEntry>
            ))}
            <button onClick={() => addEntry('createNewEducationEntry')}>Add Education</button>
        </div>
        <button onClick={() => setLoadFormIfTrue(false)}>Submit</button>
    </form>
    )
}