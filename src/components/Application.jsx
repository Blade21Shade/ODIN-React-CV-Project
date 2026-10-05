import Education from "./Education";
import WorkHistory from "./WorkHistory";

import "../styles/Application.css";

export default function Application({data, setLoadFormIfTrue}) {

    return (
        <>
            <div id='cvContainer'>
                <div>
                    <h1>Personal Information</h1>
                    <div id="nameContainer">
                        <p id='name'>{data.firstName} {data.lastName}</p>
                    </div>
                    <div id="contactInfoContainer">
                        <p id='email'>Email: {data.email}</p>
                        <p id='phone'>Phone: {data.phone}</p>
                    </div>
                </div>
                {data.workHistory.length > 0 &&
                    <div>
                        <h1>Work History</h1>
                        {data.workHistory.map((entry) => (
                            <WorkHistory // Look at GPT conversation for how to style/organize these, specifically with :not(:last-child)
                                key={entry.id}
                                workHistoryObject={entry}>
                            </WorkHistory>
                        ))}
                    </div>
                }
                {data.education.length > 0 &&
                    <div>
                        <h1>Education</h1>
                        {data.education.map((entry) => (
                            <Education
                                key={entry.id}
                                educationObject={entry}>
                            </Education>
                        ))}
                    </div>
                }
            </div>
            <button onClick={(e) => setLoadFormIfTrue(true)}>Edit Information</button>
        </>
    )
}