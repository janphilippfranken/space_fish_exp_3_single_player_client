import React from 'react';
import { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import villagersImage from '../../static/images/crew.png';
import visitImage from '../../static/images/planet_visit.png';
import structureImage from '../../static/images/newstructure_final.png';
import subjCookImage from '../../static/images/subj_cooking.png';
import Classes from '../../SASS/containers/Instruction/InsTask.module.scss';
import ScrollDivision from '../../components/ScrollDivision/ScrollDivision';

const InsTask= props => {

    const [remainingTime, setRemainingTime] = useState(180);
    const [remainingTimeMin, setRemainingTimeMin] = useState(3);
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
        <div className={Classes.InsTask}>
            
            <div className={Classes.InnerContainer}>
                <h1>Task</h1>
                <h4>You have {remainingTimeMin} minutes and {remainingTimeSec} seconds left to complete this page.</h4>
                <hr />           
                <ScrollDivision>
                <p>You and two other players (other participants) have gone fishing at either planet RED or planet BLUE. However, after getting lost in hyperspace, <b>none of you have any idea which planet you are at</b>!</p><br></br>
                {/* <img src={visitImage} alt="planet_visit"/> */}

                <p><b>Your job is to work out which planet you are at over the course of your fishing trip</b>. To do this you will need to pay attention to whatever fish you catch yourself (you will get 10 attempts to fish) but you may also be able to draw on the judgments of one or both the other players.</p><br></br>


                {/* <p>After each fishing attempt you and the the other two players will update your judgments about which planet you are all at. You may or may not be able to see the judgments of one or both the other players.</p><br></br> */}
                {/* <p>After each fishing attempt you and the the other two players will update your judgments about which planet you are all at. You will be able to see the judgments of both the other players.</p><br></br> */}
                {/* <p><b></b>While it will be clear whose signals you can see, <b>you can’t be sure what the other players can see</b>. That is, you cannot be sure whether player 2 can see player 3's judgments or if player 3 can see player 2's judgments or if either player can see your own judgments. Below is an illustration showing one possibility. Here, Chris can see the judgments of both Neil and Simon. Simon sees Neil's judgment but can't see Chris’. Neil can see neither Chris' nor Simon's judgments.</p><br></br><br></br> */}

                {/* <p>In addition to seeing other players' judgments yourself, <b>you also know what the other players can see</b>. That is, you will know whether player 2 can see player 3's judgments or if player 3 can see player 2's judgments or if either player can see your own judgments. Below is an illustration showing one possibility. Here, Chris can see the judgments of both Neil and Simon. Simon sees Neil's judgment but can't see Chris’. Neil can see neither Chris' nor Simon's judgments.</p><br></br><br></br>
                
                
                <img src={structureImage} alt="subj_cooking"/>

                <p>At the end of the game, we will ask you to make a selection for each of the possible relationships.</p> */}

                {/* <p>To give the correct salt advice for cooking, you need to <b>decide</b> whether the space station's fish comes from the RED or BLUE planet. You will team up with <b>two</b> other players to help the crew.</p><br></br>

                <p>Each of you cooks one fish from the space station's catch to get an idea about which planet the fish came from. It may take some time until the fish has finished cooking, and each of your fish might reveal their colour at a different time.</p>
                
                <img src={subjCookImage} alt="subj_cooking"/>

                

                <p>In addition to cooking fish, you might be able to communicate with one or both of the other players, by sending simple messages. At the start of the game you will see who is able to send messages to you.</p>
                <img src={villagersImage} alt="villagers_cooking"/>
    
                <p><b>Important:</b> The other players might also <b>communicate with each other</b> and <b>influence</b> their beliefs. Thus, you will observe their belief signals <b>10 times</b> each and provide a guess about their relationships with each other.</p><br></br>

                <p><b>Important:</b> You <b>do not</b> know when the other players have finished cooking their fish, and they might finish at different times. If they are communicating with each other, their signals could be based on what they have learned from the other person, in addition to, or instead of, what they have learned from their own fish.</p><br></br>
                 */}

                <hr />
                <Button clicked={props.goToInstruction}>Next</Button>
                </ScrollDivision >
            </div>
        </div>
    );
};

export default InsTask;