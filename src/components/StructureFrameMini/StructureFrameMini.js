import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Agent from '../Agent/Agent';
import MiniArrows from '../MiniArrows/MiniArrows';
import Button from '../../components/Button/Button';
import Action from '../Action/Action';
import classes from './StructureFrameMini.module.css';
import { getSocket } from '../../socket.io/socket-setup';
import StructureButton from '../StructureButton/StructureButton';
    


let socket;
let selectedStructure = [];



const StructureFrameMini = props => {

    const dispatch = useDispatch();
    const conditionNumber = useSelector(state => state.conditionData.conditionNumber);
    const scenario = useSelector(state => state.conditionData.conditionData[state.conditionData.conditionNumber]);
    const [buttonDisplay, setButtonDisplay] = useState('none');
    
    socket = getSocket();
    // getting the current participant and room which includes data from other participants 
    const thisParticipant = useSelector(state => state.currentParticipant);
 
    const room = useSelector(state => state.currentRoom);

     // unique keys of other players 
    // const [aKey, setAKey] = useState(room.participants[0].id);
    // const [bKey, setBKey] = useState(room.participants[1].id);
    // const [cKey, setCKey] = useState(room.participants[2].id);

    // console.log(selectedStructure);

     // names of players 
    const subj1Name = room.participants[0].name;
    const subj2Name = room.participants[1].name;
    const subj3Name = room.participants[2].name;

    // align random position of participant 
    const APos = parseFloat(room.participants[0].stimuli[3][0]); //'67.5%', 
    const BPos = parseFloat(room.participants[1].stimuli[3][0]); // '77.25%'
    const CPos = parseFloat(room.participants[2].stimuli[3][0]); // '87%'

    const [posReorder, setPosReorder] = useState(false);
    const currSubjId = thisParticipant.stimuli;
    const [posOrder, setPosOrder] = useState([]);

    const playerPos = {
        'subject1': posOrder.filter(item => item !== 0),
        'subject2': posOrder.filter(item => item !== 1),
        'subject3': posOrder.filter(item => item !== 2)
    }; 


    useEffect(() => {

        if (APos < BPos && APos < CPos) {
            if (BPos < CPos) {
                setPosOrder([0, 1, 2]);
            }
            else if (CPos < BPos) {
                setPosOrder([0, 2, 1]);
            }
        } else if (BPos < APos && BPos < CPos) {
            if (APos < CPos) {
                setPosOrder([1, 0, 2]);
            }
            else if (CPos < APos) {
                setPosOrder([1, 2, 0]);
            }
        } else if (CPos < BPos && CPos < APos) {
            if (APos < BPos) {
                setPosOrder([2, 0, 1]);
            }
            else if (BPos < APos) {
                setPosOrder([2, 1, 0]);
            }
        };
        
   
    },[]);

    


    const playerNames = {
        'subject1': [subj1Name, subj2Name, subj3Name],
        'subject2': [subj2Name, subj1Name, subj3Name],
        'subject3': [subj3Name, subj1Name, subj2Name,]
    }; 

 
    const [beforeSelect, setBeforeSelect] = useState(true);
    console.log(playerPos[currSubjId][0] < playerPos[currSubjId][1]);
 
    return (
        <div className={classes.StructureFrame} style={{display: props.display}}>
            {/* game interface */}
            <Agent top={"0%"} left={"-190%"} agent_id="FishInstruct">You should consider the <b>previous</b> judgments of both Jax and Tia and your own catches.</Agent>
            <Agent top={"10%"} left={"-190%"} agent_id="FishInstruct"><b>IMPORTANT</b>: <b>Tia <i>always</i></b> considers both <b>Jax’s previous judgments <i>and</i> her own catches</b>.</Agent>
            <Agent top={"20%"} left={"-190%"} agent_id="FishInstruct">This means that even if <b>Tia</b> is <b><u>LESS CONFIDENT</u></b> than Jax, she <b><u>KNOWS MORE</u></b> about the planet than Jax.</Agent>
            {/* <Agent top={"30%"} left={"-190%"} agent_id="FishInstruct"><b>IMPORTANT</b>: Even if Tia is less confident than Jax, this does not mean that she caught fewer fish.</Agent> */}
            {/* <Agent top={"30%"} left={"-190%"} agent_id="FishInstruct"><b>Jax can not</b> see any judgments from others and <b><i>only</i> uses his own catches</b> to make judgments.</Agent> */}

           

            <Agent top={"0%"} left={"-1%"} agent_id="FishInstruct">Judgment exchanges between players:</Agent>
            

            {/* agents pos top you first left second right 
            <Agent display={beforeSelect? '' : 'none'} agent_id="Mini" top={"5%"} left={'15%'}>{playerNames[thisParticipant.stimuli][0]} (you)</Agent>
            <Agent display={beforeSelect? '' : 'none'} agent_id="Mini" top={"27%"} left={'0%'}>{playerPos[currSubjId][0] > playerPos[currSubjId][1]? playerNames[thisParticipant.stimuli][2] : playerNames[thisParticipant.stimuli][1]}</Agent>
            <Agent display={beforeSelect? '' : 'none'} agent_id="Mini" top={"27%"} left={'30%'}>{playerPos[currSubjId][0] > playerPos[currSubjId][1]? playerNames[thisParticipant.stimuli][1] : playerNames[thisParticipant.stimuli][2]}</Agent> */}


            {/* new order of the above for third exp */} 
            <Agent display={beforeSelect? '' : 'none'} agent_id="Mini" top={"27%"} left={'5%'}>{playerNames[thisParticipant.stimuli][0]} (you)</Agent>
            <Agent display={beforeSelect? '' : 'none'} agent_id="Mini" top={"5%"} left={'20%'}>{playerPos[currSubjId][0] > playerPos[currSubjId][1]? playerNames[thisParticipant.stimuli][2] : playerNames[thisParticipant.stimuli][1]}</Agent>
            <Agent display={beforeSelect? '' : 'none'} agent_id="Mini" top={"27%"} left={'35%'}>{playerPos[currSubjId][0] > playerPos[currSubjId][1]? playerNames[thisParticipant.stimuli][1] : playerNames[thisParticipant.stimuli][2]}</Agent>


            {/* for order in which earlier agent is on left  */}
             {/* Connections */}
            {/* First Pair  */}
            {/* <Agent display={playerPos[currSubjId][0] < playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject1' || playerPos[currSubjId][0] < playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject2' || playerPos[currSubjId][0] < playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject3'? '' : 'none'} opacity={"1.0"}  borderColor={thisParticipant.stimuli === 'subject2' || thisParticipant.stimuli === 'subject3'? 'green' : "green"}  agent_id="ConnectionTail1Mini" top={"25%"} left={'9%'} width={'3rem'}></Agent> 
            <MiniArrows display={playerPos[currSubjId][0] < playerPos[currSubjId][1] && beforeSelect && thisParticipant.stimuli === 'subject2' || playerPos[currSubjId][0] < playerPos[currSubjId][1] && beforeSelect && thisParticipant.stimuli === 'subject3'? '' : 'none'} arrow_id="Down1" top={"49%"} left={'8.5%'}> </MiniArrows>
            <MiniArrows display={playerPos[currSubjId][0] < playerPos[currSubjId][1] && beforeSelect && thisParticipant.stimuli === 'subject1'? '' : 'none'} arrow_id="Up1" top={"38%"} left={'15.8%'}> </MiniArrows> */}
             {/* Connections */}
            {/* Second Pair  */}
            {/* <Agent display={playerPos[currSubjId][0] < playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject1' || playerPos[currSubjId][0] < playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject2' && thisParticipant.condition === 'lr' || playerPos[currSubjId][0] < playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? '' : 'none'} opacity={"1.0"}  borderColor={thisParticipant.stimuli === 'subject1'? 'green' : "green"} agent_id="ConnectionTail2Mini" top={"25%"} left={'24.5%'} width={'3rem'}></Agent> 
            <MiniArrows display={playerPos[currSubjId][0] < playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject2' && thisParticipant.condition === 'lr'? '' : 'none'} arrow_id="Down2" top={"49%"} left={'31.5%'}></MiniArrows> 
            <MiniArrows display={playerPos[currSubjId][0] < playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject1' || playerPos[currSubjId][0] < playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject3' && thisParticipant.condition === "lr"? '' : 'none'} arrow_id="Up2" top={"38%"} left={'23.5%'}> </MiniArrows> */}
            {/* Connections */}
            {/* Third Pair  */}
            {/* <Agent display={playerPos[currSubjId][0] < playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject1' && thisParticipant.condition === 'lr' || playerPos[currSubjId][0] < playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject2' || playerPos[currSubjId][0] < playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject3'? '' : 'none'} opacity={"1.0"} borderColor={"green"}  agent_id="ConnectionTail3Mini" top={"36%"} left={'15%'} width={'3rem'}></Agent> 
            <MiniArrows display={playerPos[currSubjId][0] < playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject1' && thisParticipant.condition === 'lr'? '' : 'none'} arrow_id="Right" top={"54.3%"} left={'26%'}> </MiniArrows>  */}
            {/* <MiniArrows display={playerPos[currSubjId][0] < playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject2' || playerPos[currSubjId][0] < playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject3'? '' : 'none'} arrow_id="Left" top={"54.3%"} left={'13%'}> </MiniArrows>  */}
            
            
           
            {/* now for exp 3 always fixed structure with one one left and two on top and 3 right */}
            {/* First Pair  */}
            <Agent display={playerPos[currSubjId][0] < playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject1' || playerPos[currSubjId][0] < playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject2' || playerPos[currSubjId][0] < playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject3'? '' : 'none'} opacity={"1.0"}  borderColor={thisParticipant.stimuli === 'subject2' || thisParticipant.stimuli === 'subject3'? 'green' : "green"}  agent_id="ConnectionTail1Mini" top={"25%"} left={'14%'} width={'3rem'}></Agent> 
            <MiniArrows display={''} arrow_id="Down1" top={"49%"} left={'13.5%'}> </MiniArrows>
            {/* <MiniArrows display={playerPos[currSubjId][0] < playerPos[currSubjId][1] && beforeSelect && thisParticipant.stimuli === 'subject1'? '' : 'none'} arrow_id="Up1" top={"38%"} left={'15.8%'}> </MiniArrows> */}
             {/* Connections */}
            {/* Second Pair  */}
            <Agent display={playerPos[currSubjId][0] < playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject1' || playerPos[currSubjId][0] < playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject2' && thisParticipant.condition === 'lr' || playerPos[currSubjId][0] < playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? '' : 'none'} opacity={"1.0"}  borderColor={thisParticipant.stimuli === 'subject1'? 'green' : "green"} agent_id="ConnectionTail2Mini" top={"25%"} left={'29.5%'} width={'3rem'}></Agent> 
            <MiniArrows display={''} arrow_id="Down2" top={"49%"} left={'36.5%'}></MiniArrows> 
            {/* <MiniArrows display={playerPos[currSubjId][0] < playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject1' || playerPos[currSubjId][0] < playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject3' && thisParticipant.condition === "lr"? '' : 'none'} arrow_id="Up2" top={"38%"} left={'23.5%'}> </MiniArrows> */}
            {/* Connections */}
            {/* Third Pair  */}
            <Agent display={playerPos[currSubjId][0] < playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject1' && thisParticipant.condition === 'lr' || playerPos[currSubjId][0] < playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject2' || playerPos[currSubjId][0] < playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject3'? '' : 'none'} opacity={"1.0"} borderColor={"green"}  agent_id="ConnectionTail3Mini" top={"35.5%"} left={'24%'} width={'3rem'}></Agent> 
            {/* <MiniArrows display={playerPos[currSubjId][0] < playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject1' && thisParticipant.condition === 'lr'? '' : 'none'} arrow_id="Right" top={"54.3%"} left={'26%'}> </MiniArrows>  */}
            <MiniArrows display={''} arrow_id="Left" top={"53.8%"} left={'20%'}> </MiniArrows> 
            

            {/*  now more efficient code */}
             {/* Connections */}
            {/* First Pair  */}
            {/* <Agent display={playerPos[currSubjId][0] > playerPos[currSubjId][1] && beforeSelect && thisParticipant.stimuli === 'subject1' || playerPos[currSubjId][0] > playerPos[currSubjId][1] && beforeSelect && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === "lr" || playerPos[currSubjId][0] > playerPos[currSubjId][1] && beforeSelect && thisParticipant.stimuli === 'subject2' && thisParticipant.condition === "lr"? '' : 'none'} opacity={"1.0"}  borderColor={thisParticipant.stimuli === 'subject2' || thisParticipant.stimuli === 'subject3'? 'green' : "green"}  agent_id="ConnectionTail1Mini" top={"25%"} left={'9%'} width={'3rem'}></Agent>  */}
            {/* <MiniArrows display={playerPos[currSubjId][0] > playerPos[currSubjId][1] && beforeSelect && thisParticipant.stimuli === 'subject2' && thisParticipant.condition === "lr"? '' : 'none'} arrow_id="Down1" top={"49%"} left={'8.5%'}> </MiniArrows> */}
            {/* <MiniArrows display={playerPos[currSubjId][0] > playerPos[currSubjId][1] && beforeSelect && thisParticipant.stimuli === 'subject1' || playerPos[currSubjId][0] > playerPos[currSubjId][1] && beforeSelect && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === "lr"? '' : 'none'} arrow_id="Up1" top={"38%"} left={'15.8%'}> </MiniArrows> */}
             {/* Connections */}
            {/* Second Pair  */}
            {/* <Agent display={playerPos[currSubjId][0] > playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject1' || playerPos[currSubjId][0] > playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject2' || playerPos[currSubjId][0] > playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject3'? '' : 'none'} opacity={"1.0"}  borderColor={thisParticipant.stimuli === 'subject1'? 'green' : "green"} agent_id="ConnectionTail2Mini" top={"25%"} left={'24.5%'} width={'3rem'}></Agent>  */}
            {/* <MiniArrows display={playerPos[currSubjId][0] > playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject2' || playerPos[currSubjId][0] > playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject3'? '' : 'none'} arrow_id="Down2" top={"49%"} left={'31.5%'}></MiniArrows>  */}
            {/* <MiniArrows display={playerPos[currSubjId][0] > playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject1'? '' : 'none'} arrow_id="Up2" top={"38%"} left={'23.5%'}></MiniArrows> */}
            {/* Connections */}
            {/* Third Pair  */}
            {/* <Agent display={playerPos[currSubjId][0] > playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject1' && thisParticipant.condition === 'lr' || playerPos[currSubjId][0] > playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject2' || playerPos[currSubjId][0] > playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject3'? '' : 'none'} opacity={"1.0"} borderColor={"green"}  agent_id="ConnectionTail3Mini" top={"36%"} left={'15%'} width={'3rem'}></Agent>  */}
            {/* <MiniArrows display={playerPos[currSubjId][0] > playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject2' || playerPos[currSubjId][0] > playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject3'? '' : 'none'} arrow_id="Right" top={"54.3%"} left={'26%'}> </MiniArrows> 
            <MiniArrows display={playerPos[currSubjId][0] > playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject1' && thisParticipant.condition === 'lr'? '' : 'none'} arrow_id="Left" top={"54.3%"} left={'13%'}> </MiniArrows> 
             */}

            
            {/* bulding in frame connections */}

            {/* <Agent display={playerPos[currSubjId][0] > playerPos[currSubjId][1] && beforeSelect && thisParticipant.stimuli === 'subject1' || playerPos[currSubjId][0] > playerPos[currSubjId][1] && beforeSelect && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === "lr" || playerPos[currSubjId][0] > playerPos[currSubjId][1] && beforeSelect && thisParticipant.stimuli === 'subject2' && thisParticipant.condition === "lr"? '' : 'none'} opacity={"1.0"}  borderColor={thisParticipant.stimuli === 'subject2' || thisParticipant.stimuli === 'subject3'? 'green' : "green"}  agent_id="ConnectionTail1Mini" top={"25%"} left={'9%'} width={'3rem'}></Agent> 
            <MiniArrows display={playerPos[currSubjId][0] > playerPos[currSubjId][1] && beforeSelect && thisParticipant.stimuli === 'subject2' && thisParticipant.condition === "lr"? '' : 'none'} arrow_id="Down1" top={"149%"} left={'8.5%'}> </MiniArrows>
            <MiniArrows display={playerPos[currSubjId][0] > playerPos[currSubjId][1] && beforeSelect && thisParticipant.stimuli === 'subject1' || playerPos[currSubjId][0] > playerPos[currSubjId][1] && beforeSelect && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === "lr"? '' : 'none'} arrow_id="Up1" top={"138%"} left={'15.8%'}> </MiniArrows> */}
             {/* Connections */}
            {/* Second Pair  */}
            {/* <Agent display={playerPos[currSubjId][0] > playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject1' || playerPos[currSubjId][0] > playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject2' || playerPos[currSubjId][0] > playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject3'? '' : 'none'} opacity={"1.0"}  borderColor={thisParticipant.stimuli === 'subject1'? 'green' : "green"} agent_id="ConnectionTail2Mini" top={"25%"} left={'24.5%'} width={'3rem'}></Agent> 
            <MiniArrows display={playerPos[currSubjId][0] > playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject2' || playerPos[currSubjId][0] > playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject3'? '' : 'none'} arrow_id="Down2" top={"149%"} left={'31.5%'}></MiniArrows> 
            <MiniArrows display={playerPos[currSubjId][0] > playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject1'? '' : 'none'} arrow_id="Up2" top={"138%"} left={'23.5%'}></MiniArrows> */}
            {/* Connections */}
            {/* Third Pair  */}
            {/* <Agent display={playerPos[currSubjId][0] > playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject1' && thisParticipant.condition === 'lr' || playerPos[currSubjId][0] > playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject2' || playerPos[currSubjId][0] > playerPos[currSubjId][1] && thisParticipant.stimuli === 'subject3'? '' : 'none'} opacity={"1.0"} borderColor={"green"}  agent_id="ConnectionTail3Mini" top={"36%"} left={'15%'} width={'3rem'}></Agent> 
            <MiniArrows display={playerPos[currSubjId][0] > playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject2' || playerPos[currSubjId][0] > playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject3'? '' : 'none'} arrow_id="Right" top={"154.3%"} left={'26%'}> </MiniArrows> 
            <MiniArrows display={playerPos[currSubjId][0] > playerPos[currSubjId][1] &&  thisParticipant.stimuli === 'subject1' && thisParticipant.condition === 'lr'? '' : 'none'} arrow_id="Left" top={"154.3%"} left={'13%'}> </MiniArrows> 
             */}
           
        
            {/* <Button display={youTwoDown != 'none' && notYouTwoDown != 'none' && youThreeDown != 'none' && notYouThreeDown != 'none' && twoThreeRight != 'none' && notTwoThreeRight != 'none' && threeTwoLeft != 'none' && notThreeTwoLeft != 'none'?  '' : 'none'} position={'absolute'} left={'40%'} top={'111.5%'} clicked={onNextHandler}>Next</Button> */}
            {props.children}

        </div>
        
    );
};


export default StructureFrameMini; 


