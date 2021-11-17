import React, { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Agent from '../Agent/Agent';
import Action from '../Action/Action';
import Scores from '../Scores/Scores';
import { getSocket } from '../../socket.io/socket-setup';
import { useDispatch, useSelector } from 'react-redux';
import classes from './PlanetFrame.module.css';
import MiniArrows from '../MiniArrows/MiniArrows';
import PrivateEvidenceBetweenTrials from '../PrivateEvidenceBetweenTrials/PrivateEvidenceBetweenTrials';
import { storeSELECTION } from '../../store/actions/participantData';
import blueFishImage from '../../static/images/blue_fish.png';
// import reminderSound from '../../static/sounds/reminder_sound.mp3';
import redFishImage from '../../static/images/red_fish.png';
import { incrementCondition } from '../../store/actions/conditionData';
import { pages, goToPage } from '../../store/actions/navigation';
import { registerParticipantPID } from '../../store/actions/currentParticipant';
import StructureFrame from '../StructureFrame/StructureFrame';
const publicIp = require('public-ip');



// here we need the participant and room details again to commmunicate with the server 

let socket;
let n_trials;

 
const PlanetFrame = props => {
    const dispatch = useDispatch();
  
    // getting scoket 
    socket = getSocket();

    const [remainingTime, setRemainingTime] = useState(30);
    const [remainingTime2, setRemainingTime2] = useState(10);
    const [remainingTime3, setRemainingTime3] = useState(40);
    const [inTime, setInTime] = useState(true);
    const [selectedFunction, setSelectedFunction] = useState(false);
    const [disableSelection, setDisableSelection] = useState(false);


    useEffect(() => {
        const timeOut = setTimeout (() => {
            if (remainingTime > -10) {
                setRemainingTime(remainingTime-1);
                // setTimeDisplay("You have " + remainingTime + " seconds left.");
            };

            if (remainingTime === -8 && !showStructure) {
                timeToNext();
                
            };

            if (remainingTime > 10 && beforeSelect === '') {
                setTimeDisplay("You have " + remainingTime + " seconds left.");
            };

            if (remainingTime > 30 && showStructure) {
                setTimeDisplay("You have " + remainingTime + " seconds left.");
            };

            if (remainingTime <= 10 && beforeSelect === '') {
                setInTime(false);
                setTimeDisplay("YOU HAVE " + remainingTime + " SECONDS LEFT TO MAKE A SELECTION AND CLICK NEXT. OTHERWISE YOU WILL PROCEED AUTOMATICALLY AND LOSE £0.15 OF YOUR MAXIMUM BONUS IN EACH ROUND.");
                
            };

            if (remainingTime <= 30 && showStructure && !room.planetSelections[thisParticipant.id][11]) {
                setTimeDisplay("YOU HAVE " + remainingTime + " SECONDS LEFT TO MAKE A SELECTION FOR EACH OF THE FOUR POSSIBLE INFLUENCES, OTHERWISE YOU WILL LOSE YOUR BONUS.");
                setInTime(false);
            };

            if (remainingTime === 11 && beforeSelect === '' || remainingTime === 31 && showStructure === true && !room.planetSelections[thisParticipant.id][11]) {
                play();
            };

            if (remainingTime === 2 && beforeSelect === '' || remainingTime === 2 && showStructure === true && !room.planetSelections[thisParticipant.id][11]) {
                play();
            };

            if (remainingTime === 1 && beforeSelect === '' && !showStructure) {
                let previousResponse = false;
                if (room.planetSelections[thisParticipant.id]) {
                   
                    let trial = room.planetSelections[thisParticipant.id].length - 1;   
                    previousResponse = room.planetSelections[thisParticipant.id][trial];
 
                    let prev_color = previousResponse.color;
                    let prev_conf = previousResponse.confidence;
    
                    // flipping confidence if blue and adding 3 if color was red to adjust scale 
                    if (prev_color === 'red') {
                        prev_conf = prev_conf + 3;
                    } else  {
                        if (prev_conf === 3) {
                            prev_conf = 0;
                        } else if (prev_conf == 2) {
                            prev_conf = 1;
                        } else if (prev_conf == 1) {
                            prev_conf = 2;
                        };
                    };

                    // neutral confidence
                    if (prev_color === 'lightgray') {
                        prev_conf = 3;
                    };

                    // call function based on previous response 
                    selectionFunctions[prev_conf]();
                    
                    

                } else {
                    
                    selectionFunctions[3](); // call random Function if no previous resp exists
                    
                };

                setSimulatedResponse(true);
                setDisableSelection(true);
          
            }; 

            if (remainingTime <= 1 && beforeSelect == '' && !showStructure) {
                setTimeDisplay("PROCEEDING AUTOMATICALLY...");
            };

            if (remainingTime === -4 && beforeSelect === '' && !showStructure) {
                setInTime(true);
                setSimulatedResponse(true);
                onNextHandler();   
            };



            if (remainingTime === 0 && showStructure) {
                checkScoreDisplays(1);
            };
            
            clearTimeout(timeOut);
        }, 1000)
        return () => {
            clearTimeout(timeOut);
        }; 
    },[remainingTime]);


    useEffect(() => {
        const timeOut4 = setTimeout (() => {
            if (remainingTime2 > 0) {
                setRemainingTime2(remainingTime2-1);
            };
            if (remainingTime2 === 0) {
                // alert('please make a selection');
                // play();
            };
            clearTimeout(timeOut4);
        }, 1000)
        return () => {
            clearTimeout(timeOut4);
        }; 
    },[remainingTime2]);
   
    const play = () => {   
        const beepsound = new Audio(reminderSound);   
        beepsound.play();   
    };   


    
   
 

    // getting the current participant and room which includes data from other participants 
    const thisParticipant = useSelector(state => state.currentParticipant);
    const room = useSelector(state => state.currentRoom);
    const PID =  useSelector(state => state.participantID);
    const training = useSelector(state => state.training);
    const socialTraining = useSelector(state => state.socialTraining);
    const socialTrainingStructure = useSelector(state => state.socialTrainingStructure);
    
 
    // console.log(socialTraining);
    
    // getting ip address to track if we have multiple completions 
    const [IPAdress, setIPAdress] = useState('none');
    
    (async () => {
          setIPAdress(await publicIp.v4());
    })();
  
  
      
 
   

    // getting the condition data 
    const conditionData = useSelector(state => state.conditionData.conditionData[state.conditionData.conditionNumber]);
    // extractiong condition number and initial fish 
    const conditionNumber = useSelector(state => state.conditionData.conditionNumber);
    const fish = thisParticipant.fish;



    // names of players 
    const subj1Name = room.participants[0].name;
    const subj2Name = room.participants[1].name;
    const subj3Name = room.participants[2].name;

    const playerNames = {
        'subject1': [subj2Name, subj3Name],
        'subject2': [subj1Name, subj3Name],
        'subject3': [subj1Name, subj2Name]
    }; 

    // console.log(playerNames);
    // console.log(playerNames[thisParticipant.stimuli][0]);

    

    // determining which fish picture to show to pp depending on their initial fish
    const displayFish = {0: ['', 'none'],
                        1: ['none', '']};

    // random planet and confidence position 
    const planetPosition = {
        '0': ['7%', '52%'],
        '1': ['52%', '17']
    };

    const confColor = {
        '0': ['deepskyblue', 'red'],
        '1': ['red', 'deepskyblue']
    };

    const confText = {
        '0': ['BLUE', 'RED'],
        '1': ['RED', 'BLUE']
    };

    // initially unknown choice of other players
    const [aChoices, setAChoices] = useState([['?', 'white'], ['?', 'white'], ['?', 'white'], ['?', 'white'], ['?', 'white'], ['?', 'white'], ['?', 'white'],  ['?', 'white'],  ['?', 'white'],  ['?', 'white'],  ['?', 'white']])
    const [bChoices, setBChoices] = useState([['?', 'white'], ['?', 'white'], ['?', 'white'], ['?', 'white'], ['?', 'white'], ['?', 'white'], ['?', 'white'],  ['?', 'white'],  ['?', 'white'],  ['?', 'white'],  ['?', 'white']])
    const [cChoices, setCChoices] = useState([['?', 'white'], ['?', 'white'], ['?', 'white'], ['?', 'white'], ['?', 'white'], ['?', 'white'], ['?', 'white'],  ['?', 'white'],  ['?', 'white'],  ['?', 'white'],  ['?', 'white']])

    // unique keys of other players 
    const [aKey, setAKey] = useState(room.participants[0].id);
    const [bKey, setBKey] = useState(room.participants[1].id);
    const [cKey, setCKey] = useState(room.participants[2].id);

    // hiding / displaying selections of other players dependent on status of the game 
    const [scoreDisplays, setScoreDisplays] = useState(['none', 'none', 'none', 'none', 'none','none', 'none', 'none', 'none', 'none']);
    const showScore = '';

    // before and after selection visibility 
    const [beforeSelect, setBeforeSelect] = useState('');
    const [afterSelect, setAfterSelect] = useState('none');
    const [trialComplete, setTrialComplete] = useState('none');

  
    // random position of participant
    const APos = room.participants[0].stimuli[3];
    const BPos = room.participants[1].stimuli[3];
    const CPos = room.participants[2].stimuli[3];
    


 
 
    // button only shown after participant made selection 
    const [buttonDisplay, setButtonDisplay] = useState('none');

    // confidence selections
    const selectVeryHighConfidenceLeft = () => {
        setButtonDisplay('');
        setVeryHighConfidenceRight('0.2');
        setHighConfidenceRight('0.2');
        setMediumConfidenceRight('0.2');
        setNeutralConfidence('0.2');
        setVeryHighConfidenceLeft('1.0');
        setHighConfidenceLeft('0.2');
        setMediumConfidenceLeft('0.2');
        setConfidence(3);
        setPlanetSelected(confColor[conditionData.planetPosition[0]][0])
    };

    const selectHighConfidenceLeft = () => {
        setButtonDisplay('');
        setVeryHighConfidenceRight('0.2');
        setHighConfidenceRight('0.2');
        setMediumConfidenceRight('0.2');
        setNeutralConfidence('0.2');
        setVeryHighConfidenceLeft('0.2');
        setHighConfidenceLeft('1.0');
        setMediumConfidenceLeft('0.2');
        setConfidence(2);
        setPlanetSelected(confColor[conditionData.planetPosition[0]][0]);
    };

    const selectMediumConfidenceLeft = () => {
        setButtonDisplay('');
        setVeryHighConfidenceRight('0.2');
        setHighConfidenceRight('0.2');
        setMediumConfidenceRight('0.2');
        setNeutralConfidence('0.2');
        setVeryHighConfidenceLeft('0.2');
        setHighConfidenceLeft('0.2');
        setMediumConfidenceLeft('1.0');
        setConfidence(1);
        setPlanetSelected(confColor[conditionData.planetPosition[0]][0]);
    };

    const selectNeutralConfidence = () => {
        setButtonDisplay('');
        setVeryHighConfidenceRight('0.2');
        setHighConfidenceRight('0.2');
        setMediumConfidenceRight('0.2');
        setNeutralConfidence('1.0');
        setVeryHighConfidenceLeft('0.2');
        setHighConfidenceLeft('0.2');
        setMediumConfidenceLeft('0.2');
        setConfidence(0);
        setPlanetSelected('lightgray');
    };

    const selectMediumConfidenceRight = () => {
        setButtonDisplay('');
        setVeryHighConfidenceRight('0.2');
        setHighConfidenceRight('0.2');
        setMediumConfidenceRight('1.0');
        setNeutralConfidence('0.2');
        setVeryHighConfidenceLeft('0.2');
        setHighConfidenceLeft('0.2');
        setMediumConfidenceLeft('0.2');
        setConfidence(1);
        setPlanetSelected(confColor[conditionData.planetPosition[0]][1])
    };

    const selectHighConfidenceRight = () => {
        setButtonDisplay('');
        setVeryHighConfidenceRight('0.2');
        setHighConfidenceRight('1.0');
        setMediumConfidenceRight('0.2');
        setNeutralConfidence('0.2');
        setVeryHighConfidenceLeft('0.2');
        setHighConfidenceLeft('0.2');
        setMediumConfidenceLeft('0.2');
        setConfidence(2);
        setPlanetSelected(confColor[conditionData.planetPosition[0]][1])
    };

    const selectVeryHighConfidenceRight = () => {
        setButtonDisplay('');
        setVeryHighConfidenceRight('1.0');
        setHighConfidenceRight('0.2');
        setMediumConfidenceRight('0.2');
        setNeutralConfidence('0.2');
        setVeryHighConfidenceLeft('0.2');
        setHighConfidenceLeft('0.2');
        setMediumConfidenceLeft('0.2');
        setConfidence(3);
        // console.log(confColor[conditionData.planetPosition[0]][1]);
        setPlanetSelected(confColor[conditionData.planetPosition[0]][1])
    };

    const selectionFunctions = [selectVeryHighConfidenceLeft, selectHighConfidenceLeft, selectMediumConfidenceLeft, selectNeutralConfidence, selectMediumConfidenceRight, selectHighConfidenceRight, selectVeryHighConfidenceRight];

    const [mediumConfidenceLeft, setMediumConfidenceLeft] = useState('.2');
    const [highConfidenceLeft, setHighConfidenceLeft] = useState('.2');
    const [veryHighConfidenceLeft, setVeryHighConfidenceLeft] = useState('.2');
    const [neutralConfidence, setNeutralConfidence] = useState('.2');
    const [mediumConfidenceRight, setMediumConfidenceRight] = useState('.2');
    const [highConfidenceRight, setHighConfidenceRight] = useState('.2');
    const [veryHighConfidenceRight, setVeryHighConfidenceRight] = useState('.2');
    const [confidence, setConfidence] = useState('0');
    const [planetSelected, setPlanetSelected] = useState('none');
    const [simulatedResponse, setSimulatedResponse] = useState(false);
    // const [confColor, setConfColor] = useState('grey');
    const [fullPlanetData, setFullPlanetData] = useState(0);
    const [timeDisplay, setTimeDisplay] = useState("You have " + remainingTime + " seconds left.")
    const [structureDelay, setStructureDelay] = useState(false);


    // display scores after end of each trial 
    const checkScoreDisplays = (trial) => {
        if (room.planetSelections[aKey] &&
            room.planetSelections[bKey] && 
            room.planetSelections[cKey]) {

            if (room.planetSelections[aKey][trial] &&
                room.planetSelections[bKey][trial] &&
                room.planetSelections[cKey][trial]) {

                if (room.planetSelections[aKey][10] &&
                    room.planetSelections[bKey][10] &&
                    room.planetSelections[cKey][10]) {
                    
                    // if (conditionNumber === 2) {
                    //     return dispatch(goToPage(pages.DEBRIEF));
                    // };
                    
                    return dispatch(goToPage(pages.DEBRIEF));
                    // dispatch(incrementCondition());
                    
                };

                return true;
            };
            return "wait";
            
        };
        return "wait";
    };

    const checkSelectedScore = (key) => {
        if (room.planetSelections[key]) {
            return checkScoreDisplays(room.planetSelections[key].length-1);
        
        }
    };

    const checkSelectedScoreAgain = (key) => {
        if (room.planetSelections[key][room.planetSelections[key].length-1]) {
            return true;
        
        }
    };


    // what happens after pp makes planet selection 
    const onNextHandler = () => {
        // dispatch(storeSELECTION({ selectedPlanet: planetSelected, confidence: confidence, conditionNumber: conditionNumber }));
        // console.log(room.id);
        setInTime(true);
        setAfterSelect('');
        setBeforeSelect('none');
        setDisableSelection(false);
        setShowPrivate(false);



        // if (simulatedResponse === true) {
        //     console.log('was simulat');
        //     selectionFunctions[Math.floor(Math.random() * selectionFunctions.length)]();
        //     console.log(confidence);
        // };
        // console.log('confidence');
        // console.log(confidence);
        // console.log(training);
        socket.emit('planet-selected',
            {
                planetSelectionTrial: { participantId: thisParticipant.id, confidence: confidence, color: planetSelected, conditionNumber: conditionNumber, participantPID: PID, participantNumber: thisParticipant.stimuli, globalCondition: thisParticipant.condition, globalFish: thisParticipant.fish, simulatedResponse: simulatedResponse, IPAdress: IPAdress, training: training, socialTraining: socialTraining, socialTrainingStructure: socialTrainingStructure },
                roomId: room.id 
            })

        setButtonDisplay('none');    
         // timeToNext();
        
        // setRemainingTime2(5);
        // timeOut4Exec();
        
    };

    // restarting a new trial if time is time out 

    const [showPrivate, setShowPrivate] = useState(true);
    const [showStructure, setShowStructure] = useState(false);
    const [planetDelay, setPlanetDelay] = useState(true);
    const participantNumber = thisParticipant.stimuli;
    // const [clickedTimeToNext, setClickedTimeToNext] = useState(false);

    const structureDelayFunc = () => {
        const timeOut6 = setTimeout(() => {
            setStructureDelay(true);
            clearTimeout(timeOut6);
        }, 5000); 
    };


    const planetDelayFunc = () => {
        if (!showStructure) {
            const timeOut7 = setTimeout(() => {
                setPlanetDelay(true);
                clearTimeout(timeOut7);
            }, 3000);
        };
    };

    const timeToNext = () => { 
        // setClickedTimeToNext(true);
        setInTime(true);
        setPlanetDelay(false);
        // planetDelayFunc();
        // checkl if ready
        setSimulatedResponse(false);
        if (checkScoreDisplays(9) == true) {
            // if condition is structure known:
            dispatch(goToPage(pages.DEBRIEF));
            // if not known activate all of these again!
            // setShowStructure(true);
            // setRemainingTime(120);
            // setShowPrivate(false);
            // setBeforeSelect('none');
            // setAfterSelect('none');
            // structureDelayFunc();
            // console.log('h');
            return false;
        }
        const timeOut1 = setTimeout(() => {
            setShowPrivate(true);
            setAfterSelect('none'); 
            clearTimeout(timeOut1);
        }, 500);

        const timeOut2 = setTimeout(() => {
            // if (participantNumber === 'subject1' && room.planetSelections[aKey] && !room.planetSelections[aKey][1] || participantNumber === 'subject2' && room.planetSelections[bKey] && room.planetSelections[bKey][2] && !room.planetSelections[bKey][3] || participantNumber === 'subject3' && room.planetSelections[cKey] && room.planetSelections[cKey][5] && !room.planetSelections[cKey][6]) {
            setShowPrivate(true);
            // } else {
                // setShowPrivate(false);
            // }; 
            // setShowPrivate(false);
            clearTimeout(timeOut2);
        }, 5500);

        const timeOut3 = setTimeout(() => {
            nextTrial();
        }, 6500);
        
    };

    const nextTrial = () => {
        setRemainingTime(20);
        planetDelayFunc();
        setBeforeSelect('');  
        setVeryHighConfidenceRight('0.2');
        setHighConfidenceRight('0.2');
        setMediumConfidenceRight('0.2');
        setNeutralConfidence('0.2');
        setVeryHighConfidenceLeft('0.2');
        setHighConfidenceLeft('0.2');
        setMediumConfidenceLeft('0.2');
    };

    // // // // proceed if trial complete
    // if (checkSelectedScore(thisParticipant.id) === true && afterSelect == '') {
    //     const timeOut5 = setTimeout(() => {
    //         timeToNext();
    //         clearTimeout(timeOut5);
    //     }, 5000);
    // };
    
    return (
        <div className={classes.PlanetFrame} style={{ display: props.display }}>
            {/* game interface */}
            <Agent display={beforeSelect === '' && planetDelay || showStructure && structureDelay? '' : 'none'} left={"17%"} top={'-11.5%'} agent_id="instr_frame_time">{timeDisplay}</Agent>
            {/* <Agent display={beforeSelect === '' || showStructure && room.planetSelections[thisParticipant.id].length != 11 && remainingTime === 15? '' : 'none'} left={"17%"} agent_id="instr_frame_time_warning">You have {remainingTime} seconds left to make a selection.</Agent> */}
            {/* <Agent display={checkSelectedScore(thisParticipant.id) === true && afterSelect ===''? showScore : scoreDisplays[0]} agent_id="instr_frame_time">Proceeding to next trial in {remainingTime2} seconds.</Agent> */}
            <Agent display={beforeSelect === '' && inTime? '' : 'none'} left={'7%'} width={'35rem'} agent_id="instr_frame" >ON WHICH PLANET DID YOU CATCH FISH  ?</Agent> 
            <Agent display={beforeSelect === ''? '' : 'none'} top={"82%"} left={'7%'} width={'35rem'} agent_id="instr_frame_bonus" >Remember, the planet stays the same for the whole game but you may see more evidence about it over time. Also remember, you receive a bonus every time you make a judgment in the correct direction.</Agent> 
            <Agent display={checkSelectedScore(thisParticipant.id) === "wait" && afterSelect ===''? showScore : scoreDisplays[0]} left={'7%'} width={'35rem'} agent_id="instr_frame" >WAITING FOR OTHER PLAYERS...</Agent>
            <Agent display={checkSelectedScore(thisParticipant.id) === true && afterSelect ==='' && checkScoreDisplays(9) === 'wait'? showScore : scoreDisplays[0]} left={'7%'} width={'35rem'} agent_id="instr_frame" >COMPLETE! LOADING NEXT ROUND...</Agent>
            <Agent display={checkSelectedScore(thisParticipant.id) === true && afterSelect ==='' && checkScoreDisplays(9) === true? showScore : scoreDisplays[0]} left={'7%'} width={'35rem'} agent_id="instr_frame" >COMPLETE! LOADING DEBRIEFING...</Agent>
            <Agent display={showStructure && room.planetSelections[thisParticipant.id].length != 11 && inTime? '' : 'none'} left={'7%'} width={'35rem'} agent_id="instr_frame" >Who sees whose judgments?</Agent>
            {/* <Agent display={showStructure && room.planetSelections[thisParticipant.id].length != 11 && inTime? '' : 'none'} left={'7%'} width={'35rem'} agent_id="instr_frame_2" >(i.e. )</Agent> */}
            <Agent display={showStructure && room.planetSelections[thisParticipant.id].length != 11 && inTime? '' : 'none'} left={'7%'} width={'35rem'} agent_id="instr_frame_2" >(tick ❌ or ✔ for each of the four remaining relationships)</Agent>

      
            {/* code shown between selections */}
           
            {showPrivate &&<PrivateEvidenceBetweenTrials/>}
            {showStructure &&<StructureFrame/>}

    
            {/* Confidence DISPLAY */}
            <Action display={beforeSelect === '' && !disableSelection? "" : 'none'} onClick={selectVeryHighConfidenceLeft} opacity={veryHighConfidenceLeft} background={confColor[conditionData.planetPosition[0]][0]} action_id='ConfidenceVeryHighLeft'>3</Action>
            <Action display={beforeSelect === '' && !disableSelection? "" : 'none'} onClick={selectHighConfidenceLeft} opacity={highConfidenceLeft} background={confColor[conditionData.planetPosition[0]][0]} action_id='ConfidenceHighLeft'>2</Action>
            <Action display={beforeSelect === '' && !disableSelection? "" : 'none'} onClick={selectMediumConfidenceLeft} opacity={mediumConfidenceLeft} background={confColor[conditionData.planetPosition[0]][0]} action_id='ConfidenceMediumLeft'>1</Action>
            <Action display={beforeSelect === '' && !disableSelection? "" : 'none'} onClick={selectNeutralConfidence} opacity={neutralConfidence} background={'lightgrey'} action_id='ConfidenceNeutral'>0</Action>
            <Action display={beforeSelect === '' && !disableSelection? "" : 'none'} onClick={selectMediumConfidenceRight} opacity={mediumConfidenceRight} background={confColor[conditionData.planetPosition[0]][1]} action_id='ConfidenceMediumRight'>1</Action>
            <Action display={beforeSelect === '' && !disableSelection? "" : 'none'} onClick={selectHighConfidenceRight} opacity={highConfidenceRight} background={confColor[conditionData.planetPosition[0]][1]} action_id='ConfidenceHighRight'>2</Action>
            <Action display={beforeSelect === '' && !disableSelection? "" : 'none'} onClick={selectVeryHighConfidenceRight} opacity={veryHighConfidenceRight} background={confColor[conditionData.planetPosition[0]][1]} action_id='ConfidenceVeryHighRight'>3</Action>
 
            <Action display={beforeSelect} background='white' action_id='ConfidenceVeryHighLeftLegend'>Highly Confident {confText[conditionData.planetPosition[0]][0]}</Action>
            <Action display={beforeSelect} background='white' action_id='ConfidenceHighLeftLegend'>Moderately Confident {confText[conditionData.planetPosition[0]][0]}</Action>
            <Action display={beforeSelect} background='white' action_id='ConfidenceMediumLeftLegend'>Slightly Confident {confText[conditionData.planetPosition[0]][0]}</Action>
            <Action display={beforeSelect} background='white' action_id='ConfidenceNeutralLegend'>I don't know</Action>
            <Action display={beforeSelect} background='white' action_id='ConfidenceMediumRightLegend'>Slightly Confident {confText[conditionData.planetPosition[0]][1]}</Action>
            <Action display={beforeSelect} background='white' action_id='ConfidenceHighRightLegend'>Moderately Confident {confText[conditionData.planetPosition[0]][1]}</Action>
            <Action display={beforeSelect} background='white' action_id='ConfidenceVeryHighRightLegend'>Highly Confident {confText[conditionData.planetPosition[0]][1]}</Action>

           
            {/* TRIAL SUMMARY */}
            <Scores score_id="instr_frame" >TRIAL SUMMARY</Scores>
            <Scores left={APos[0]} score_id="A_name" >{room.participants[0].name}</Scores>
            <Scores left={BPos[0]} score_id="B_name" >{room.participants[1].name}</Scores>
            <Scores left={CPos[0]} score_id="C_name" >{room.participants[2].name}</Scores>

            {/* Private Evidence History */}
            <Agent position={'absolute'} left={APos[4]} top={'16.9%'} width={'20px'} agent_id="Fish" display={participantNumber === 'subject1' && checkScoreDisplays(1) === true? displayFish[fish][0] : 'none'}>
                <img height={'50px'} src={redFishImage} alt="fish"/>
            </Agent>

            <Agent position={'absolute'} left={BPos[4]} top={'32.5%'} width={'20px'} agent_id="Fish" display={participantNumber === 'subject2' && checkScoreDisplays(3) === true? displayFish[fish][0] : 'none'}>
                <img height={'50px'} src={redFishImage} alt="fish"/>
            </Agent>

            <Agent position={'absolute'} left={CPos[4]} top={'57.2%'} width={'20px'} agent_id="Fish" display={participantNumber === 'subject3' && checkScoreDisplays(6) === true? displayFish[fish][0] : 'none'}>
                <img height={'50px'} src={redFishImage} alt="fish"/>
            </Agent>

            <Agent position={'absolute'} left={APos[4]} top={'16.9%'} width={'20px'} agent_id="Fish" display={participantNumber === 'subject1' && checkScoreDisplays(1) === true?  displayFish[fish][1] : 'none'}>
                <img height={'50px'} src={blueFishImage} alt="fish"/>
            </Agent>

            <Agent position={'absolute'} left={BPos[4]} top={'32.5%'} width={'20px'} agent_id="Fish" display={participantNumber === 'subject2' && checkScoreDisplays(3) === true? displayFish[fish][1] : 'none'}>
                <img height={'50px'} src={blueFishImage} alt="fish"/>
            </Agent>

            <Agent position={'absolute'} left={CPos[4]} top={'57.2%'} width={'20px'} agent_id="Fish" display={participantNumber === 'subject3' && checkScoreDisplays(6) === true? displayFish[fish][1] : 'none'}>
                <img height={'50px'} src={blueFishImage} alt="fish"/>
            </Agent>



           

           
          
            {/* A Scores */}
            <Scores display={checkScoreDisplays(0) === true? showScore : scoreDisplays[0]} background={room.planetSelections[aKey] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][0].color : aChoices[0][1]}  id="A1" score_id="A1"  top={'6%'} left={APos[1]}  >{room.planetSelections[aKey] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][0].confidence : aChoices[0][0]}</Scores> 
            <Scores display={checkScoreDisplays(1) === true? showScore : scoreDisplays[1]} background={room.planetSelections[aKey] && room.planetSelections[aKey][1] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][1].color: aChoices[1][1]} id="A1" score_id="A1"  top={'14%'} left={APos[1]} >{room.planetSelections[aKey] && room.planetSelections[aKey][1] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][1].confidence : aChoices[1][0]}</Scores> 
            <Scores display={checkScoreDisplays(2) === true? showScore : scoreDisplays[2]} background={room.planetSelections[aKey] && room.planetSelections[aKey][2] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][2].color: aChoices[2][1]} id="A1" score_id="A1"  top={'22%'} left={APos[1]} >{room.planetSelections[aKey] && room.planetSelections[aKey][2] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][2].confidence : aChoices[2][0]}</Scores> 
            <Scores display={checkScoreDisplays(3) === true? showScore : scoreDisplays[3]} background={room.planetSelections[aKey] && room.planetSelections[aKey][3] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][3].color: aChoices[3][1]}  id="A1" score_id="A1"  top={'30%'} left={APos[1]}>{room.planetSelections[aKey] && room.planetSelections[aKey][3] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][3].confidence : aChoices[3][0]}</Scores> 
            <Scores display={checkScoreDisplays(4) === true? showScore : scoreDisplays[4]} background={room.planetSelections[aKey] && room.planetSelections[aKey][4] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][4].color: aChoices[4][1]}  id="A1" score_id="A1"  top={'38%'} left={APos[1]}>{room.planetSelections[aKey] && room.planetSelections[aKey][4] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][4].confidence : aChoices[4][0]}</Scores> 
            <Scores display={checkScoreDisplays(5) === true? showScore : scoreDisplays[5]} background={room.planetSelections[aKey] && room.planetSelections[aKey][5] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][5].color: aChoices[5][1]}  id="A1" score_id="A1"  top={'46%'} left={APos[1]}>{room.planetSelections[aKey] && room.planetSelections[aKey][5] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][5].confidence : aChoices[5][0]}</Scores> 
            <Scores display={checkScoreDisplays(6) === true? showScore : scoreDisplays[6]} background={room.planetSelections[aKey] && room.planetSelections[aKey][6] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][6].color: aChoices[6][1]}  id="A1" score_id="A1"  top={'54%'} left={APos[1]}>{room.planetSelections[aKey] && room.planetSelections[aKey][6] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][6].confidence : aChoices[6][0]}</Scores> 
            <Scores display={checkScoreDisplays(7) === true? showScore : scoreDisplays[7]} background={room.planetSelections[aKey] && room.planetSelections[aKey][7] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][7].color: aChoices[7][1]}  id="A1" score_id="A1"  top={'62%'} left={APos[1]}>{room.planetSelections[aKey] && room.planetSelections[aKey][7] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][7].confidence : aChoices[7][0]}</Scores> 
            <Scores display={checkScoreDisplays(8) === true? showScore : scoreDisplays[8]} background={room.planetSelections[aKey] && room.planetSelections[aKey][8] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][8].color: aChoices[8][1]}  id="A1" score_id="A1"  top={'70%'} left={APos[1]}>{room.planetSelections[aKey] && room.planetSelections[aKey][8] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][8].confidence : aChoices[8][0]}</Scores> 
            <Scores display={checkScoreDisplays(9) === true? showScore : scoreDisplays[9]} background={room.planetSelections[aKey] && room.planetSelections[aKey][9] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][9].color: aChoices[9][1]}  id="A1" score_id="A1"  top={'78%'} left={APos[1]}>{room.planetSelections[aKey] && room.planetSelections[aKey][9] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][9].confidence : aChoices[9][0]}</Scores> 
            
             {/* B Scores */}
            <Scores display={checkScoreDisplays(0) === true? showScore : scoreDisplays[0]} background={room.planetSelections[bKey] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][0].color : bChoices[0][1]}  id="B1" score_id="B1"  top={'6%'} left={BPos[1]} >{room.planetSelections[bKey] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][0].confidence : aChoices[0][0]}</Scores> 
            <Scores display={checkScoreDisplays(1) === true? showScore : scoreDisplays[1]} background={room.planetSelections[bKey] && room.planetSelections[bKey][1] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][1] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][1] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][1].color: bChoices[1][1]} id="B1" score_id="B1"  top={'14%'} left={BPos[1]}>{room.planetSelections[bKey] && room.planetSelections[bKey][1] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][1] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][1] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][1].confidence : bChoices[1][0]}</Scores> 
            <Scores display={checkScoreDisplays(2) === true? showScore : scoreDisplays[2]} background={room.planetSelections[bKey] && room.planetSelections[bKey][2] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][2] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][2] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][2].color: bChoices[2][1]} id="B1" score_id="B1"  top={'22%'} left={BPos[1]}>{room.planetSelections[bKey] && room.planetSelections[bKey][2] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][2] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][2] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][2].confidence : bChoices[2][0]}</Scores> 
            <Scores display={checkScoreDisplays(3) === true? showScore : scoreDisplays[3]} background={room.planetSelections[bKey] && room.planetSelections[bKey][3] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][3] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][3] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][3].color: bChoices[3][1]} id="B1" score_id="B1"  top={'30%'} left={BPos[1]}>{room.planetSelections[bKey] && room.planetSelections[bKey][3] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][3] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][3] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][3].confidence : bChoices[3][0]}</Scores> 
            <Scores display={checkScoreDisplays(4) === true? showScore : scoreDisplays[4]} background={room.planetSelections[bKey] && room.planetSelections[bKey][4] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][4] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][4] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][4].color: bChoices[4][1]} id="B1" score_id="B1"  top={'38%'} left={BPos[1]}>{room.planetSelections[bKey] && room.planetSelections[bKey][4] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][4] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][4] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][4].confidence : bChoices[4][0]}</Scores> 
            <Scores display={checkScoreDisplays(5) === true? showScore : scoreDisplays[5]} background={room.planetSelections[bKey] && room.planetSelections[bKey][5] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][5] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][5] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][5].color: bChoices[5][1]} id="B1" score_id="B1"  top={'46%'} left={BPos[1]}>{room.planetSelections[bKey] && room.planetSelections[bKey][5] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][5] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][5] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][5].confidence : bChoices[5][0]}</Scores> 
            <Scores display={checkScoreDisplays(6) === true? showScore : scoreDisplays[6]} background={room.planetSelections[bKey] && room.planetSelections[bKey][6] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][6] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][6] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][6].color: bChoices[6][1]} id="B1" score_id="B1"  top={'54%'} left={BPos[1]}>{room.planetSelections[bKey] && room.planetSelections[bKey][6] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][6] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][6] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][6].confidence : bChoices[6][0]}</Scores> 
            <Scores display={checkScoreDisplays(7) === true? showScore : scoreDisplays[7]} background={room.planetSelections[bKey] && room.planetSelections[bKey][7] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][7] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][7] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][7].color: bChoices[7][1]} id="B1" score_id="B1"  top={'62%'} left={BPos[1]}>{room.planetSelections[bKey] && room.planetSelections[bKey][7] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][7] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][7] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][7].confidence : bChoices[7][0]}</Scores> 
            <Scores display={checkScoreDisplays(8) === true? showScore : scoreDisplays[8]} background={room.planetSelections[bKey] && room.planetSelections[bKey][8] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][8] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][8] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][8].color: bChoices[8][1]} id="B1" score_id="B1"  top={'70%'} left={BPos[1]}>{room.planetSelections[bKey] && room.planetSelections[bKey][8] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][8] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][8] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][8].confidence : bChoices[8][0]}</Scores> 
            <Scores display={checkScoreDisplays(9) === true? showScore : scoreDisplays[9]} background={room.planetSelections[bKey] && room.planetSelections[bKey][9] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][9] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][9] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][9].color: bChoices[9][1]} id="B1" score_id="B1"  top={'78%'} left={BPos[1]}>{room.planetSelections[bKey] && room.planetSelections[bKey][9] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][9] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][9] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][9].confidence : bChoices[9][0]}</Scores> 
             
            {/* C scores  */}
            <Scores display={checkScoreDisplays(0) === true? showScore : scoreDisplays[0]} background={room.planetSelections[cKey] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][0].color : cChoices[0][1]}  id="C1" score_id="C1"  top={'6%'} left={CPos[1]}>{room.planetSelections[cKey] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][0].confidence : cChoices[0][0]}</Scores> 
            <Scores display={checkScoreDisplays(1) === true? showScore : scoreDisplays[1]} background={room.planetSelections[cKey] && room.planetSelections[cKey][1] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][1] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][1].color: cChoices[1][1]} id="C1" score_id="C1"  top={'14%'} left={CPos[1]}>{room.planetSelections[cKey] && room.planetSelections[cKey][1] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][1] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][1].confidence : cChoices[1][0]}</Scores> 
            <Scores display={checkScoreDisplays(2) === true? showScore : scoreDisplays[2]} background={room.planetSelections[cKey] && room.planetSelections[cKey][2] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][2] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][2].color: cChoices[2][1]} id="C1" score_id="C1"  top={'22%'} left={CPos[1]}>{room.planetSelections[cKey] && room.planetSelections[cKey][2] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][2] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][2].confidence : cChoices[2][0]}</Scores> 
            <Scores display={checkScoreDisplays(3) === true? showScore : scoreDisplays[3]} background={room.planetSelections[cKey] && room.planetSelections[cKey][3] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][3] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][3].color: cChoices[3][1]} id="C1" score_id="C1"  top={'30%'} left={CPos[1]}>{room.planetSelections[cKey] && room.planetSelections[cKey][3] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][3] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][3].confidence : cChoices[3][0]}</Scores> 
            <Scores display={checkScoreDisplays(4) === true? showScore : scoreDisplays[4]} background={room.planetSelections[cKey] && room.planetSelections[cKey][4] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][4] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][4].color: cChoices[4][1]} id="C1" score_id="C1"  top={'38%'} left={CPos[1]}>{room.planetSelections[cKey] && room.planetSelections[cKey][4] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][4] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][4].confidence : cChoices[4][0]}</Scores> 
            <Scores display={checkScoreDisplays(5) === true? showScore : scoreDisplays[5]} background={room.planetSelections[cKey] && room.planetSelections[cKey][5] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][5] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][5].color: cChoices[5][1]} id="C1" score_id="C1"  top={'46%'} left={CPos[1]}>{room.planetSelections[cKey] && room.planetSelections[cKey][5] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][5] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][5].confidence : cChoices[5][0]}</Scores> 
            <Scores display={checkScoreDisplays(6) === true? showScore : scoreDisplays[6]} background={room.planetSelections[cKey] && room.planetSelections[cKey][6] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][6] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][6].color: cChoices[6][1]} id="C1" score_id="C1"  top={'54%'} left={CPos[1]}>{room.planetSelections[cKey] && room.planetSelections[cKey][6] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][6] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][6].confidence : cChoices[6][0]}</Scores> 
            <Scores display={checkScoreDisplays(7) === true? showScore : scoreDisplays[7]} background={room.planetSelections[cKey] && room.planetSelections[cKey][7] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][7] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][7].color: cChoices[7][1]} id="C1" score_id="C1"  top={'62%'} left={CPos[1]}>{room.planetSelections[cKey] && room.planetSelections[cKey][7] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][7] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][7].confidence : cChoices[7][0]}</Scores> 
            <Scores display={checkScoreDisplays(8) === true? showScore : scoreDisplays[8]} background={room.planetSelections[cKey] && room.planetSelections[cKey][8] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][8] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][8].color: cChoices[8][1]} id="C1" score_id="C1"  top={'70%'} left={CPos[1]}>{room.planetSelections[cKey] && room.planetSelections[cKey][8] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][8] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][8].confidence : cChoices[8][0]}</Scores> 
            <Scores display={checkScoreDisplays(9) === true? showScore : scoreDisplays[9]} background={room.planetSelections[cKey] && room.planetSelections[cKey][9] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][9] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][9].color: cChoices[9][1]} id="C1" score_id="C1"  top={'78%'} left={CPos[1]}>{room.planetSelections[cKey] && room.planetSelections[cKey][9] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][9] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][9].confidence : cChoices[9][0]}</Scores> 
             

            

            

            

            

            
            {/* DISPLAYING SCORES PER TRIAL */}
            <Agent display={afterSelect} width={'200px'} top={'13%'} left={APos[2]} agent_id="legend" >{room.participants[0].name}'s Judgment</Agent>
            <Agent display={afterSelect} width={'200px'} top={'13%'} left={BPos[2]} agent_id="legend" >{room.participants[1].name}'s Judgment</Agent>
            <Agent display={afterSelect} width={'200px'} top={'13%'} left={CPos[2]} agent_id="legend" >{room.participants[2].name}'s Judgment</Agent>
            {/* trial one  */}
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(0) === true && afterSelect === '' && checkScoreDisplays(1) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[aKey] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][0].color : aChoices[0][1]}  id="A1_Big" score_id="A1_Big"  top={'18%'} left={APos[3]}>{room.planetSelections[aKey] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][0].confidence : aChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(0) === true && afterSelect === '' && checkScoreDisplays(1) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[bKey] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][0].color : bChoices[0][1]}  id="B1_Big" score_id="B1_Big"  top={'18%'}    left={BPos[3]}>{room.planetSelections[bKey] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][0].confidence : bChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(0) === true && afterSelect === '' && checkScoreDisplays(1) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[cKey] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][0].color : cChoices[0][1]}  id="C1_Big" score_id="C1_Big"  top={'18%'}    left={CPos[3]}>{room.planetSelections[cKey] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][0].confidence : cChoices[0][0]}</Scores> 
            {/* trial two  */}
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(1) === true && afterSelect === '' && checkScoreDisplays(2) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[aKey] && room.planetSelections[aKey][1] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][1].color : aChoices[0][1]}  id="A1_Big" score_id="A1_Big"  top={'18%'}   left={APos[3]}>{room.planetSelections[aKey] && room.planetSelections[aKey][1] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][1].confidence : aChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(1) === true && afterSelect === '' && checkScoreDisplays(2) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[bKey] && room.planetSelections[bKey][1] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][1] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][1] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][1].color : bChoices[0][1]}  id="B1_Big" score_id="B1_Big"  top={'18%'}   left={BPos[3]} >{room.planetSelections[bKey] && room.planetSelections[bKey][1] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][1] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][1] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][1].confidence : bChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(1) === true && afterSelect === '' && checkScoreDisplays(2) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[cKey] && room.planetSelections[cKey][1] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][1] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][1].color : cChoices[0][1]}  id="C1_Big" score_id="C1_Big"  top={'18%'}  left={CPos[3]} >{room.planetSelections[cKey] && room.planetSelections[cKey][1] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][1] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][1].confidence : cChoices[0][0]}</Scores> 
            {/* trial three  */}
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(2) === true && afterSelect === '' && checkScoreDisplays(3) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[aKey] && room.planetSelections[aKey][2] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][2].color : aChoices[0][1]}  id="A1_Big" score_id="A1_Big"  top={'18%'}   left={APos[3]}>{room.planetSelections[aKey] && room.planetSelections[aKey][2] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][2].confidence : aChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(2) === true && afterSelect === '' && checkScoreDisplays(3) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[bKey] && room.planetSelections[bKey][2] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][2] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][2] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][1].color : bChoices[0][1]}  id="B1_Big" score_id="B1_Big"  top={'18%'}   left={BPos[3]} >{room.planetSelections[bKey] && room.planetSelections[bKey][2] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][2] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][2] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][2].confidence : bChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(2) === true && afterSelect === '' && checkScoreDisplays(3) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[cKey] && room.planetSelections[cKey][2] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][2] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][2].color : cChoices[0][1]}  id="C1_Big" score_id="C1_Big"  top={'18%'}   left={CPos[3]}>{room.planetSelections[cKey] && room.planetSelections[cKey][2] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][2] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][2].confidence : cChoices[0][0]}</Scores> 
            {/* trial four  */}
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(3) === true && afterSelect === '' && checkScoreDisplays(4) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[aKey] && room.planetSelections[aKey][3] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][3].color : aChoices[0][1]}  id="A1_Big" score_id="A1_Big"  top={'18%'}   left={APos[3]}>{room.planetSelections[aKey] && room.planetSelections[aKey][3] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][3].confidence : aChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(3) === true && afterSelect === '' && checkScoreDisplays(4) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[bKey] && room.planetSelections[bKey][3] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][3] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][3] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][3].color : bChoices[0][1]}  id="B1_Big" score_id="B1_Big"  top={'18%'}   left={BPos[3]} >{room.planetSelections[bKey] && room.planetSelections[bKey][3] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][3] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][3] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][3].confidence : bChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(3) === true && afterSelect === '' && checkScoreDisplays(4) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[cKey] && room.planetSelections[cKey][3] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][3] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][3].color : cChoices[0][1]}  id="C1_Big" score_id="C1_Big"  top={'18%'}   left={CPos[3]}>{room.planetSelections[cKey] && room.planetSelections[cKey][3] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][3] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][3].confidence : cChoices[0][0]}</Scores> 
            {/* trial five  */}
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(4) === true && afterSelect === '' && checkScoreDisplays(5) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[aKey] && room.planetSelections[aKey][4] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][4].color : aChoices[0][1]}  id="A1_Big" score_id="A1_Big"  top={'18%'}  left={APos[3]} >{room.planetSelections[aKey] && room.planetSelections[aKey][4] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][4].confidence : aChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(4) === true && afterSelect === '' && checkScoreDisplays(5) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[bKey] && room.planetSelections[bKey][4] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][4] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][4] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][4].color : bChoices[0][1]}  id="B1_Big" score_id="B1_Big"  top={'18%'}   left={BPos[3]} >{room.planetSelections[bKey] && room.planetSelections[bKey][4] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][4] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][4] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][4].confidence : bChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(4) === true && afterSelect === '' && checkScoreDisplays(5) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[cKey] && room.planetSelections[cKey][4] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][4] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][4].color : cChoices[0][1]}  id="C1_Big" score_id="C1_Big"  top={'18%'}  left={CPos[3]} >{room.planetSelections[cKey] && room.planetSelections[cKey][4] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][4] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][4].confidence : cChoices[0][0]}</Scores> 
            {/* trial six  */}
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(5) === true && afterSelect === '' && checkScoreDisplays(6) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[aKey] && room.planetSelections[aKey][5] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][5].color : aChoices[0][1]}  id="A1_Big" score_id="A1_Big"  top={'18%'}  left={APos[3]} >{room.planetSelections[aKey] && room.planetSelections[aKey][5] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][5].confidence : aChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(5) === true && afterSelect === '' && checkScoreDisplays(6) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[bKey] && room.planetSelections[bKey][5] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][5] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][5] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][5].color : bChoices[0][1]}  id="B1_Big" score_id="B1_Big"  top={'18%'}    left={BPos[3]}>{room.planetSelections[bKey] && room.planetSelections[bKey][5] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][5] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][5] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][5].confidence : bChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(5) === true && afterSelect === '' && checkScoreDisplays(6) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[cKey] && room.planetSelections[cKey][5] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][5] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][5].color : cChoices[0][1]}  id="C1_Big" score_id="C1_Big"  top={'18%'}  left={CPos[3]} >{room.planetSelections[cKey] && room.planetSelections[cKey][5] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][5] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][5].confidence : cChoices[0][0]}</Scores> 
            {/* trial seven  */}
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(6) === true && afterSelect === '' && checkScoreDisplays(7) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[aKey] && room.planetSelections[aKey][6] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][6].color : aChoices[0][1]}  id="A1_Big" score_id="A1_Big"  top={'18%'}  left={APos[3]} >{room.planetSelections[aKey] && room.planetSelections[aKey][6] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][6].confidence : aChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(6) === true && afterSelect === '' && checkScoreDisplays(7) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[bKey] && room.planetSelections[bKey][6] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][6] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][6] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][6].color : bChoices[0][1]}  id="B1_Big" score_id="B1_Big"  top={'18%'}   left={BPos[3]} >{room.planetSelections[bKey] && room.planetSelections[bKey][6] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][6] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][6] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][6].confidence : bChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(6) === true && afterSelect === '' && checkScoreDisplays(7) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[cKey] && room.planetSelections[cKey][6] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][6] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][6].color : cChoices[0][1]}  id="C1_Big" score_id="C1_Big"  top={'18%'}   left={CPos[3]}>{room.planetSelections[cKey] && room.planetSelections[cKey][6] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][6] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][6].confidence : cChoices[0][0]}</Scores> 
            {/* trial eight  */}
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(7) === true && afterSelect === '' && checkScoreDisplays(8) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[aKey] && room.planetSelections[aKey][7] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][7].color : aChoices[0][1]}  id="A1_Big" score_id="A1_Big"  top={'18%'}   left={APos[3]}>{room.planetSelections[aKey] && room.planetSelections[aKey][7] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][7].confidence : aChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(7) === true && afterSelect === '' && checkScoreDisplays(8) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[bKey] && room.planetSelections[bKey][7] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][7] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][7] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][7].color : bChoices[0][1]}  id="B1_Big" score_id="B1_Big"  top={'18%'}   left={BPos[3]} >{room.planetSelections[bKey] && room.planetSelections[bKey][7] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][7] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][7] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][7].confidence : bChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(7) === true && afterSelect === '' && checkScoreDisplays(8) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[cKey] && room.planetSelections[cKey][7] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][7] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][7].color : cChoices[0][1]}  id="C1_Big" score_id="C1_Big"  top={'18%'}   left={CPos[3]}>{room.planetSelections[cKey] && room.planetSelections[cKey][7] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][7] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][7].confidence : cChoices[0][0]}</Scores> 
            {/* trial nine  */}
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(8) === true && afterSelect === '' && checkScoreDisplays(9) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[aKey] && room.planetSelections[aKey][8] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][8].color : aChoices[0][1]}  id="A1_Big" score_id="A1_Big"  top={'18%'}  left={APos[3]} >{room.planetSelections[aKey] && room.planetSelections[aKey][8] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][8].confidence : aChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(8) === true && afterSelect === '' && checkScoreDisplays(9) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[bKey] && room.planetSelections[bKey][8] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][8] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][8] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][8].color : bChoices[0][1]}  id="B1_Big" score_id="B1_Big"  top={'18%'}   left={BPos[3]} >{room.planetSelections[bKey] && room.planetSelections[bKey][8] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][8] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][8] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][8].confidence : bChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(8) === true && afterSelect === '' && checkScoreDisplays(9) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[cKey] && room.planetSelections[cKey][8] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][8] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][8].color : cChoices[0][1]}  id="C1_Big" score_id="C1_Big"  top={'18%'}   left={CPos[3]}>{room.planetSelections[cKey] && room.planetSelections[cKey][8] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][8] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][8].confidence : cChoices[0][0]}</Scores> 
            {/* trial ten  */}
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(9) === true && afterSelect === '' && checkScoreDisplays(10) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[aKey] && room.planetSelections[aKey][9] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][9].color : aChoices[0][1]}  id="A1_Big" score_id="A1_Big"  top={'18%'}  left={APos[3]} >{room.planetSelections[aKey] && room.planetSelections[aKey][9] && thisParticipant.stimuli === 'subject1'? room.planetSelections[aKey][9].confidence : aChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(9) === true && afterSelect === '' && checkScoreDisplays(10) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[bKey] && room.planetSelections[bKey][9] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][9] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][9] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][9].color : bChoices[0][1]}  id="B1_Big" score_id="B1_Big"  top={'18%'}   left={BPos[3]}>{room.planetSelections[bKey] && room.planetSelections[bKey][9] && thisParticipant.stimuli === 'subject1' || room.planetSelections[bKey] && room.planetSelections[bKey][9] && thisParticipant.stimuli === 'subject2' || room.planetSelections[bKey] && room.planetSelections[bKey][9] && thisParticipant.stimuli === 'subject3' && thisParticipant.condition === 'lr'? room.planetSelections[bKey][9].confidence : bChoices[0][0]}</Scores> 
            <Scores display={checkSelectedScore(thisParticipant.id) === true && checkScoreDisplays(9) === true && afterSelect === '' && checkScoreDisplays(10) === "wait"? showScore : scoreDisplays[0]} background={room.planetSelections[cKey] && room.planetSelections[cKey][9] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][9] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][9].color : cChoices[0][1]}  id="C1_Big" score_id="C1_Big"  top={'18%'}   left={CPos[3]}>{room.planetSelections[cKey] && room.planetSelections[cKey][9] && thisParticipant.stimuli === 'subject1' || room.planetSelections[cKey] && room.planetSelections[cKey][9] && thisParticipant.stimuli === 'subject3'? room.planetSelections[cKey][9].confidence : cChoices[0][0]}</Scores> 
            
            {/* displaying agent connections per trial in third experiment - these are fixe positions as we do not randomise position anymore */}
            <Agent display={thisParticipant.condition === "lr" && checkScoreDisplays(1) === true? '' : 'none'} opacity={"1.0"}  borderColor={"green"}  agent_id="ConnectionTail4Mini" top={"11.3%"} left={'85%'} width={'3rem'}></Agent> 
            <MiniArrows display={thisParticipant.condition === "lr" && checkScoreDisplays(1) === true? '': 'none'} arrow_id="Down3" top={"23.5%"} left={'87.9%'}> </MiniArrows>

            <Agent display={thisParticipant.condition === "lr" && checkScoreDisplays(2) === true? '' : 'none'} opacity={"1.0"}  borderColor={"green"}  agent_id="ConnectionTail4Mini" top={"19.3%"} left={'85%'} width={'3rem'}></Agent> 
            <MiniArrows display={thisParticipant.condition === "lr" && checkScoreDisplays(2) === true? '': 'none'} arrow_id="Down3" top={"31.5%"} left={'87.9%'}> </MiniArrows>

            <Agent display={thisParticipant.condition === "lr" && checkScoreDisplays(3) === true? '' : 'none'} opacity={"1.0"}  borderColor={"green"}  agent_id="ConnectionTail4Mini" top={"27.3%"} left={'85%'} width={'3rem'}></Agent> 
            <MiniArrows display={thisParticipant.condition === "lr" && checkScoreDisplays(3) === true? '': 'none'} arrow_id="Down3" top={"39.5%"} left={'87.9%'}> </MiniArrows> 

            <Agent display={thisParticipant.condition === "lr" && checkScoreDisplays(4) === true? '' : 'none'} opacity={"1.0"}  borderColor={"green"}  agent_id="ConnectionTail4Mini" top={"35.3%"} left={'85%'} width={'3rem'}></Agent> 
            <MiniArrows display={thisParticipant.condition === "lr" && checkScoreDisplays(4) === true? '': 'none'} arrow_id="Down3" top={"47.5%"} left={'87.9%'}> </MiniArrows> 

            <Agent display={thisParticipant.condition === "lr" && checkScoreDisplays(5) === true? '' : 'none'} opacity={"1.0"}  borderColor={"green"}  agent_id="ConnectionTail4Mini" top={"43.3%"} left={'85%'} width={'3rem'}></Agent> 
            <MiniArrows display={thisParticipant.condition === "lr" && checkScoreDisplays(5) === true? '': 'none'} arrow_id="Down3" top={"55.5%"} left={'87.9%'}> </MiniArrows> 

            <Agent display={thisParticipant.condition === "lr" && checkScoreDisplays(6) === true? '' : 'none'} opacity={"1.0"}  borderColor={"green"}  agent_id="ConnectionTail4Mini" top={"51.3%"} left={'85%'} width={'3rem'}></Agent> 
            <MiniArrows display={thisParticipant.condition === "lr" && checkScoreDisplays(6) === true? '': 'none'} arrow_id="Down3" top={"63.5%"} left={'87.9%'}> </MiniArrows> 

            <Agent display={thisParticipant.condition === "lr" && checkScoreDisplays(7) === true? '' : 'none'} opacity={"1.0"}  borderColor={"green"}  agent_id="ConnectionTail4Mini" top={"59.3%"} left={'85%'} width={'3rem'}></Agent> 
            <MiniArrows display={thisParticipant.condition === "lr" && checkScoreDisplays(7) === true? '': 'none'} arrow_id="Down3" top={"71.5%"} left={'87.9%'}> </MiniArrows> 

            <Agent display={thisParticipant.condition === "lr" && checkScoreDisplays(8) === true? '' : 'none'} opacity={"1.0"}  borderColor={"green"}  agent_id="ConnectionTail4Mini" top={"67.3%"} left={'85%'} width={'3rem'}></Agent> 
            <MiniArrows display={thisParticipant.condition === "lr" && checkScoreDisplays(8) === true? '': 'none'} arrow_id="Down3" top={"79.5%"} left={'87.9%'}> </MiniArrows> 

            <Agent display={thisParticipant.condition === "lr" && checkScoreDisplays(9) === true? '' : 'none'} opacity={"1.0"}  borderColor={"green"}  agent_id="ConnectionTail4Mini" top={"75.3%"} left={'85%'} width={'3rem'}></Agent> 
            <MiniArrows display={thisParticipant.condition === "lr" && checkScoreDisplays(9) === true? '': 'none'} arrow_id="Down3" top={"87.5%"} left={'87.9%'}> </MiniArrows> 


            <Action action_id="border_frame"></Action>

            {props.children}

            <Button display={showStructure || checkSelectedScore(thisParticipant.id) === true && afterSelect == '' || simulatedResponse? 'none' : ''} disabled={checkSelectedScore(thisParticipant.id) === true && afterSelect === ''? '' : buttonDisplay} position={'absolute'} left={'40%'} top={'105%'} clicked={checkSelectedScore(thisParticipant.id) === true && afterSelect == ''? timeToNext : onNextHandler}>Next</Button>
            
            {/* <Button display={''} disabled={checkSelectedScore(thisParticipant.id) === true && afterSelect === ''? '' : buttonDisplay} position={'absolute'} left={'40%'} top={'105%'} clicked={checkSelectedScore(thisParticipant.id) === true && afterSelect == ''? timeToNext : onNextHandler}>dev:: next</Button> */}
           {/* <Button display={checkScoreDisplays(2) === true? '': 'none'} position={'absolute'} left={'40%'} top={'103.5%'} clicked={() => dispatch(goToPage(pages.DEBRIEF))}>Finish, go to Debrief</Button> */}
       
        </div>

    );
};


export default PlanetFrame;


