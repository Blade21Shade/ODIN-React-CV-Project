import { deepCopyData } from "../dataTemplates";

export default function WorkHistoryFormEntry({data, updateData, workHistoryObject, deleteEntry}) {

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
        } else if (whatsUpdating === 'endDate') {
            newWorkHistory.endDate = newVal;
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

    return(
        <div>
            <label htmlFor="company">Company: </label>
            <input name="company" id="company" type="text" value={workHistory.company} onChange={(e)=>updateWorkHistory(e.target.value, 'company')}></input>

            <label htmlFor="position">Position: </label>
            <input name="position" id="position" type="text" value={workHistory.position} onChange={(e)=>updateWorkHistory(e.target.value, 'position')}></input>

            <label htmlFor="startDate">Start Date: </label>
            <input
                name="startDate"
                id="startDate"
                type="date"
                value={workHistory.startDate}
                onChange={(e)=>updateWorkHistory(e.target.value, 'startDate')}>
            </input>

            <label htmlFor="endDate">End Date: </label>
            <input
                name="endDate"
                id="endDate"
                type="date"
                value={workHistory.endDate}
                onChange={(e)=>updateWorkHistory(e.target.value, 'endDate')}>
            </input>

            <button type='button' onClick={() => deleteEntry('work', id)}>Delete</button>
        </div>
    )
}