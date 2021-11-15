import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Agent from '../Agent/Agent';
import Button from '../../components/Button/Button';
import Action from '../Action/Action';
import classes from './StructureFrame.module.css';
import { getSocket } from '../../socket.io/socket-setup';
import StructureButton from '../StructureButton/StructureButton';
    


let socket;
let selectedStructure = [];

const StructureFrame = props => {

    const dispatch = useDispatch();
    const conditionNumber = useSelector(state => state.conditionData.conditionNumber);
    const scenario = useSelector(state => state.conditionData.conditionData[state.conditionData.conditionNumber]);
    const [buttonDisplay, setButtonDisplay] = useState('none');
    
    socket = getSocket();
    // getting the current participant and room which includes data from other participants 
    const thisParticipant = useSelector(state => state.currentParticipant);
 
    const room = useSelector(state => state.currentRoom);

     // unique keys of other players 
    const [aKey, setAKey] = useState(room.participants[0].id);
    const [bKey, setBKey] = useState(room.participants[1].id);
    const [cKey, setCKey] = useState(room.participants[2].id);

    console.log(selectedStructure);

     // names of players 
    const subj1Name = room.participants[0].name;
    const subj2Name = room.participants[1].name;
    const subj3Name = room.participants[2].name;

    const playerNames = {
        'subject1': [subj1Name, subj2Name, subj3Name],
        'subject2': [subj2Name, subj1Name, subj3Name],
        'subject3': [subj3Name, subj1Name, subj2Name,]
    }; 

    const [remainingTime, setRemainingTime] = useState(120);
    const [simulatedStructure, setSimulatedStructure] = useState(false);

    useEffect(() => {
        const timeOut = setTimeout (() => {
            if (remainingTime > 0) {
                setRemainingTime(remainingTime-1);
            };
            
            if (remainingTime === 0 && !room.planetSelections[thisParticipant.id[10]] && !afterSelectText) {
                onNextHandler();
            };     

            clearTimeout(timeOut);
        }, 1000)
        return () => {
            clearTimeout(timeOut);
        }; 
    },[remainingTime]);

  

    console.log(playerNames);


    // ARROWS
    // 1. FIRST PAIR 
    // down
    const [youTwoDown, setYouTwoDown] = useState('none');
    const [notYouTwoDown, setNotYouTwoDown] = useState('none');
    const [beforeYouTwoDown, setBeforeYouTwoDown] = useState(true);
    const [selectedYouTwoDown, setSelectedYouTwoDown] = useState("grey");
    const [youTwoDownOpacity, setYouTwoDownOpacity] = useState("0.5");


    const selectYouTwoDown = () => {
        setYouTwoDown(true);
        setNotYouTwoDown(false); 
        setSelectedYouTwoDown("green");
        setBeforeYouTwoDown(false);
        setYouTwoDownOpacity("1.0");
    };

    const selectNotYouTwoDown = () => {
        setNotYouTwoDown(true);  
        setYouTwoDown(false);
        setSelectedYouTwoDown("red");
        setBeforeYouTwoDown(false);
        setYouTwoDownOpacity("1.0");
    };

    // up
    const [youTwoUp, setYouTwoUp] = useState('none');
    const [notYouTwoUp, setNotYouTwoUp] = useState('none');
    const [beforeYouTwoUp, setBeforeYouTwoUp] = useState(true);
    const [selectedYouTwoUp, setSelectedYouTwoUp] = useState("grey");
   
    const selectYouTwoUp = () => {
        setYouTwoUp(true);
        setNotYouTwoUp(false); 
        setSelectedYouTwoUp("green");
        setBeforeYouTwoUp(false);
    };

    const selectNotYouTwoUp = () => {
        setNotYouTwoUp(true);  
        setYouTwoUp(false);
        setSelectedYouTwoUp("red");
        setBeforeYouTwoUp(false);
    };

    // 2. SECOND PAIR    
    // down
    const [youThreeDown, setYouThreeDown] = useState('none');
    const [notYouThreeDown, setNotYouThreeDown] = useState('none');
    const [beforeYouThreeDown, setBeforeYouThreeDown] = useState(true);
    const [selectedYouThreeDown, setSelectedYouThreeDown] = useState("grey");
    const [youThreeDownOpacity, setYouThreeDownOpacity] = useState("0.5");

    const selectYouThreeDown = () => {
        setYouThreeDown(true);
        setNotYouThreeDown(false); 
        setSelectedYouThreeDown("green");
        setBeforeYouThreeDown(false);
        setYouThreeDownOpacity("1.0");
    };

    const selectNotYouThreeDown = () => {
        setNotYouThreeDown(true);  
        setYouThreeDown(false);
        setSelectedYouThreeDown("red");
        setBeforeYouThreeDown(false);
        setYouThreeDownOpacity("1.0");
    };

    // up
    const [youThreeUp, setYouThreeUp] = useState('none');
    const [notYouThreeUp, setNotYouThreeUp] = useState('none');
    const [beforeYouThreeUp, setBeforeYouThreeUp] = useState(true);
    const [selectedYouThreeUp, setSelectedYouThreeUp] = useState("grey");
   
    const selectYouThreeUp = () => {
        setYouThreeUp(true);
        setNotYouThreeUp(false); 
        setSelectedYouThreeUp("green");
        setBeforeYouThreeUp(false);
    };

    const selectNotYouThreeUp = () => {
        setNotYouThreeUp(true);  
        setYouThreeUp(false);
        setSelectedYouThreeUp("red");
        setBeforeYouThreeUp(false);
    };

    // 3. THIRD PAIR 
    // right
    const [twoThreeRight, setTwoThreeRight] = useState('none');
    const [notTwoThreeRight, setNotTwoThreeRight] = useState('none');
    const [beforeTwoThreeRight, setBeforeTwoThreeRight] = useState(true);
    const [selectedTwoThreeRight, setSelectedTwoThreeRight] = useState("grey");
    const [twoThreeRightOpacity, setTwoThreeRightOpacity] = useState("0.5");

    const selectTwoThreeRight = () => {
        setTwoThreeRight(true);
        setNotTwoThreeRight(false); 
        setSelectedTwoThreeRight("green");
        setBeforeTwoThreeRight(false);
        setTwoThreeRightOpacity("1.0");
    };

    const selectNotTwoThreeRight = () => {
        setNotTwoThreeRight(true);  
        setTwoThreeRight(false);
        setSelectedTwoThreeRight("red");
        setBeforeTwoThreeRight(false);
        setTwoThreeRightOpacity("1.0");
    };

    // left
    const [threeTwoLeft, setThreeTwoLeft] = useState('none');
    const [notThreeTwoLeft, setNotThreeTwoLeft] = useState('none');
    const [beforeThreeTwoLeft, setBeforeThreeTwoLeft] = useState(true);
    const [selectedThreeTwoLeft, setSelectedThreeTwoLeft] = useState("grey");
    const [threeTwoLeftOpacity, setThreeTwoLeftOpacity] = useState("0.5");
   
    const selectThreeTwoLeft = () => {
        setThreeTwoLeft(true);
        setNotThreeTwoLeft(false); 
        setSelectedThreeTwoLeft("green");
        setBeforeThreeTwoLeft(false);
        setThreeTwoLeftOpacity("1.0");
    };

    const selectNotThreeTwoLeft = () => {
        setNotThreeTwoLeft(true);  
        setThreeTwoLeft(false);
        setSelectedThreeTwoLeft("red");
        setBeforeThreeTwoLeft(false);
        setThreeTwoLeftOpacity("1.0");
    };

    const [beforeSelect, setBeforeSelect] = useState(true);
    const [afterSelect, setAfterSelect] = useState(false);
    const [afterSelectText, setAfterSelectText] = useState(false);

    // // default settings based on condition and subjects
    // if (thisParticipant.stimuli === 'subject1') {
    //     selectYouTwoUp();
    //     selectYouThreeUp();
    // }

    // if (thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr') {
    //     selectYouTwoUp();
    // }



    const onNextHandler = () => {
        setBeforeSelect(false);
        setAfterSelect(false);

        socket.emit('planet-selected',
        {
            planetSelectionTrial: { participantId: thisParticipant.id, causalStructure: {youTwoDown: {youTwoDown, notYouTwoDown}, youTwoUp: {youTwoUp, notYouTwoUp}, youThreeDown: {youThreeDown, notYouThreeDown}, youThreeUp: {youThreeUp, notYouThreeUp}, twoThreeRight: {twoThreeRight, notTwoThreeRight}, threeTwoLeft: {threeTwoLeft, notThreeTwoLeft}}, conditionNumber: conditionNumber },
            roomId: room.id 
        })
        
        setButtonDisplay('none');    
        setButtonDisplay('none');
        setAfterSelectText(true);

    };

    const [showButton, setShowButton] = useState(0);
    
    // if (youTwoDown != 'none') {
    //     setShowButton(true);
    // };
    
    return (
        <div className={classes.StructureFrame} style={{display: props.display}}>
            {/* game interface */}

            {/* agents */}
            <Agent display={beforeSelect? '' : 'none'} agent_id="B_2" top={"5%"} left={'28%'}>{playerNames[thisParticipant.stimuli][0]} (you)</Agent>
            <Agent display={beforeSelect? '' : 'none'} agent_id="B_2" top={"56%"} left={'6%'}>{playerNames[thisParticipant.stimuli][1]}</Agent>
            <Agent display={beforeSelect? '' : 'none'} agent_id="B_2" top={"56%"} left={'50%'}>{playerNames[thisParticipant.stimuli][2]}</Agent>

            {/* Connections */}
            {/* First Pair  */}
            <Agent display={beforeSelect? '' : 'none'} opacity={youTwoDownOpacity} borderColor={selectedYouTwoDown} agent_id="ConnectionTail1" top={"34%"} left={'10%'} width={'10.5rem'}>{playerNames[thisParticipant.stimuli][1]} sees {playerNames[thisParticipant.stimuli][0]}'s (you)</Agent> 
            <Agent display={beforeSelect && thisParticipant.stimuli === 'subject1'? '' : 'none'} opacity={"1.0"}  borderColor={thisParticipant.stimuli === 'subject1'? 'green' : selectedYouTwoUp} agent_id="ConnectionTail1" top={"38%"} left={'14%'} width={'10.5rem'}>{playerNames[thisParticipant.stimuli][0]} (you) sees {playerNames[thisParticipant.stimuli][1]}'s</Agent> 
            <Agent display={beforeSelect && thisParticipant.stimuli === 'subject2'? '' : 'none'} opacity={"1.0"}  borderColor={thisParticipant.stimuli === 'subject2'? 'red' : selectedYouTwoUp} agent_id="ConnectionTail1" top={"38%"} left={'14%'} width={'10.5rem'}>{playerNames[thisParticipant.stimuli][0]} (you) sees {playerNames[thisParticipant.stimuli][1]}'s</Agent> 
            <Agent display={beforeSelect && thisParticipant.stimuli === 'subject3'? '' : 'none'} opacity={"1.0"}  borderColor={thisParticipant.stimuli === 'subject3'? 'red' : selectedYouTwoUp} agent_id="ConnectionTail1" top={"38%"} left={'14%'} width={'10.5rem'}>{playerNames[thisParticipant.stimuli][0]} (you) sees {playerNames[thisParticipant.stimuli][1]}'s</Agent> 
            <Agent display={beforeSelect && !notYouTwoDown && !beforeYouTwoDown? '' : 'none'} agent_id="ConnectionDown1" top={"45.75%"} left={'9.7%'}> </Agent>
            <Agent display={beforeSelect && thisParticipant.stimuli === 'subject1'? '' : 'none'} agent_id="ConnectionUp1" top={"22%"} left={'26.7%'}> </Agent>
            <StructureButton display={beforeSelect? "" : "none"} color={"green"} top={"40%"} left={"10.5%"} onClick={selectYouTwoDown}>✔</StructureButton>
            <StructureButton display={beforeSelect? "" : "none"} color={"red"} top={"40%"} left={"13.5%"} onClick={selectNotYouTwoDown}>❌</StructureButton>
            {/* <StructureButton display={beforeSelect && !thisParticipant.stimuli === 'subject1'? "" : "none"} color={"green"} top={"53%"} left={"25%"} onClick={selectYouTwoUp}>✔</StructureButton>
            <StructureButton display={beforeSelect && !thisParticipant.stimuli === 'subject1'? "" : "none"} color={"red"} top={"53%"} left={"28%"} onClick={selectNotYouTwoUp}>❌</StructureButton> */}

             {/* Connections */}
            {/* Second Pair  */}
            <Agent display={beforeSelect? '' : 'none'} opacity={youThreeDownOpacity} borderColor={selectedYouThreeDown} agent_id="ConnectionTail2" top={"34%"} left={'40%'} width={'10.5rem'}>{playerNames[thisParticipant.stimuli][2]} sees {playerNames[thisParticipant.stimuli][0]}'s (you)</Agent> 
            <Agent display={beforeSelect && thisParticipant.stimuli === 'subject1'? '' : 'none'} opacity={"1.0"}  borderColor={thisParticipant.stimuli === 'subject1'? 'green' : selectedYouThreeUp} agent_id="ConnectionTail2" top={"38%"} left={'36%'} width={'10.5rem'}>{playerNames[thisParticipant.stimuli][0]} (you) sees {playerNames[thisParticipant.stimuli][2]}'s</Agent> 
            <Agent display={beforeSelect && thisParticipant.stimuli === 'subject2'? '' : 'none'} opacity={"1.0"}  borderColor={thisParticipant.stimuli === 'subject2'? 'red' : selectedYouThreeUp} agent_id="ConnectionTail2" top={"38%"} left={'36%'} width={'10.5rem'}>{playerNames[thisParticipant.stimuli][0]} (you) sees {playerNames[thisParticipant.stimuli][2]}'s</Agent> 
            <Agent display={beforeSelect && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? '' : 'none'} opacity={"1.0"}  borderColor={thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? 'green' : 'green'} agent_id="ConnectionTail2" top={"38%"} left={'36%'} width={'10.5rem'}>{playerNames[thisParticipant.stimuli][0]} (you) sees {playerNames[thisParticipant.stimuli][2]}'s</Agent> 
            <Agent display={beforeSelect && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'independent'? '' : 'none'} opacity={"1.0"}  borderColor={thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'independent'? 'red' : selectedYouThreeUp} agent_id="ConnectionTail2" top={"38%"} left={'36%'} width={'10.5rem'}>{playerNames[thisParticipant.stimuli][0]} (you) sees {playerNames[thisParticipant.stimuli][2]}'s</Agent> 
           
            <Agent display={beforeSelect && !notYouThreeDown && !beforeYouThreeDown? '' : 'none'} agent_id="ConnectionDown2" top={"44%"} left={'52.5%'}> </Agent>
            <Agent display={beforeSelect && thisParticipant.stimuli === 'subject1'? '' : 'none'} agent_id="ConnectionUp2" top={"24.7%"} left={'35.9%'}> </Agent>
            <Agent display={beforeSelect && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? '' : 'none'} agent_id="ConnectionUp2" top={"24.7%"} left={'35.9%'}> </Agent>
           
            <StructureButton display={beforeSelect? "" : "none"} color={"green"} top={"40%"} left={"49.5%"} onClick={selectYouThreeDown}>✔</StructureButton>
            <StructureButton display={beforeSelect? "" : "none"} color={"red"} top={"40%"} left={"52.5%"} onClick={selectNotYouThreeDown}>❌</StructureButton>
            {/* <StructureButton display={beforeSelect && !thisParticipant.stimuli === 'subject1' && !thisParticipant.stimuli === 'subject3' || beforeSelect && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === "independent"? "" : "none"} color={"green"} top={"53%"} left={"35%"} onClick={selectYouThreeUp}>✔</StructureButton>
            <StructureButton display={beforeSelect && !thisParticipant.stimuli === 'subject1' && !thisParticipant.stimuli === 'subject3' || beforeSelect && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === "independent"? "" : "none"} color={"red"} top={"53%"} left={"38%"} onClick={selectNotYouThreeUp}>❌</StructureButton>  */}
   

            {/* Connections */}
            {/* Third Pair  */}
            <Agent display={beforeSelect? '' : 'none'} opacity={twoThreeRightOpacity}  borderColor={selectedTwoThreeRight} agent_id="ConnectionTail3" top={"58.5%"} left={'26%'} width={'10.5rem'}>{playerNames[thisParticipant.stimuli][2]} sees {playerNames[thisParticipant.stimuli][1]}'s</Agent> 
            <Agent display={beforeSelect? '' : 'none'} opacity={threeTwoLeftOpacity}  borderColor={selectedThreeTwoLeft} agent_id="ConnectionTail3" top={"67%"} left={'26%'} width={'10.5rem'}>{playerNames[thisParticipant.stimuli][1]} sees {playerNames[thisParticipant.stimuli][2]}'s</Agent> 
            <Agent display={beforeSelect && !notTwoThreeRight && !beforeTwoThreeRight? '' : 'none'} agent_id="ConnectionRight3" top={"56%"} left={'41.5%'}> </Agent>
            <Agent display={beforeSelect && !notThreeTwoLeft && !beforeThreeTwoLeft? '' : 'none'} agent_id="ConnectionLeft3" top={"65%"} left={'23%'}> </Agent>
            <StructureButton display={beforeSelect? "" : "none"} color={"green"} top={"63.5%"} left={"31%"} onClick={selectTwoThreeRight}>✔</StructureButton>
            <StructureButton display={beforeSelect? "" : "none"} color={"red"} top={"63.5%"} left={"34%"} onClick={selectNotTwoThreeRight}>❌</StructureButton>
            <StructureButton display={beforeSelect? "" : "none"} color={"green"} top={"87%"} left={"31%"} onClick={selectThreeTwoLeft}>✔</StructureButton>
            <StructureButton display={beforeSelect? "" : "none"} color={"red"} top={"87%"} left={"34%"} onClick={selectNotThreeTwoLeft}>❌</StructureButton> 
 
            
            
       
            <Agent position={'absolute'} left={'10%'} top={'20%'} width={'500px'} agent_id="Fish" display={afterSelectText? '' : 'none'}>
                <p>Congratulations, done! You will be redirected to the debriefing shortly. Your bonus will be paid via prolific.</p>
                <p>No need to hit the "Next" button more than once.</p>
                {/* <img height={'250px'} src={blueFishImage} alt="fish"/> */}
            </Agent> 

            <Button display={youTwoDown != 'none' && notYouTwoDown != 'none' && youThreeDown != 'none' && notYouThreeDown != 'none' && twoThreeRight != 'none' && notTwoThreeRight != 'none' && threeTwoLeft != 'none' && notThreeTwoLeft != 'none'?  '' : 'none'} position={'absolute'} left={'40%'} top={'111.5%'} clicked={onNextHandler}>Next</Button>
            {props.children}

        </div>
        
    );
};


export default StructureFrame; 


