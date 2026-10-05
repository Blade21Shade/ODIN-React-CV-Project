export default function Education({educationObject}) {
    let education = educationObject.education;
    
    return (
        <div className = 'applicationListItem'>
            <h2>{education.school}</h2>

            <p>Field: {education.educationField}</p>
            <p>Degree: {education.educationLevel}</p>

            <p>Start Date: {education.startDate}</p>
            <p>End Date: {education.endDate}</p>
        </div>
    )
}