import React from 'react';
import ReactDOM from "react-dom";
import Countdown from "react-countdown";
import Button from '../Button/Button';
import VolumeButton from '../VolumeButton/VolumeButton';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import TryAgainModal from '../TryAgainModal/TryAgainModal';
import Classes from '../../SASS/containers/Ethics.module.scss';
import debriefClasses from '../../SASS/containers/Debrief.module.scss';
// import { setTimer } from '../..store/actions/timer';
import reminderSound from '../../static/sounds/reminder_sound.mp3';
import { pages, goToPage } from '../../store/actions/navigation';
import { storePID } from '../../store/actions/participantID';
import volumeButton from '../VolumeButton/VolumeButton';

const Ethics = props => {
    
    const dispatch = useDispatch();
    const [PID, setPID] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [remainingTime, setRemainingTime] = useState(300);
    const [remainingTimeMin, setRemainingTimeMin] = useState(5);
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
                window.location.replace("http://www.sorrytoolate.com/");
            };
            clearTimeout(timeOut);
        }, 1000)
        return () => {
            clearTimeout(timeOut);
        }; 
    },[remainingTime,remainingTimeSec,remainingTimeMin]);

    // const timeOut1 = setTimeout(() => {
    //     // alert('Please make sure to proceed as fast as you can or you may be excluded from the game.');
    //     clearTimeout(timeOut1);
    // }, 1000);


    const play = () => {   
        const beepsound = new Audio(reminderSound);   
        beepsound.play();   
    };   

   
    const getPID = (e) => {
        setPID(e.target.value);
    };

    const closeErrorModalHandler = () => {
        setShowErrorModal(false);
    };

    const goToNotesHandler = () => {
        if (PID.length === 24) {
            dispatch(goToPage(pages.INSTRUCTIONS));
            dispatch(storePID({PID: PID}));
            console.log(PID);
        }
        else {
            setShowErrorModal(true);
        }
    };

    const tryAgainErrorModal = (
        <TryAgainModal onCloseModal={closeErrorModalHandler}>
            <h2>Your Prolific ID does not have the correct format! Please make sure to enter the right ID (24 characters) <span role="img" aria-label="emoji">&#128517;</span></h2>
        </TryAgainModal>
    );

    return (

        
        

        <div className={Classes.Ethics}>
            {showErrorModal && tryAgainErrorModal}
            <div className={Classes.EthicsForm}>
                <h2>Consent Information</h2>
                <h4>You have {remainingTimeMin} minutes and {remainingTimeSec} seconds left to complete this page.</h4>
                {/* <h2>Information for the participants</h2> */}
                <hr />
                <div className={Classes.ParagraphContainer}>
                    <p><b>Nature of the study.&nbsp;</b>In this experiment, you will team up with two other players and travel to a fictional planet to catch fish. After the experiment, we will ask you to provide some basic demographics (e.g., age). You will be given full instructions shortly. You may contact the lead experimenter <a href="mailto:jp.franken@ed.ac.uk">jp.franken@ed.ac.uk</a> with any questions you may have.</p>
                </div>
                <div className={Classes.ParagraphContainer}>
                    <p><b>Compensation.&nbsp;</b>You will be paid £1.00 for your participation + up to £1.50 performance bonus (max. pay = £2.50). The task should take around 10 minutes on average.</p>
                </div>
                <div className={Classes.ParagraphContainer}>
                    <p><b>Risks and benefits.&nbsp;</b>There are no known risks to participation in this study. Other than the payment mentioned, there are no tangible benefits to you, however you will be contributing to our knowledge about how people learn and reason.</p>
                </div>
                <div className={Classes.ParagraphContainer}>
                    <p><b>Confidentiality and use of data.&nbsp;</b>All the information we collect during the course of the research will be processed in accordance with Data Protection Law. In order to safeguard your privacy, we will never share personal information (like names or dates of birth) with anyone outside the research team. Your data will be referred to by a unique participant number rather than by name. Please note that we will temporarily collect your worker ID and IP address to prevent repeated participation, however we will never share this information with anyone outside the research team. The anonymised data collected during this study will be used for research purposes and might be put online via platforms such as the OpenScience Framework or GitHub.</p></div>
                <div className={Classes.ParagraphContainer}>
                    <p><b>What are my data protection rights?&nbsp;</b>The University of Edinburgh is a Data Controller for the information you provide. You have the right to access information held about you. Your right of access can be exercised in accordance with Data Protection Law. You also have other rights including rights of correction, erasure and objection. For more details, including the right to lodge a complaint with the Information Commissioner's Office, please visit www.ico.org.uk. Questions, comments and requests about your personal data can also be sent to the University Data Protection Officer at dpo@ed.ac.uk.</p></div>
                <div className={Classes.ParagraphContainer}>
                    <p><b>Voluntary participation and right to withdraw.&nbsp;</b> Your participation is voluntary, and you may withdraw from the study at any time and for any reason. If you withdraw from the study during or after data gathering, we will delete your data and there is no penalty or loss of benefits to which you are otherwise entitled.</p></div>
                <div className={Classes.ParagraphContainer}>
                    <p>If you have any questions about what you've just read, please feel free to ask, or contact us later. You can contact us by email at <a href="mailto:jp.franken@ed.ac.uk">jp.franken@ed.ac.uk</a>. This project has been approved by PPLS Ethics committee with the Ref No: 172-2021/2. If you have questions or comments regarding your own or your child's rights as a participant, they can be contacted at 0131 650 4020 or ppls.ethics@ed.ac.uk.</p></div>
                <br></br>

                <p><b>READ CAREFULLY</b>: By accepting this HIT, you consent to the following:</p>
                <hr />
                <ol>
                    <li>I agree to participate in this study.</li>
                    <li>I confirm that I am at least 18 years old or older. </li>
                    <li>I confirm that I have read and understood how my data will be stored and used.</li>
                    <li>I understand that I have the right to terminate this session at any point. </li>
                    <li>I use a laptop or desktop computer in full-screen mode. I will <b>NOT CLOSE</b> or leave this window for the duration of the experiment. </li>
                    <li>You adjusted the volume of your speakers or headphones to a <b>very low</b> level. If yes, then please click <b>TEST VOLUME</b>. If you can hear the sound well but it is not too loud, you can proceed. Otherwise, adjust the volume accordingly. <VolumeButton clicked={play}>TEST VOLUME</VolumeButton> </li>

                </ol>
               
                <hr />
                <br />
                <div className={Classes.ParagraphContainer}>
                    <div className={debriefClasses.CommentsContainer}>
                        <label htmlFor="comments">Before you accept and continue, please copy your Prolific Worker ID in the box below. <b>Note</b>: Its essential that you copy your ID right, otherwise you may not be eligible for payment.</label><br></br>
                        <textarea id="comments" value={PID} onChange={getPID} />
                    </div>
                </div>
               
                <Button clicked={goToNotesHandler}>Accept Hit and Continue</Button>
            </div>
        </div>
    );
};

export default Ethics;