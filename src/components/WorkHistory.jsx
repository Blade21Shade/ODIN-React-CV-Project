export default function WorkHistory({workHistoryObject}) {
    let workHistory = workHistoryObject.workHistory;

    return (
        <div>
            <p>{workHistory.company}</p>

            <p>Position: {workHistory.position}</p>

            <p>Start Date: {workHistory.startDate}</p>
            <p>End Date: {workHistory.endDate}</p>
        </div>
    )
}