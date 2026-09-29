import { deepCopyData } from "../dataTemplates";
import compareDates from "../tools/compareDates";
import { useRef } from "react";

export default function WorkHistoryFormEntry({data, updateData, updateBadInputs, workHistoryObject, deleteEntry}) {

    // Used to display errors
    const reference = useRef(null);

    let workHistory = workHistoryObject.workHistory;
    let id = workHistoryObject.id;

    function updateWorkHistory(newVal, whatsUpdating) {
        let updatedData = deepCopyData(data);
        
        let newWorkHistory = {...workHistory};

        if (whatsUpdating === 'company') {
            newWorkHistory.company = newVal;
        } else if (whatsUpdating === 'position') {
            newWorkHistory.position = newVal;
        } else if (whatsUpdating === 'startDate') {
            newWorkHistory.startDate = newVal;
            checkDates(newVal, newWorkHistory.endDate);
        } else if (whatsUpdating === 'endDate') {
            newWorkHistory.endDate = newVal;
            checkDates(newWorkHistory.startDate, newVal);
        } else {
            return;
        }

        updatedData.workHistory.forEach(element => {
            if (id === element.id) {
                element.workHistory = newWorkHistory;
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
            <label htmlFor="company">Company: </label>
            <input name="company" id="company" type="text" value={workHistory.company} onChange={(e)=>updateWorkHistory(e.target.value, 'company')} required></input>

            <label htmlFor="position">Position: </label>
            <input name="position" id="position" type="text" value={workHistory.position} onChange={(e)=>updateWorkHistory(e.target.value, 'position')} required></input>

            <label htmlFor="startDate">Start Date: </label>
            <input
                name="startDate"
                id="startDate"
                type="date"
                value={workHistory.startDate}
                onChange={(e)=>updateWorkHistory(e.target.value, 'startDate')}
                required>
            </input>

            <label htmlFor="endDate">End Date: </label>
            <input
                name="endDate"
                id="endDate"
                type="date"
                value={workHistory.endDate}
                onChange={(e)=>updateWorkHistory(e.target.value, 'endDate')}
                required>
            </input>

            <button type='button' onClick={() => deleteEntry('work', id)}>Delete</button>
        </div>
    )
}