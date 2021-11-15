import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import Action from '../Action/Action';
import { useDispatch, useSelector } from 'react-redux';
import Agent from '../Agent/Agent';
import shuffleArray from '../../utils/shuffleArray';
import blueFishImage from '../../static/images/bluefish_new.png';
import noFishImage from '../../static/images/nofish.png';
import redFishImage from '../../static/images/redfish_new.png';
import { storeTraining } from '../../store/actions/participantTraining';
import Classes from '../../SASS/containers/Instruction/InsTask2.module.scss';
// import ScrollDivision from '../ScrollDivision/ScrollDivision';


let training_clicks = 0;
let training_responses = []; // storing training reponses 
let randFish = shuffleArray(['red', 'blue'])[0];

const InsTask= props => {
    const dispatch = useDispatch();
   

    const [btnDisplay, setBtnDisplay] = useState(false)

    const [remainingTime, setRemainingTime] = useState(120);
    const [remainingTimeMin, setRemainingTimeMin] = useState(2);
    const [remainingTimeSec, setRemainingTimeSec] = useState(0);
    const [selectedConfidence, setSelectedConfidence] = useState('none');

    
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
        // console.log(e.target.scrollHeight);
        // console.log(e.target.scrollTop);
        if (e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight) {
            setBtnDisplay(true);
        }
    };

      // confidence selections
      const selectVeryHighConfidenceLeft = () => {
        setVeryHighConfidenceRight('0.2');
        setHighConfidenceRight('0.2');
        setMediumConfidenceRight('0.2');
        setNeutralConfidence('0.2');
        setVeryHighConfidenceLeft('1.0');
        setHighConfidenceLeft('0.2');
        setMediumConfidenceLeft('0.2');
        setShowButton3('');
        setSelectedConfidence(-3);
        // if (training_clicks === 1 && randFish === 'blue') {
        //     setShowButton3('');
        // }
    };

    const selectHighConfidenceLeft = () => {
        setVeryHighConfidenceRight('0.2');
        setHighConfidenceRight('0.2');
        setMediumConfidenceRight('0.2');
        setNeutralConfidence('0.2');
        setVeryHighConfidenceLeft('0.2');
        setHighConfidenceLeft('1.0');
        setMediumConfidenceLeft('0.2');
        setShowButton3('');
        setSelectedConfidence(-2);
        // if (training_clicks === 1 && randFish === 'blue') {
        //     setShowButton3('');
        // }
    };

    const selectMediumConfidenceLeft = () => {
        setVeryHighConfidenceRight('0.2');
        setHighConfidenceRight('0.2');
        setMediumConfidenceRight('0.2');
        setNeutralConfidence('0.2');
        setVeryHighConfidenceLeft('0.2');
        setHighConfidenceLeft('0.2');
        setMediumConfidenceLeft('1.0');
        setShowButton3('');
        setSelectedConfidence(-1);
        // if (training_clicks === 1 && randFish === 'blue') {
        //     setShowButton3('');
        // }
    };

    const selectNeutralConfidence = () => {
        setVeryHighConfidenceRight('0.2');
        setHighConfidenceRight('0.2');
        setMediumConfidenceRight('0.2');
        setNeutralConfidence('1.0');
        setVeryHighConfidenceLeft('0.2');
        setHighConfidenceLeft('0.2');
        setMediumConfidenceLeft('0.2');
        setShowButton3('');
        setSelectedConfidence(0);
        // if (training_clicks === 0) {
        //     setShowButton3('');
        // }
    
    };

    const selectMediumConfidenceRight = () => {
        setVeryHighConfidenceRight('0.2');
        setHighConfidenceRight('0.2');
        setMediumConfidenceRight('1.0');
        setNeutralConfidence('0.2');
        setVeryHighConfidenceLeft('0.2');
        setHighConfidenceLeft('0.2');
        setMediumConfidenceLeft('0.2');
        setShowButton3('');
        setSelectedConfidence(1);
        // if (training_clicks === 1 && randFish === 'red') {
        //     setShowButton3('');
        // }
    };

    const selectHighConfidenceRight = () => {
        setVeryHighConfidenceRight('0.2');
        setHighConfidenceRight('1.0');
        setMediumConfidenceRight('0.2');
        setNeutralConfidence('0.2');
        setVeryHighConfidenceLeft('0.2');
        setHighConfidenceLeft('0.2');
        setMediumConfidenceLeft('0.2');
        setShowButton3('');
        setSelectedConfidence(2);
        // if (training_clicks === 1 && randFish === 'red') {
        //     setShowButton3('');
        // }
    };

    const selectVeryHighConfidenceRight = () => {
        setVeryHighConfidenceRight('1.0');
        setHighConfidenceRight('0.2');
        setMediumConfidenceRight('0.2');
        setNeutralConfidence('0.2');
        setVeryHighConfidenceLeft('0.2');
        setHighConfidenceLeft('0.2');
        setMediumConfidenceLeft('0.2');
        setShowButton3('');
        setSelectedConfidence(3);
        // if (training_clicks === 1 && randFish === 'red') {
        //     setShowButton3('');
        // }
    };

    const [mediumConfidenceLeft, setMediumConfidenceLeft] = useState('.2');
    const [highConfidenceLeft, setHighConfidenceLeft] = useState('.2');
    const [veryHighConfidenceLeft, setVeryHighConfidenceLeft] = useState('.2');
    const [neutralConfidence, setNeutralConfidence] = useState('.2');
    const [mediumConfidenceRight, setMediumConfidenceRight] = useState('.2');
    const [highConfidenceRight, setHighConfidenceRight] = useState('.2');
    const [veryHighConfidenceRight, setVeryHighConfidenceRight] = useState('.2');

    const [showFish, setShowFish] = useState(false);
    const [showButton, setShowButton] = useState('');
    const [showButton2, setShowButton2] = useState('none');
    const [showButton3, setShowButton3] = useState('none');
    const [showScale, setShowScale] = useState('none');
    const [checkFishText, setCheckFishText] = useState('Check Fish');
    const [initText, setInitText] = useState('Let’s practice fishing alone first and providing judgments.')

    const fishIteration = () => {
        setShowButton('none');
        setShowButton2('');
        if (showFish === true) {
            setShowFish(false);
        } else if (showFish === false) {
            setShowFish(true);
        };
    };

    const guessIteration = () => {
        setShowScale('');
        setShowButton2('none');
    };

    const resetFishIteration = () => {
        training_responses.push(selectedConfidence);
        // console.log(training_responses);
        setShowFish(false);
        setVeryHighConfidenceLeft('0.2');
        setHighConfidenceLeft('0.2');
        setMediumConfidenceLeft('0.2');
        setVeryHighConfidenceRight('0.2');
        setHighConfidenceRight('0.2');
        setMediumConfidenceRight('0.2');
        setNeutralConfidence('0.2');
        setCheckFishText('Check Again');
        setShowButton('');
        setShowButton2('none');
        setShowButton3('none');
        setShowScale('none');
        
        training_clicks = training_clicks + 1;
        if (training_clicks === 5) {
            setInitText('');
            setCheckFishText("Continue");
            
            
            dispatch(storeTraining({training: training_responses}));
           

        };
    }

    return (
        <div className={Classes.InsTask}>

            
            <div className={Classes.InnerContainer}>
                <h1>Training: Check Fish and Provide a Judgment</h1>
                <h4>You have {remainingTimeMin} minutes and {remainingTimeSec} seconds left to complete this page.</h4>
                <hr />           
                {/* <ScrollDivision scroll={showBtn}> */}
                <p>{initText} Press '{checkFishText}'.</p><br></br>
                
             
                <div className={Classes.TrainingContainer}>

                    <p><Button position={'absolute'} left={'24%'} top={'0%'}  display={showButton} clicked={training_clicks === 5? props.goToInstruction : fishIteration}>{checkFishText}</Button></p>
                

                {/* blue */}
                <Agent position={'absolute'} left={'14%'} top={'-20%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 1 || showFish && training_clicks === 2? '' : 'none'}>
                    <p>You caught a <b>BLUE</b> fish!</p>
                    {/* <img height={'100px'} src={blueFishImage} alt="fish"/> */}
                </Agent>

                <Agent position={'absolute'} left={'15%'} top={'-13%'} width={'300px'} agent_id="FishInstruct" display={showFish && training_clicks === 1 || showFish && training_clicks === 2? '' : 'none'}>
                    <img height={'140px'} src={blueFishImage} alt="fish"/> 
                </Agent>

                <Agent position={'absolute'} left={'13%'} top={'20%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 1? '' : 'none'}>
                    This increases the chance that you are fishing on <b>Planet BLUE</b>.
                </Agent>


                <Agent position={'absolute'} left={'11%'} top={'20%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 2? '' : 'none'}>
                    This further increases the chance that you are fishing on <b>Planet BLUE</b>.
                </Agent>

                
                {/*  red  */}

                <Agent position={'absolute'} left={'14%'} top={'-20%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 4? '' : 'none'}>
                    <p>You caught a <b>RED</b> fish!</p>
                    {/* <img height={'100px'} src={blueFishImage} alt="fish"/> */}
                </Agent>

                <Agent position={'absolute'} left={'15%'} top={'-13%'} width={'300px'} agent_id="FishInstruct" display={showFish && training_clicks === 4? '' : 'none'}>
                    <img height={'140px'} src={redFishImage} alt="fish"/> 
                </Agent>

                {/* <Agent position={'absolute'} left={'13%'} top={'20%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 4? '' : 'none'}>
                    This increases the chance that you are fishing on <b>Planet RED</b>. 
                </Agent> */}

                <Agent position={'absolute'} left={'9%'} top={'14%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 4? '' : 'none'}>
                    In total, you’ve now fished out <b>two blue</b> fish and <b>one red</b> fish from this planet.
                </Agent>
                <Agent position={'absolute'} left={'16%'} top={'20%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 4? '' : 'none'}>
                    Please provide a final judgment about where you are.
                </Agent>

                

               
                


                {/* no fish */}
                
                <Agent position={'absolute'} left={'14%'} top={'-20%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 0 || showFish && training_clicks === 3? '' : 'none'}>
                    No fish caught in this round!<br></br>
                    {/* <img height={'100px'} left={'5%'} width={'20px'} src={noFishImage} alt="fish"/> */}
                </Agent>

                <Agent position={'absolute'} left={'16%'} top={'-10%'} width={'300px'} agent_id="FishInstruct" display={showFish && training_clicks === 0 || showFish && training_clicks === 3? '' : 'none'}>
                    <img height={'120px'} left={'5%'} width={'200px'} src={noFishImage} alt="fish"/>
                </Agent>

                <Agent position={'absolute'} left={'10%'} top={'17%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 0? '' : 'none'}>
                   This means that you <b>don't know</b> anything about the planet you are at.
                </Agent>

                <Agent position={'absolute'} left={'12%'} top={'17%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 3? '' : 'none'}>
                    Provide a judgment based on <b>the two blue</b> fish you have caught so far.
                </Agent>

                <p><Button display={showButton2} position={'absolute'} left={'24%'} top={'50%'} clicked={guessIteration}>Provide Judgment</Button></p>
                

                {/* Confidence DISPLAY */}
                <Action display={showScale} top={'30%'} onClick={selectVeryHighConfidenceLeft} opacity={veryHighConfidenceLeft} background={'deepskyblue'} action_id='ConfidenceVeryHighLeft'>3</Action>
                <Action display={showScale} top={'30%'} onClick={selectHighConfidenceLeft} opacity={highConfidenceLeft} background={'deepskyblue'} action_id='ConfidenceHighLeft'>2</Action>
                <Action display={showScale} top={'30%'} onClick={selectMediumConfidenceLeft} opacity={mediumConfidenceLeft} background={'deepskyblue'} action_id='ConfidenceMediumLeft'>1</Action>
                <Action display={showScale} top={'30%'} onClick={selectNeutralConfidence} opacity={neutralConfidence} background={'lightgrey'} action_id='ConfidenceNeutral'>0</Action>
                <Action display={showScale} top={'30%'} onClick={selectMediumConfidenceRight} opacity={mediumConfidenceRight} background={'red'} action_id='ConfidenceMediumRight'>1</Action>
                <Action display={showScale} top={'30%'} onClick={selectHighConfidenceRight} opacity={highConfidenceRight} background={'red'} action_id='ConfidenceHighRight'>2</Action>
                <Action display={showScale} top={'30%'} onClick={selectVeryHighConfidenceRight} opacity={veryHighConfidenceRight} background={'red'} action_id='ConfidenceVeryHighRight'>3</Action>
    
                <Action display={showScale} top={'50%'} background='white' action_id='ConfidenceVeryHighLeftLegend'>Highly Confident BLUE</Action>
                <Action display={showScale} top={'50%'} background='white' action_id='ConfidenceHighLeftLegend'>Moderately Confident BLUE</Action>
                <Action display={showScale} top={'50%'} background='white' action_id='ConfidenceMediumLeftLegend'>Slightly Confident BLUE</Action>
                <Action display={showScale} top={'50%'} background='white' action_id='ConfidenceNeutralLegend'>I don't know</Action>
                <Action display={showScale} top={'50%'} background='white' action_id='ConfidenceMediumRightLegend'>Slightly Confident RED</Action>
                <Action display={showScale} top={'50%'} background='white' action_id='ConfidenceHighRightLegend'>Moderately Confident RED</Action>
                <Action display={showScale} top={'50%'} background='white' action_id='ConfidenceVeryHighRightLegend'>Highly Confident RED</Action>
            
                <p><Button display={showButton3} position={'absolute'} left={'24%'} top={'80%'} clicked={resetFishIteration}>Submit Judgment</Button></p>
                

                
                </div>


            
          
                <hr />
                {/* <Button clicked={props.goToInstruction}>Next</Button> */}
                {/* {btnDisplay && <Button clicked={props.goToInstruction}>Next</Button>} */}
                {/* </ScrollDivision > */}
              
                {/* {btnDisplay ? <Button clicked={props.goToInstruction}>Next</Button>: <Button >Please scroll down</Button>} */}
            </div>
        </div>
    );
};

export default InsTask;