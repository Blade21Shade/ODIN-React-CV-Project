export default function WorkHistory({workHistoryObject}) {
    let workHistory = workHistoryObject.workHistory;

    return (
        <div className = 'applicationListItem'>
            <h2>{workHistory.company}</h2>

            <p>Position: {workHistory.position}</p>

            <p>Start Date: {workHistory.startDate}</p>
            <p>End Date: {workHistory.endDate}</p>
        </div>
    )
}