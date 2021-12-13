import React, { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import relationshipImage from '../../static/images/new_structure_selection.png';
import planetImage from '../../static/images/select_planet.png';
import fishImage from '../../static/images/fish_instruct.png';
import vunconfidentImage from '../../static/images/unsure_which_planet.png';
import confidentImage from '../../static/images/confident.png';
import vconfidentImage from '../../static/images/vconfident.png';
import observeAll from '../../static/images/rhs_see_all.png';
import observeOne from '../../static/images/rhs_see_one.png';
import confImage from '../../static/images/new_scale_no_hand.png';
import confMeaningImage from '../../static/images/belief_meaning.png';
import Classes from '../../SASS/containers/Instruction/InsTask2.module.scss';
import ScrollDivision from '../../components/ScrollDivision/ScrollDivision';

const InsTask= props => {
    const [btnDisplay, setBtnDisplay] = useState(false)

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

    const showBtn = (e) => {
        debugger;
        console.log(e.target.scrollHeight);
        console.log(e.target.scrollTop);
        if (e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight) {
            setBtnDisplay(true);
        }
    };

    return (
        <div className={Classes.InsTask}>

            
            <div className={Classes.InnerContainer}>
                <h1>Procedure</h1>
                <h4>You have {remainingTimeMin} minutes and {remainingTimeSec} seconds left to complete this page.</h4>
                <hr />           
                <ScrollDivision scroll={showBtn}>
                <p>In each of the 10 'rounds' you will:</p><br></br>
                <ol>
                    <li>1. Check to see if you caught a fish, and what colour it is if you did.</li><br></br>
                    <li>2. Provide a <b>judgment about which planet you are at using the response format below</b>.</li>
                    <img src={confImage} alt="conf"/><br></br><br></br>
                    <li>3. See the judgments of the other players. Like your own judgments these will range between 'Highly confident RED' and 'Highly confident BLUE' (see below). <b><i>Always</i> consider current and past evidence</b> (fish / other players' judgments) when making a new judgment.</li>
                    <img src={observeAll} alt="others"/><br></br>

                    <li><b>You will earn a bonus of £0.15 for selecting the correct planet in each round. To select the correct planet, you need to consider <i>both</i> other players' judgments and your own fish.</b></li><br></br>
                    {/* <li>In some cases, you might only see some or none of the other players' judgments:</li> */}
                    {/* <img src={observeOne} alt="others"/><br></br> */}
                    <li>NOTE: You <b>can never</b> see other players’ catches. You can only see your own catches and other players’ judgments to revise your own judgments. Other players <b>always</b> provide accurate judgments, as they also get bonuses for guessing correctly in each round.</li>
                    {/* <p>Remember: These are other players and they may use these signals however they like!</p><br></br> */}

                </ol>

                {/* <img src={fishImage} alt="planets"/><br></br><br></br> */}
                {/* <p>You then provide a guess about the planet the fish came from by clicking on a color and your associated confidence:</p><br></br> */}
                {/* <img src={observeImage} alt="planets"/><br></br><br></br> */}
                
                {/* <p>You then see whether other players sent you messages. Like your guess, these messages can only include which planet the other players think the fish are from (blue or red) and how confident they are, from 1 (slightly confident) to 3 (highly confident).</p><br></br>  */}
                {/* <p>The illustration below further shows how the crew uses their space headlights to communicate their beliefs:</p><br></br>
                <img src={confMeaningImage} alt="planets"/><br></br><br></br> */}


                {/* <p>Before finishing cooking their fish and observing its color (and without hearing about the other player's belief) another player might not know which planet the fisherman travelled:</p><br></br>
                <img src={vunconfidentImage} alt="planets"/><br></br><br></br>

                <p>After a player finished cooking their fish and hence observed the fish's color, their confidence increases:</p><br></br>
                <img src={confidentImage} alt="planets"/><br></br><br></br>

                <p>Another player can also be influenced by the other player. If the influencing player has the same belief, this can further increase the confidence of the influenced player:</p><br></br>
                <img src={vconfidentImage} alt="planets"/><br></br><br></br> */}

                {/* <p>Note: When beliefs are different, one player can decrease the confidence of the other player or even change their belief entirely.</p><br></br>  */}

                {/* <p>From prior experience, you know that crew members are less influenced by each other's beliefs compared to directly observing the color of a fish. For example, being influenced by a crew member that finished cooking their fish (and has not been influenced by anyone else) has around 1/4 of the impact on another crew member's belief as compared to directly observing a fish's color.</p><br></br> */}
                
                {/* <p>After observing beliefs and confidence of others, you will proceed to the next round, again checking if your fish has finished cooking and then select one of the two planets and rate <b>how confident</b> you are in your decision (receiving a bonus of £0.05 for each trial you are providing a correct guess (max. bonus = 9 * £0.05 + £0.05 for initial guess before communication = £0.50)).</p><br></br> */}
                {/* <img src={planetImage} alt="planets"/> */}
                {/* <p>Finally, after completing all 10 trials, you will be asked to provide a guess about the relationship of the other two players (by clicking on the yellow text box) and receive a bonus of £0.50 for providing the correct selection:</p> */}
                {/* <img src={relationshipImage} alt="planets"/><br></br><br></br> */}
                {/* <p>NOTE: <b>THIS IS A COLLABORATIVE GAME</b>. If all players complete the task without dropping out, each of you will be paid an additional <b>£2.00</b> completion bonus. So please stay and be considerate of other people's time.</p><br></br> */}
                
                <hr />
                <Button clicked={props.goToInstruction}>Next</Button>
                {/* {btnDisplay && <Button clicked={props.goToInstruction}>Next</Button>} */}
                </ScrollDivision >
              
                {/* {btnDisplay ? <Button clicked={props.goToInstruction}>Next</Button>: <Button >Please scroll down</Button>} */}
            </div>
        </div>
    );
};

export default InsTask;