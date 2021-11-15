import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSocket } from '../../socket.io/socket-setup';
import blueFishImage from '../../static/images/blue_fish_cooked.png';
import redFishImage from '../../static/images/red_fish_cooked.png';
import noFishImage from '../../static/images/nofish.png';
import Button from '../../components/Button/Button';
import Classes from './PrivateEvidence.module.css';
import reminderSound from '../../static/sounds/start_sound.mp3';
import Agent from '../Agent/Agent';



const PrivateEvidence = props => {
    // getting the current participant 
    const dispatch = useDispatch();
    const thisParticipant = useSelector(state => state.currentParticipant);
  
  
    const [remainingTime, setRemainingTime] = useState(10);

    useEffect(() => {
        const timeOut = setTimeout (() => {
            if (remainingTime > 0) {
                if (remainingTime === 10) {
                    play();
                }
                setRemainingTime(remainingTime-1);
            };
            if (remainingTime === 0) {
                // window.location.replace("http://www.sorrytoolate.com/");
            };
            clearTimeout(timeOut);
        }, 1000)
        return () => {
            clearTimeout(timeOut);
        }; 
    },[remainingTime]);

    const timeOut = setTimeout(() => {
        props.goToGame();
        clearTimeout(timeOut);
    }, 10000);


    const play = () => {   
    const beepsound = new Audio(reminderSound);   
    beepsound.play();   
    };   


    // getting the condition data from client if not initiated from server 
    // const conditionData = useSelector(state => state.conditionData.conditionData[state.conditionData.conditionNumber]);
    // const fish = conditionData.targetBelief[thisParticipant.stimuli];
    
    // getting fish from server 
    const fish = thisParticipant.fish;
    const participantNumber = thisParticipant.stimuli;


    // determining which fish picture to show to pp depending on their initial fish

    const displayFish = {0: ['', 'none'],
                        1: ['none', '']};


    return (

        <div className={Classes.PrivateEvidenceFrame}  style={{display: props.display}}>
             <Agent left={'33%'} agent_id="instr_frame_time">Proceeding to planet selection in {remainingTime} seconds.</Agent>
             {props.children}
            {/* <Agent position={'absolute'} left={'25%'} top={'0%'} width={'500px'} agent_id="Fish" display={participantNumber === 'subject1'? displayFish[fish][0] : 'none'}>
                <p>Cooking revealed that the fish is <b>RED</b>!</p>
                <img height={'300px'} src={redFishImage} alt="fish"/>
            </Agent>
            <Agent position={'absolute'} left={'25%'} top={'0%'} width={'500px'} agent_id="Fish" display={participantNumber === 'subject1'? displayFish[fish][1] : 'none'}>
                <p>Cooking revealed that the fish is <b>BLUE</b>!</p>
                <img height={'300px'} src={blueFishImage} alt="fish"/>
            </Agent> */}
            <Agent position={'absolute'} left={'25%'} top={'0%'} width={'500px'} agent_id="Fish" display={participantNumber === 'subject1' || participantNumber === 'subject2' || participantNumber === 'subject3'? '' : 'none'}>
                <p>You haven't caught a fish in this round.</p>
                <img height={'300px'} src={noFishImage} alt="fish"/>
            </Agent>      
        <Button position={'absolute'} left={'40%'} top={'105%'} clicked={props.goToGame}>Next</Button>
   </div>        
    );
};

export default PrivateEvidence; 


