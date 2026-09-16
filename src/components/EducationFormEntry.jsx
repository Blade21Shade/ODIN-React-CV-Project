import { deepCopyData } from "../dataTemplates";

export default function EducationFormEntry({data, updateData, educationObject, deleteEntry}) {
    
    let education = educationObject.education;
    let id = educationObject.id;

    function updateEducation(newVal, whatsUpdating) {
        let updatedData = deepCopyData(data);
        
        let newEducation = {...education};

        if (whatsUpdating === 'school') {
            newEducation.school = newVal;
        } else if (whatsUpdating === 'educationLevel') {
            newEducation.educationLevel = newVal;
        } else if (whatsUpdating === 'educationField') {
            newEducation.educationField = newVal;
        } else if (whatsUpdating === 'startDate') {
            newEducation.startDate = newVal;
        } else if (whatsUpdating === 'endDate') {
            newEducation.endDate = newVal;
        } else {
            return;
        }

        updatedData.education.forEach(element => {
            if (id === element.id) {
                element.education = newEducation;
            }
        });

        updateData(updatedData);
    }

    return(
        <div>
            <label htmlFor="school">School: </label>
            <input name="school" id="school" type="text" value={education.school} onChange={(e)=>updateEducation(e.target.value, 'school')} required></input>

            <label htmlFor="field">Field of study: </label>
            <input name="field" id="field" type="text" value={education.educationField} onChange={(e)=>updateEducation(e.target.value, 'field')} required></input>

            <label htmlFor="level">Education Level: </label>
            <select name="level" id="level" onChange={(e)=>updateEducation(e.target.value, 'educationLevel')} required>
                <option value="">Select a Level</option>
                <option value="High School">High School</option>
                <option value="Associate's">Associate's</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="Doctorate">Doctorate</option>
            </select>

            <label htmlFor="startDate">Start Date: </label>
            <input
                name="startDate"
                id="startDate"
                type="date"
                value={education.startDate}
                onChange={(e)=>updateEducation(e.target.value, 'startDate')}
                required>
            </input>

            <label htmlFor="endDate">End Date: </label>
            <input
                name="endDate"
                id="endDate"
                type="date"
                value={education.endDate}
                onChange={(e)=>updateEducation(e.target.value, 'endDate')}
                required>
            </input>

            <button type='button' onClick={() => deleteEntry('education', id)}>Delete</button>
        </div>
    )
}