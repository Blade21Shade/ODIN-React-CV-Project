import { deepCopyData } from "../dataTemplates";
import compareDates from "../tools/compareDates";
import { useRef } from "react";

export default function WorkHistoryFormEntry({data, updateData, updateBadInputs, batchUpdateBadInputs, workHistoryObject, deleteEntry}) {

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

        // Don't compare unless both dates have been entered
        if (startDate === '' || endDate === '') {
            return;
        }

        let addOrRemove;
        let message;
        if (compareDates(startDate, endDate)) {
            addOrRemove = 'remove';
            message = '';
        } else {
            addOrRemove = 'add';
            message = 'Dates in invalid order: Start date must be before end date'
        }

        updateErrorPopUp(addOrRemove, message);
        

        updateBadInputs(id, 'work', addOrRemove, 'datesInvalidOrder');
    }

    function updateErrorPopUp(addOrRemove = 'add', message = 'Error message not defined') {
        if (addOrRemove === 'add') {
            reference.current.hidden = false;
            reference.current.innerText = message;
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