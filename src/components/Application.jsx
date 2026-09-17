import Education from "./Education";
import WorkHistory from "./WorkHistory";

export default function Application({data, setLoadFormIfTrue}) {

    return (
        <button onClick={(e) => setLoadFormIfTrue(true)}></button>
    )
}