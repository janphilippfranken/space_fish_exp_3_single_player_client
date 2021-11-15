import './Game.module.css';
import { pages, goToPage } from '../../store/actions/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { initSocket } from '../../socket.io/socket-setup';
import Button from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import { registerParticipantId, registerParticipantStimuli, registerParticipantCondition, registerParticipantFish, registerParticipantPosition, registerParticipantPID, registerParticipantTraining, registerParticipantSocialTraining, registerParticipantSocialTrainingStructure } from '../../store/actions/currentParticipant';
import { registerRoom } from '../../store/actions/currentRoom';

import GameInterface from '../GameInterface/GameInterface';
import Classes from './Game.module.css';

let socket;
let ROOM_ID;
let THIS_PARTICIPANT_ID;

const Game = () => {
    const dispatch = useDispatch();
    const thisParticipant = useSelector(state => state.currentParticipant);
    const room = useSelector(state => state.currentRoom);
    // console.log(thisParticipant);
    const [showStart, setShowStart] = useState(true);
    const [remainingTime, setRemainingTime] = useState(600);

    const [remainingTimeMin, setRemainingTimeMin] = useState(10);
    const [remainingTimeSec, setRemainingTimeSec] = useState(0);

    const PID =  useSelector(state => state.participantID);
    const training = useSelector(state => state.training);
    const socialTraining =  useSelector(state => state.socialTraining);
    const socialTrainingStructure =  useSelector(state => state.socialTrainingStructure);
       
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

    const setTimers = () => {
        setRemainingTime(300);
        setRemainingTimeMin(5);
        setRemainingTimeSec(0);
    }

    const leaveGame = () => {
        dispatch(registerParticipantPID(PID));
        dispatch(goToPage(pages.DEBRIEF));
    };

    useEffect(() => {
        window.onbeforeunload = () => {
            leavingPageHandler(true);
        };
        socket = initSocket();
        socket.emit('create-participant', thisParticipant.name);

        socket.on('participant-created', participantObject => {
            dispatch(registerParticipantId(participantObject.id));
        });
        

        // only dispatch when at the debrief
        socket.on('go-to-debrief', () => {
            alert('OH NO! SOMEONE DROPPED OUT - YOU WILL BE REDIRECTED TO THE DEBRIEFING. Please fill in the remaining questions to receive your completion code on the next page. You will be paid according to your progress at the time of drop-out.');
            dispatch(goToPage(pages.DEBRIEF));
        });

        socket.on('available-room', availableRoom => {
            ROOM_ID = availableRoom.id;
            // console.log(availableRoom, 'Game.js', 'line: ', '29');
           
            // console.log('currPP');
            // check if participant id is not empty and then filter room for current participant to decide which stimuli to display
            
            const currentParticipant = availableRoom.participants.filter(participant => participant.id===THIS_PARTICIPANT_ID)[0];
            dispatch(registerParticipantStimuli(currentParticipant.stimuli[0])); 
            dispatch(registerParticipantCondition(currentParticipant.stimuli[1])); 
            dispatch(registerParticipantFish(currentParticipant.stimuli[2])); 
            dispatch(registerParticipantPosition(currentParticipant.stimuli[3])); 
            // console.log(training);
            // console.log('insideGame')
            dispatch(registerParticipantTraining(training));
            dispatch(registerParticipantSocialTraining(socialTraining));
            dispatch(registerParticipantSocialTrainingStructure(socialTrainingStructure));
            // dispatch(registerPssarticipantPID(PID));



           


           
            dispatch(registerRoom(availableRoom));
        });

        socket.on('update-room', updatedRoom => {
           
            dispatch(registerRoom(updatedRoom));
        });

        return () => {
            leavingPageHandler(false);
        }
    }, []);

    // console.log('thisparticipant');
    // console.log(thisParticipant);



    const leavingPageHandler = didTheyDropOut => {
        if (didTheyDropOut) {
            socket.emit('remove-participant-from-room--dropout', { roomId: ROOM_ID, participantId: THIS_PARTICIPANT_ID });
        } else {
            socket.emit('remove-participant-from-room--finished', { roomId: ROOM_ID, participantId: THIS_PARTICIPANT_ID });
        }
        socket.off('participant-created');
        socket.off('available-room');
        socket.off('update-room');
        socket.off('go-to-debrief');
        // socket.close();
    };

    const hideStart = () => {
        const timeOut1 = setTimeout(() => {
            setShowStart(false);
            clearTimeout(timeOut1);
        }, 5000);
    };

    useEffect(() => {
        if (room.hasTaskStarted) {
            hideStart();
            dispatch(registerParticipantPID(PID));
        };
    }, [room.hasTaskStarted]);

    useEffect(() => {
        if (thisParticipant.id) {
            THIS_PARTICIPANT_ID = thisParticipant.id;
            socket.emit('looking-for-room', thisParticipant.id);
            // const currentParticipant = room.participants?.filter(participant => participant.id===thisParticipant.id);
            // console.log('ooutsis');
            // console.log(thisParticipant.id);
            // console.log(currentParticipant);
            // console.log(room);
            // console.log(room.participants);
            // if (currentParticipant?.stimuli) {
            //     console.log('inside');
            //     dispatch(registerParticipantStimuli(currentParticipant.stimuli)); 
            //     console.log(thisParticipant);
            // };  

        };
                
    }, [thisParticipant.id]);

    const participantsInRoomJSX = room.participants?.map(participant => <h4 key={participant.id}>{participant.name}</h4>);
    
    const afterGameHasStartedJSX = (
        <div className={Classes.Container}>
            {/* <p>{thisParticipant.stimuli}</p> */}
            {/* {room.hasTaskStarted && hideStart()} */}
            {showStart? 'Game Started!' : ''}
            {/* {showStart? 'Game Started!' : ''} */}
            
            
            <main class={Classes.Main}>
                <GameInterface />
            </main>
        </div>
    );
    
    return (
        <div>
       
            {!room.hasTaskStarted && <h4>You will be waiting for other players for {remainingTimeMin} minutes and {remainingTimeSec} seconds. Afterwards you can decide to wait longer and earn up to <b>£1.50</b> or go to the debrief and get paid your base salary of £0.50.</h4>}
            {!room.hasTaskStarted && <div>Other Players waiting the lobby: {participantsInRoomJSX}</div>}
            
            {!!Object.keys(room).length && !room.hasTaskStarted && room.participants.length !== 3 &&
                <p>Please wait for {3 - room.participants.length} player(s) to join</p>}
            {!!Object.keys(room).length && room.hasTaskStarted && afterGameHasStartedJSX}
            <Button display={remainingTime <= 0 && !room.hasTaskStarted? '':'none'} clicked={() => setTimers()}>Wait another 5 minutes and earn up to £1.50 (recommended)!</Button><br></br>
            <Button display={remainingTime <= 0 && !room.hasTaskStarted? '':'none'} clicked={() => leaveGame()}>Finish and get paid £0.50.</Button> 
        
            {/* <Button display={remainingTime <= 0 && !room.hasTaskStarted? '':'none'} clicked={() => dispatch(goToPage(pages.DEBRIEF))}>Finish and get paid £0.50.</Button> */}
        </div>
    );
};

export default Game;