export default function Education({educationObject}) {
    let education = educationObject.education;
    
    return (
        <div>
            <p>{education.name}</p>

            <p>Field: {education.educationField}</p>
            <p>Degree: {education.educationLevel}</p>

            <p>Start Date: {education.startDate}</p>
            <p>End Date: {education.endDate}</p>
        </div>
    )
}