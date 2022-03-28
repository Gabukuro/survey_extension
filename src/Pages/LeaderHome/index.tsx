import { useState } from "react";
import { Button } from "react-bootstrap";
import TeamAnswers from "../TeamAnswers";
import TeamManage from "../TeamManage";

function LeaderHome(props: any) {

    let [user, setUser] = useState<any>(props.user);
    let [showAnswer, setShowAnswer] = useState<boolean>(false);
    let [answers, setAnswers] = useState<any | null> (null);

    let toggleView = () => {
        setShowAnswer(!showAnswer);
    }

    return (
        <>
            {!showAnswer && <TeamManage user={user} toggleView={toggleView} setAnswers={setAnswers}/>}
            {showAnswer && <TeamAnswers answers={answers} toggleView={toggleView}/>}
        </>
    )
}

export default LeaderHome;