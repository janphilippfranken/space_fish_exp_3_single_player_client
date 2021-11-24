import { useDispatch } from 'react-redux';
import { pages, goToPage } from '../../store/actions/navigation';
import { useState, useEffect } from 'react';
import { registerParticipantName } from '../../store/actions/currentParticipant';
import Button from '../../components/Button/Button';
import classes from './Register.module.css';


const Register = () => {

    const [remainingTime, setRemainingTime] = useState(30);
    const [startTime, setStartTime] = useState(1);
    const [gameStarting, setGameStarting] = useState(false);

    const play = () => {   
        // const beepsound = new Audio('https://www.soundjay.com/button/sounds/beep-01a.mp3');   
        // beepsound.play();   
    };   

    useEffect(() => {
        const timeOut = setTimeout (() => {
            if (remainingTime > 0) {
                setRemainingTime(remainingTime-1);
            };
            if (remainingTime === 1) {
                // play();
            };
            if (remainingTime === 0) {
                // window.location.replace("http://www.sorrytoolate.com/");
                alert('Please register with a username now');
            };
            setStartTime(startTime-1);
            if (startTime===0 && participantName.length >= 2 && participantName.length <= 5) {
                dispatch(registerParticipantName(participantName));
                dispatch(goToPage(pages.GAME));
            };

            clearTimeout(timeOut);
        }, 1000)
        return () => {
            clearTimeout(timeOut);
        }; 
    },[remainingTime, startTime]);



    const [participantName, setParticipantName] = useState('');

    const dispatch = useDispatch();

    const goToGameHandler = () => {
        setStartTime(999999);
        if (!participantName.trim()) return;
        if (participantName.length >= 2 && participantName.length <= 5){
            setStartTime(5);
            setRemainingTime(10)
            setGameStarting(true);
            // dispatch(registerParticipantName(participantName));
            // dispatch(goToPage(pages.GAME));
        }
        else {
            alert('Please make sure username has min. 2 characters and max. 5 characters!')
        }
        
        
    };

    return (
        <> 
         {!gameStarting && <p>Users waiting in lobby: <b>jax</b> , <b>tia</b></p>}<br></br>
         {!gameStarting && <h4>You have {remainingTime} seconds left to register.</h4>}
         {gameStarting && <h4>Lobby complete! Game starting in {startTime} seconds.</h4>}
         {!gameStarting && <p>Please enter your username. The length of your username has to be between 2-5 characters.</p>}<br></br>
         {!gameStarting && <input position={"absolute"} left={"50%"} type="text" placeholder="Name" value={participantName} onChange={e => setParticipantName(e.target.value)}/>}
         {!gameStarting && <Button clicked={goToGameHandler}>
                Register
            </Button>}
       
        </>
    );
};

export default Register;