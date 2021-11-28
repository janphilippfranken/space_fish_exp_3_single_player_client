import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Classes from '../../SASS/containers/Instruction/InsSummary.module.scss';

const InsSummary = props => {
   

    const training = useSelector(state => state);
    console.log(training);
    console.log('summary');


    const [remainingTime, setRemainingTime] = useState(120);

    const [remainingTimeMin, setRemainingTimeMin] = useState(2);
    const [remainingTimeSec, setRemainingTimeSec] = useState(0);
   
    useEffect(() => {
        const timeOut = setTimeout (() => {
            if (remainingTime > 0) {
                setRemainingTime(remainingTime-1);
                setRemainingTimeSec(remainingTimeSec-1);
            };
           
            if (remainingTime % 60 === 0 && remainingTimeMin > 0) {
                setRemainingTimeMin(remainingTimeMin-1)
                setRemainingTimeSec(60);
            };
            if (remainingTime === 0) {
                // window.location.replace("http://www.sorrytoolate.com/");
            };
            clearTimeout(timeOut);
        }, 1000)
        return () => {
            clearTimeout(timeOut);
        }; 
    },[remainingTime,remainingTimeSec,remainingTimeMin]);

    return (
        <div className={Classes.InsSummary}>
            <div className={Classes.InnerContainer}>
                <h1>Summary</h1> 
                <h4>You have {remainingTimeMin} minutes and {remainingTimeSec} seconds left to complete this page.</h4>
                <hr />
                <p>
                1. On Planet RED, fish are mainly <b className={Classes.PlanetColorRed}>RED</b> (2/3 red; 1/3 blue). On Planet BLUE, fish are mainly <b className={Classes.PlanetColorBlue}>BLUE</b> (2/3 blue; 1/3 red).<br></br><br></br>
                2. You and two other players are fishing at one of these planets. But to begin with none of you know which planet you are at!<br></br><br></br>
                3. You will look at the color of whatever fish you can catch, and any judgments you might receive from the other players.<br></br><br></br>
                4. You can’t be sure <b>if the other players can see each other's judgments</b> or if they can see your judgments. You will need to <b>infer who sees whose judgments</b> by looking at how other players' judgments change over time.<br></br><br></br>
                {/* 4. You can directly see <b>whether the other players can see each other's judgments and if they can see your own judgments</b>. You <b>should consider</b> this knowledge when updating your own judgments.<br></br><br></br> */}
                5. <b>YOUR JOB</b> is to work out whether you and the other two players are catching fish on Planet RED or Planet BLUE.<br></br><br></br>
                6. NOTE: <b>THIS IS A COLLABORATIVE GAME</b>. Other players depend on your commitment to complete the task. As such, please make sure to complete each section of the game in time and DO NOT close the window.<br></br><br></br>
                
                </p>
                <br />
                <hr />
                <Button clicked={props.goToInstruction}>Next</Button>
            </div>
        </div>
    );
};

export default InsSummary;