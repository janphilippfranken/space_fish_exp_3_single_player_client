import React from 'react';
import { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Classes from '../../SASS/containers/Instruction/InsQuiz.module.scss';
import vlImage from '../../static/images/vl.png';
import TryAgainModal from '../../components/TryAgainModal/TryAgainModal';
import { useDispatch } from 'react-redux';
import { pages, goToPage } from '../../store/actions/navigation';
// import { changePhase, PHASES } from '../../store/actions/gamePhase';

const InsQuiz = props => {
    const dispatch = useDispatch();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showCorrectModal, setShowCorrectModal] = useState(false);


    const [remainingTime, setRemainingTime] = useState(120);

    const [remainingTimeMin, setRemainingTimeMin] = useState(2);
    const [remainingTimeSec, setRemainingTimeSec] = useState(0);
   
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

    const submitAnswersHandler = () => {
        const answers = Array.from(document.getElementsByClassName('input'));
        const isCorrect = [answers[0].checked, answers[2].checked, !answers[4].checked, answers[6].checked, answers[8].checked, answers[10].checked].every(i => i);
        if (isCorrect) {
            setShowCorrectModal(true)
        } else {
            setShowErrorModal(true)
        }
    };

    const closeErrorModalHandler = () => {
        props.goToInstruction();
        setShowErrorModal(false);
    };

    const closeCorrectModalHandler = () => {
        setShowCorrectModal(false);
        dispatch(goToPage(pages.REGISTER));
        // dispatch(changePhase(PHASES.experiment));
    };
    const tryAgainCorrectModal = (
        <TryAgainModal onCloseModal={closeCorrectModalHandler}>
            <h2>That's great, you got everything right! You can now start the game! <span role="img" aria-label="emoji">&#128518;</span></h2>
        </TryAgainModal>
    );
    const tryAgainErrorModal = (
        <TryAgainModal onCloseModal={closeErrorModalHandler}>
            <h2>You gave at least one wrong answer, please go back and read the instructions more carefully! <span role="img" aria-label="emoji">&#128517;</span></h2>
        </TryAgainModal>
    );
    return (
        <div className={Classes.InsQuiz}>
            {showErrorModal && tryAgainErrorModal}
            {showCorrectModal && tryAgainCorrectModal}
            <div className={Classes.InnerContainer}>
                <h1>Comprehension quiz</h1>
                <h4>You have {remainingTimeMin} minutes and {remainingTimeSec} seconds left to complete this page.</h4>
                <hr />  
                <div className={Classes.QuizContainer}>
                    {/* <p className={Classes.Qs}><b>Questions</b></p> */}
                    <p className={Classes.Ts}><b>True</b></p>
                    <p className={Classes.Fs}><b>False</b></p>
                    <hr className={Classes.Hr} />
                    <img className={Classes.Vl} src={vlImage} alt="vertical line" />
                    <input type="radio" name="1" className={[Classes.T1, 'input'].join(" ")} />
                    <input type="radio" name="1" className={[Classes.F1, 'input'].join(" ")} />
                    <input type="radio" name="2" className={[Classes.T2, 'input'].join(" ")} />
                    <input type="radio" name="2" className={[Classes.F2, 'input'].join(" ")} />
                    <input type="radio" name="3" className={[Classes.T3, 'input'].join(" ")} />
                    <input type="radio" name="3" className={[Classes.F3, 'input'].join(" ")} />
                    <input type="radio" name="4" className={[Classes.T4, 'input'].join(" ")} />
                    <input type="radio" name="4" className={[Classes.F4, 'input'].join(" ")} />
                    <input type="radio" name="5" className={[Classes.T5, 'input'].join(" ")} />
                    <input type="radio" name="5" className={[Classes.F5, 'input'].join(" ")} />
                    <input type="radio" name="6" className={[Classes.T6, 'input'].join(" ")} />
                    <input type="radio" name="6" className={[Classes.F6, 'input'].join(" ")} />
                    <li className={Classes.Q1}>1. On Planet RED, fish are mainly <b className={Classes.PlanetColorRed}>RED</b>. On Planet BLUE, fish are mainly <b className={Classes.PlanetColorBlue}>BLUE</b>.</li>
                    <li className={Classes.Q2}>2. You and two other players are fishing at the same planet (either on Planet RED or on Planet BLUE).</li>
                    <li className={Classes.Q3}>3. One of you already knows at the start which planet you are fishing on.</li>
                    <li className={Classes.Q4}>4. You can’t see the other players' catches directly, so you can only know which planet you are at by looking at whatever fish you catch yourself and any judgments you might see from the other players.</li>
                    {/* <li className={Classes.Q5}>5. You can directly see <b>whether the other players can see each other's judgments and if they can see your own judgments</b>. You <b>should consider</b> this knowledge when updating your own judgments.</li> */}
                    <li className={Classes.Q5}>5. You can’t be sure if the other players are seeing each other's judgments or if they can see your judgments.</li>
                    
                    
                    <li className={Classes.Q6}>6. You need to consider current and past evidence (your own fish <b>and</b> other players' judgments) when making a new judgment. You will be paid £0.15 bonus for selecting the correct planet in each round (max. total bonus = £1.50).</li>
                     {/*<b>DEV::STRUCTURE UNKNOWN</b>You can’t be sure if the other players are seeing each other's judgments or if they can see your judgments. You will need to <b>infer who sees whose judgments</b> by looking at how other players' judgments change over time */}
                     {/* You can directly see <b>whether the other players can see each other's judgments and if they can see your own judgments</b>. You <b>should consider</b> this knowledge when updating your own judgments.<br></br><br></br></li> */}
                </div>
                <hr />
                <br />
                {/* <Button clicked={submitAnswersHandler}>Next</Button> */}
                <Button clicked={submitAnswersHandler}>Next</Button>
                
            </div>
        </div >
    );
};

export default InsQuiz;