import EducationFormEntry from "./EducationFormEntry";
import WorkHistoryFormEntry from "./WorkHistoryFormEntry";
import { getEducationTemplate, getWorkHistoryTemplate, deepCopyData} from "../dataTemplates";

export default function Form({data, setLoadFormIfTrue, updateData}) {
    function addEntry(workOrEducation) {
        let updatedData = deepCopyData(data);
        let id = crypto.randomUUID();
        
        if (workOrEducation === 'work') {
            updatedData.workHistory.push({id: id, workHistory: getWorkHistoryTemplate()});
        } else if (workOrEducation === 'education') {
            updateData.education.push({id: id, education: getEducationTemplate()});
        }

        updateData(updatedData);
    }
    
    function deleteEntry(workOrEducation, id) {
        let updatedData = deepCopyData(data);
        let arrayToSearch;

        if (workOrEducation === 'work') {
            arrayToSearch = updatedData.workHistory;
        } else if (workOrEducation === 'education') {
            arrayToSearch = updatedData.education;
        } else {
            return;
        }
        
        for (let i = 0; i < arrayToSearch.length; i++) {
            if (arrayToSearch[i].id === id) {
                arrayToSearch.splice(i, 1);
                break;
            }
        }

        updateData(updatedData);
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
    
    return (
    <form>
        <div>
            <h1>Personal Information</h1>
            <div id="nameContainer">
                <label htmlFor="firstName">First Name: </label>
                <input type="text" name="firstName" id='firstName' onChange={(e)=> updatePersonalInformation(e.target.value, 'firstName')} required></input>
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
                    deleteEntry={deleteEntry}>
                </EducationFormEntry>
            ))}
            <button type='button' onClick={() => addEntry('education')}>Add Education</button>
        </div>
        <button onClick={() => setLoadFormIfTrue(false)}>Submit</button>
    </form>
    )
}