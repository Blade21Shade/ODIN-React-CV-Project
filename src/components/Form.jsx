import EducationFormEntry from "./EducationFormEntry";
import WorkHistoryFormEntry from "./WorkHistoryFormEntry";

export default function Form({data, setLoadFormIfTrue}) {
    return (
    <form>
        <div>
            <h1>Personal Information</h1>
            <div id="nameContainer">
                <label htmlFor="firstName">First Name: </label>
                <input type="text" name="firstName" id='firstName'></input>
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" name="lastName" id="lastName"></input>
            </div>
            <div id="concatInfoContainer">
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email"></input>
                <label htmlFor="phone">Phone: </label>
                <input type="tel" name="phone" id="phone"></input>
            </div>
        </div>
        <div>
            <h1>Work History</h1>
            {data.workHistory.map((entry, index) => (
                <WorkHistoryFormEntry
                    key={index}
                    workHistoryObject={entry}>
                </WorkHistoryFormEntry>
            ))}
            <button>Add Work History</button>
        </div>
        <div>
            <h1>Education</h1>
            {data.education.map((entry, index) => (
                <EducationFormEntry
                    key={index}
                    educationObject={entry}>
                </EducationFormEntry>
            ))}
            <button>Add Education</button>
        </div>
        <button type="submit">Submit</button>
    </form>
    )
}