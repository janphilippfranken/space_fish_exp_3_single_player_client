import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSocket } from '../../socket.io/socket-setup';
import blueFishImage from '../../static/images/bluefish_new.png';
import redFishImage from '../../static/images/redfish_new.png';
import noFishImage from '../../static/images/nofish.png';
import Button from '../Button/Button';
import Classes from './PrivateEvidenceBetweenTrials.module.css';
import Agent from '../Agent/Agent';


const PrivateEvidenceBetweenTrials = props => {
    // getting the current participant 
    const thisParticipant = useSelector(state => state.currentParticipant);

    // // getting the condition data from client 
    // const conditionData = useSelector(state => state.conditionData.conditionData[state.conditionData.conditionNumber]);
    // const fish = conditionData.targetBelief[thisParticipant.stimuli];

    // getting condition data from server
    const fish = thisParticipant.fish;
    const participantNumber = thisParticipant.stimuli;
    const room = useSelector(state => state.currentRoom);
    const [aKey, setAKey] = useState(room.participants[0].id);
    const [bKey, setBKey] = useState(room.participants[1].id);
    const [cKey, setCKey] = useState(room.participants[2].id);



    // determining which fish picture to show to pp depending on their initial fish

    const displayFish = {0: ['', 'none'],
                        1: ['none', '']};


    return (

        <div className={Classes.PrivateEvidenceFrame}  style={{display: props.display}}>
             {props.children}
             <Agent position={'absolute'} left={'10%'} top={'5%'} width={'500px'} agent_id="Fish" display={participantNumber === 'subject1' && room.planetSelections[aKey] && !room.planetSelections[aKey][1] || participantNumber === 'subject2' && room.planetSelections[bKey] && room.planetSelections[bKey][2] && !room.planetSelections[bKey][3] || participantNumber === 'subject3' && room.planetSelections[cKey] && room.planetSelections[cKey][5] && !room.planetSelections[cKey][6]? displayFish[fish][0] : 'none'}>
                <p>You caught a <b>RED</b> fish!</p>
                <img height={'100px'} src={redFishImage} alt="fish"/>
            </Agent>
            <Agent position={'absolute'} left={'10%'} top={'5%'} width={'500px'} agent_id="Fish" display={participantNumber === 'subject1' && room.planetSelections[aKey] && !room.planetSelections[aKey][1] || participantNumber === 'subject2' && room.planetSelections[bKey] && room.planetSelections[bKey][2] && !room.planetSelections[bKey][3] || participantNumber === 'subject3' && room.planetSelections[cKey] && room.planetSelections[cKey][5] && !room.planetSelections[cKey][6]? displayFish[fish][1] : 'none'}>
                <p>You caught a <b>BLUE</b> fish!</p>
                <img height={'100px'} src={blueFishImage} alt="fish"/>
            </Agent>
            <Agent position={'absolute'} left={'10%'} top={'5%'} width={'500px'} agent_id="Fish" display={participantNumber === 'subject1' && !room.planetSelections[aKey] || participantNumber === 'subject2' && room.planetSelections[bKey] && !room.planetSelections[bKey][2] || participantNumber === 'subject3' && room.planetSelections[cKey] && !room.planetSelections[cKey][5]? '' : 'none'}>
                <p>You haven't caught a fish in this round.</p> 
                <img height={'100px'} src={noFishImage} alt="fish"/>
            </Agent>  

            <Agent position={'absolute'} left={'10%'} top={'5%'} width={'500px'} agent_id="Fish" display={participantNumber === 'subject1' && !room.planetSelections[aKey] || participantNumber === 'subject2' && !room.planetSelections[bKey] || participantNumber === 'subject3' && !room.planetSelections[cKey]? '' : 'none'}>
                <p>You haven't caught a fish in this round.</p> 
                <img height={'100px'} src={noFishImage} alt="fish"/>
            </Agent>  

            <Agent position={'absolute'} left={'10%'} top={'5%'} width={'500px'} agent_id="Fish" display={participantNumber === 'subject1' && room.planetSelections[aKey] && room.planetSelections[aKey][1] || participantNumber === 'subject2' && room.planetSelections[bKey] && room.planetSelections[bKey][3] || participantNumber === 'subject3' && room.planetSelections[cKey] && room.planetSelections[cKey][6]? displayFish[fish][0] : 'none'}>
                <p>You haven't caught a fish in this round.</p>
                <img height={'100px'} src={noFishImage} alt="fish"/>
            </Agent> 
            <Agent position={'absolute'} left={'10%'} top={'5%'} width={'500px'} agent_id="Fish" display={participantNumber === 'subject1' && room.planetSelections[aKey] && room.planetSelections[aKey][1] || participantNumber === 'subject2' && room.planetSelections[bKey] && room.planetSelections[bKey][3] || participantNumber === 'subject3' && room.planetSelections[cKey] && room.planetSelections[cKey][6]? displayFish[fish][1] : 'none'}>
                <p>You haven't caught a fish in this round.</p>
                <img height={'100px'} src={noFishImage} alt="fish"/>
            </Agent> 
   </div>        
    );
};

export default PrivateEvidenceBetweenTrials; 


