import { deepCopyData } from "../dataTemplates";
import compareDates from "../tools/compareDates";
import { useRef } from "react";

export default function EducationFormEntry({data, updateData, updateBadInputs, educationObject, deleteEntry}) {
    
    // Used to display errors
    const reference = useRef(null);
    
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
            checkDates(newVal, newEducation.endDate);
        } else if (whatsUpdating === 'endDate') {
            newEducation.endDate = newVal;
            checkDates(newEducation.startDate, newVal);
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

    function checkDates(startDate, endDate) {
        let addOrRemove;

        // Don't check until both dates are added
        if (startDate === '' || endDate === '') {
            return;
        }

        if (compareDates(startDate, endDate)) {
            updateErrorPopUp('remove');
            addOrRemove = 'remove';
        } else {
            updateErrorPopUp('add');
            addOrRemove = 'add';
        }

        updateBadInputs(id, 'work', addOrRemove, 'dates');
    }

    function updateErrorPopUp(addOrRemove) {
        if (addOrRemove === 'add') {
            reference.current.hidden = false;
            reference.current.innerText = 'Dates incorrectly formatted: Start Date must be before End Date';
        } else {
            reference.current.hidden = true;
            reference.current.innerText = '';
        }
    }

    return(
        <div>
            <div id="errorPopUp" ref={reference} style={{backgroundColor: 'red'}} hidden></div>
            <label htmlFor="school">School: </label>
            <input name="school" id="school" type="text" value={education.school} onChange={(e)=>updateEducation(e.target.value, 'school')} required></input>

            <label htmlFor="field">Field of study: </label>
            <input name="field" id="field" type="text" value={education.educationField} onChange={(e)=>updateEducation(e.target.value, 'educationField')} required></input>

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