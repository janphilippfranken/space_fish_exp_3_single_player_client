import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import Scores from '../Scores/Scores';
import Action from '../Action/Action';
import Agent from '../Agent/Agent';
import shuffleArray from '../../utils/shuffleArray';
import { useDispatch, useSelector } from 'react-redux';
import Classes from '../../SASS/containers/Instruction/InsTask2.module.scss';
import { storeSocialTraining } from '../../store/actions/participantSocialTraining';
import ScrollDivision from '../ScrollDivision/ScrollDivision';


let training_clicks = 0;
let randFish = shuffleArray(['red', 'red'])[0];
let training_responses = []; // storing training reponses 

const InsTask= props => {
    const dispatch = useDispatch();

    const [btnDisplay, setBtnDisplay] = useState(false)

    const [remainingTime, setRemainingTime] = useState(120);
    const [remainingTimeMin, setRemainingTimeMin] = useState(2);
    const [remainingTimeSec, setRemainingTimeSec] = useState(0);
    const [selectedConfidence, setSelectedConfidence] = useState('none');

    const training = useSelector(state => state);
    console.log(training);
    console.log('insideINst')

   
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
    const [checkFishText, setCheckFishText] = useState('Check Judgments');
    const [initText, setInitText] = useState("Now let’s practice making judgments based also on other players' judgments. Click 'Check Judgments'.");
    const [labelDisplay, setLabelDisplay] = useState('');

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
        setShowFish(false);
        setVeryHighConfidenceLeft('0.2');
        setHighConfidenceLeft('0.2');
        setMediumConfidenceLeft('0.2');
        setVeryHighConfidenceRight('0.2');
        setHighConfidenceRight('0.2');
        setMediumConfidenceRight('0.2');
        setNeutralConfidence('0.2');
        setCheckFishText('Check Again');
        setInitText("Click 'Check Again'.")
        setShowButton('');
        setShowButton2('none');
        setShowButton3('none');
        setShowScale('none');
        training_clicks = training_clicks + 1;
        if (training_clicks === 2) {
            dispatch(storeSocialTraining({socialTraining: training_responses}));
            setLabelDisplay('none');
            setInitText('You will now see whether either Jim or Simon could see the judgments of the other.')
            setCheckFishText("Continue");

        };
    }

    return (
        <div className={Classes.InsTask}>

            
            <div className={Classes.InnerContainer}>
                <h1>Training: Observe other Players</h1>
                <h4>You have {remainingTimeMin} minutes and {remainingTimeSec} seconds left to complete this page.</h4>
                <hr />           
                {/* <ScrollDivision scroll={showBtn}> */}
                <p>{initText}</p><br></br>
                
             

                <div className={Classes.TrainingContainer}>

                


                {/* no fish */}
                <Agent display={labelDisplay} id="A1_Big" agent_id="legend"  top={'-20%'} left={'39%'}  >Simon's Judgment</Agent> 
                <Agent display={labelDisplay} id="A1_Big" agent_id="legend"  top={'-20%'} left={'18%'}  >Jim's Judgment</Agent> 
                <Scores display={!showFish && training_clicks === 0? '': 'none'} background={'white'}  id="A1_Big" score_id="A1_Big"  top={'-14%'} left={'23%'}  >{'?'}</Scores> 
                <Scores display={!showFish && training_clicks === 0? '': 'none'} background={'white'}  id="A1_Big" score_id="A1_Big"  top={'-14%'} left={'42%'}  >{'?'}</Scores> 
                
                {/* red example */}
                <Scores display={showFish && training_clicks === 0 && randFish === 'red'? '': 'none'} background={'lightgrey'}  id="A1_Big" score_id="A1_Big"  top={'-14%'} left={'42%'}  >{0}</Scores> 
                <Scores display={showFish && training_clicks === 0 && randFish === 'red'? '': 'none'} background={'red'}  id="A1_Big" score_id="A1_Big"  top={'-14%'} left={'23%'}  >{3}</Scores> 
                
                {/* red example */}
                <Scores display={showFish && training_clicks === 1 && randFish === 'red'? '': 'none'} background={'red'}  id="A1_Big" score_id="A1_Big"  top={'-14%'} left={'42%'}  >{1}</Scores> 
                <Scores display={showFish && training_clicks === 1 && randFish === 'red'? '': 'none'} background={'red'}  id="A1_Big" score_id="A1_Big"  top={'-14%'} left={'23%'}  >{3}</Scores> 
                

                <Agent position={'absolute'} left={'0%'} top={'4%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 0 && randFish === 'red'? '' : 'none'}>
                    Simon seems to have <b>no idea</b> where you are while Jim seems <b>highly confident</b> that you are on Planet RED.
                </Agent>
                <Agent position={'absolute'} left={'9%'} top={'9%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 0 && randFish === 'red'? '' : 'none'}>
                    Both have had different fishing experiences to you, so this could be useful information.
                </Agent>

                <Agent position={'absolute'} left={'14%'} top={'2.5%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 1 && randFish === 'red'? '' : 'none'}>
                    Simon is now <b>slightly confident</b> that you are on Planet RED.
                </Agent>
                <Agent position={'absolute'} left={'16%'} top={'8.5%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 1 && randFish === 'red'? '' : 'none'}>
                    Jim is still <b>highly confident</b> that you are on Planet RED.
                </Agent>
        
                <Agent position={'absolute'} left={'7%'} top={'17%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 0 && randFish === 'red'? '' : 'none'}>
                    <b>Like you, they are also bonused for every judgment they make in the right direction</b>
                </Agent>

                <Agent position={'absolute'} left={'8%'} top={'21%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 0 && randFish === 'red'? '' : 'none'}>
                    <b>(i.e. 1-3 blue if the planet is actually blue or 1-3 red if the planet is actually red)</b>. 
                </Agent>

                <Agent position={'absolute'} left={'7%'} top={'17%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 1 && randFish === 'red'? '' : 'none'}>
                    <b>Like you, they are also bonused for every judgment they make in the right direction</b>
                </Agent>

                <Agent position={'absolute'} left={'8%'} top={'21%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 1 && randFish === 'red'? '' : 'none'}>
                    <b>(i.e. 1-3 blue if the planet is actually blue or 1-3 red if the planet is actually red)</b>. 
                </Agent>



               
               

                {/* blue example */}
                <Scores display={showFish && training_clicks === 0 && randFish === 'blue'? '': 'none'} background={'lightgray'}  id="A1_Big" score_id="A1_Big"  top={'-4%'} left={'23%'}  >{0}</Scores> 
                <Scores display={showFish && training_clicks === 0 && randFish === 'blue'? '': 'none'} background={'deepskyblue'}  id="A1_Big" score_id="A1_Big"  top={'-4%'} left={'42%'}  >{3}</Scores> 
                <Agent position={'absolute'} left={'7%'} top={'17%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 0 && randFish === 'blue'? '' : 'none'}>
                    Jim seems to be confident that you are on Planet BLUE. This could be useful information.
                </Agent>

                
                {/* showFish && training_clicks === 0?  */}
                {/* <Agent position={'absolute'} left={'14%'} top={'-20%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 0? '' : 'none'}>
                    You haven't caught a fish.<br></br>
                    {/* <img height={'100px'} left={'5%'} width={'20px'} src={noFishImage} alt="fish"/> */}
                {/* </Agent> */} 

                {/* <Agent position={'absolute'} left={'10%'} top={'-13%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 0? '' : 'none'}>
                    <img height={'130px'} left={'5%'} width={'20px'} src={noFishImage} alt="fish"/>
                </Agent> */}

                {/* <Agent position={'absolute'} left={'14%'} top={'17%'} width={'400px'} agent_id="FishInstruct" display={showFish && training_clicks === 0? '' : 'none'}>
                   This means you don't know anything about the color of the planet.
                </Agent> */}

                <p><Button display={showButton2} position={'absolute'} left={'27%'} top={'60%'} clicked={guessIteration}>Update Judgment</Button></p>
                

                {/* Confidence DISPLAY */}
                <Action display={showScale} top={'30%'} onClick={selectVeryHighConfidenceLeft} opacity={veryHighConfidenceLeft} background={'deepskyblue'} action_id='ConfidenceVeryHighLeft'>3</Action>
                <Action display={showScale} top={'30%'} onClick={selectHighConfidenceLeft} opacity={highConfidenceLeft} background={'deepskyblue'} action_id='ConfidenceHighLeft'>2</Action>
                <Action display={showScale} top={'30%'} onClick={selectMediumConfidenceLeft} opacity={mediumConfidenceLeft} background={'deepskyblue'} action_id='ConfidenceMediumLeft'>1</Action>
                <Action display={showScale} top={'30%'} onClick={selectNeutralConfidence} opacity={neutralConfidence} background={'lightgrey'} action_id='ConfidenceNeutral'>0</Action>
                <Action display={showScale} top={'30%'} onClick={selectMediumConfidenceRight} opacity={mediumConfidenceRight} background={'red'} action_id='ConfidenceMediumRight'>1</Action>
                <Action display={showScale} top={'30%'} onClick={selectHighConfidenceRight} opacity={highConfidenceRight} background={'red'} action_id='ConfidenceHighRight'>2</Action>
                <Action display={showScale} top={'30%'} onClick={selectVeryHighConfidenceRight} opacity={veryHighConfidenceRight} background={'red'} action_id='ConfidenceVeryHighRight'>3</Action>
    
                <Action display={showScale} top={'50%'} background='white' action_id='ConfidenceVeryHighLeftLegend'>Highly Confident blue</Action>
                <Action display={showScale} top={'50%'} background='white' action_id='ConfidenceHighLeftLegend'>Moderately Confident blue</Action>
                <Action display={showScale} top={'50%'} background='white' action_id='ConfidenceMediumLeftLegend'>Slightly Confident blue</Action>
                <Action display={showScale} top={'50%'} background='white' action_id='ConfidenceNeutralLegend'>I don't know</Action>
                <Action display={showScale} top={'50%'} background='white' action_id='ConfidenceMediumRightLegend'>Slightly Confident red</Action>
                <Action display={showScale} top={'50%'} background='white' action_id='ConfidenceHighRightLegend'>Moderately Confident red</Action>
                <Action display={showScale} top={'50%'} background='white' action_id='ConfidenceVeryHighRightLegend'>Highly Confident red</Action>
            
                <p><Button display={showButton3} position={'absolute'} left={'26%'} top={'80%'} clicked={resetFishIteration}>Submit Judgment</Button></p>
                
                <p><Button display={showButton} position={'absolute'} left={'26%'} top={'80%'} clicked={training_clicks === 2? props.goToInstruction : fishIteration}>{checkFishText}</Button></p>
                
                
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