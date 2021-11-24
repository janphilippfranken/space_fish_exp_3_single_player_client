import React, { useState } from 'react';
import PrivateEvidence from '../PrivateEvidence/PrivateEvidence';
import StructureFrame from '../../components/StructureFrame/StructureFrame';
import StructureFrameMini from '../StructureFrameMini/StructureFrameMini';
import PlanetFrame from '../../components/PlanetFrame/PlanetFrame';


import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import classes from './GameInterface.module.css';


// Game Interface contains the interactive interface during which 
// participants can observe states of others or tell them something
const GAME_PHASES = {
    observeFIsh: 'OBSERVE_FISH',
    observeBeliefs: 'OBSERVE_BELIEFS',
    selectStructure: 'SELECT_STRUCTURE',
    selectPlanet: 'SELECT_PLANET',
    nextPlanet: 'NEXT_PLANET'
};

const GameInterface = props => {

    // const dispatch = useDispatch();
    // const conditionNumber = useSelector(state => state.conditionData.conditionNumber);
    const conditionData = useSelector(state => state.conditionData.conditionData[state.conditionData.conditionNumber]);
    const thisParticipant = useSelector(state => state.currentParticipant);
    

    // useEffect(() => {
    //     dispatch(setTimer(true, 1, 5));
    // }, [dispatch]);

    const [gamePhase, setGamePhase] = useState(GAME_PHASES.observeFish);
    const [evidenceDisplay, setEvidenceDisplay] = useState('');
    const [beliefDisplay, setBeliefDisplay] = useState('none');
    const [structureDisplay, setStructureDisplay] = useState('none');
    const [planetDisplay, setPlanetDisplay] = useState('none');
    const [nextPlanetDisplay, setNextPlanetDisplay] = useState('none');


    const goToGameHandler = gamePhase => {
        if (gamePhase === GAME_PHASES.observeFish) {
            setEvidenceDisplay('');
            setBeliefDisplay('none');
            setStructureDisplay('none');
            setNextPlanetDisplay('none');
            setGamePhase(GAME_PHASES.selectPlanet)
        // } else if (gamePhase === GAME_PHASES.observeBeliefs) {
        //     setFishDisplay('none');
        //     setBeliefDisplay('');
        //     setStructureDisplay('none');
        //     setNextPlanetDisplay('none');
        //     setGamePhase(GAME_PHASES.selectStructure)
        } else if (gamePhase === GAME_PHASES.selectPlanet) {
            setEvidenceDisplay('none');
            setBeliefDisplay('none');
            setStructureDisplay('none');
            setPlanetDisplay('');
            setGamePhase(GAME_PHASES.selectStructure)
        }

        else if (gamePhase === GAME_PHASES.selectStructure) {
        setBeliefDisplay('none');
        setStructureDisplay('');;
        setPlanetDisplay('none');
        setGamePhase(GAME_PHASES.nextPlanet);
        }
        // else if (gamePhase === GAME_PHASES.nextPlanet) {

        //     if (conditionNumber === 4) {
        //         return dispatch(changePhase(PHASES.debrief));
        //     }

        //     setPlanetDisplay('none');
        //     setNextPlanetDisplay('')
        //     setGamePhase(GAME_PHASES.observeFish)
        //     dispatch(incrementCondition());
        // }
    };

    
    return (
        <div className={classes.GameInterface}>
        <div className={classes.GameForm}>
            <h3>{conditionData.title}</h3>
            <hr />
            
            <div display={"none"} className={classes.GameContainerStructure}>
                <StructureFrameMini display={thisParticipant.structureHint === 'strong'? planetDisplay : 'none'} ></StructureFrameMini> 
                {/* <StructureFrameMini display={""} ></StructureFrameMini> */}
            </div> 
            {/* <div className={classes.ParagraphContainer}> */}
            <div className={classes.GameContainer}>
                
                <PrivateEvidence display={evidenceDisplay} goToGame={goToGameHandler.bind(this, GAME_PHASES.selectPlanet)} ></PrivateEvidence>
                <PlanetFrame  display={planetDisplay} goToGame={goToGameHandler.bind(this, GAME_PHASES.selectPlanet)}></PlanetFrame>
    

            </div>                   
        </div>
    </div>
    );
};
export default GameInterface; 