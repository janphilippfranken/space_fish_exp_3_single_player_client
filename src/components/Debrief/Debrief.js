import React, { useEffect, useState } from 'react';
import Classes from './Debrief.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../Button/Button';
import TryAgainModal from '../TryAgainModal/TryAgainModal';
import { getSocket } from '../../socket.io/socket-setup';
import { pages, goToPage } from '../../store/actions/navigation';

let socket;

const Debrief = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        socket = getSocket();
        }, []);




  
 

    // getting the current participant and room which includes data from other participants 
    const thisParticipant = useSelector(state => state.currentParticipant);
    const room = useSelector(state => state.currentRoom);
    console.log(room);
    console.log(thisParticipant);
    const conditionNumber = useSelector(state => state.conditionData.conditionNumber);


   
    // demographic variables 
    const [engaging, setEngaging] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [trust, setTrust] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [prior, setPrior] = useState('');
    const [post, setPost] = useState('');
    const [both, setBoth] = useState('');
    const [comment, setComment] = useState('');
    const [showModal, setShowModal] = useState(false);

    const submitDebriefHandler = () => {
        const debriefData = {
            engaging: engaging,
            difficutly: difficulty,
            trust: trust,
            age: age,
            gender: sex,
            priorStrategy: prior,
            posteriorStrategy: post,
            bothStrategy: both,
            comment: comment,
        };

        if (prior.split(' ').join('').length === 0 ||
            post.split(' ').join('').length === 0 ||
            both.split(' ').join('').length === 0 ||
            age.split(' ').join('').length === 0 ||
            sex.split(' ').join('').length === 0 ||
            difficulty.split(' ').join('').length === 0 ||
            trust.split(' ').join('').length === 0 ||
            engaging.split(' ').join('').length === 0) {
            setShowModal(true);

        } else {
           
            socket.emit('debrief-selected',
            {
                planetSelectionTrial: { participantId: thisParticipant.id, debriefData: debriefData, conditionNumber: conditionNumber, participantPID: thisParticipant.pid.pid },
                roomId: room.id 
                
            });

            console.log(room);
            dispatch(goToPage(pages.END));
            

        }
    };

    const closeModalHandler = () => {
        setShowModal(false);
    };

    const modal = (
        <TryAgainModal onCloseModal={closeModalHandler}>
            <h2>Please fill in all the required fields, thank you. <span role="img" aria-label="emoji">&#128517;</span></h2>
        </TryAgainModal>
    );



    return (
        <div className={Classes.Debrief}>
            {showModal && modal}
            <div className={Classes.InnerContainer}>
                <h1>Debrief and demographics</h1>
                <p>Thank you for your contribution to science. When you fill the following questions you'll get a reference code
                which you can use to get paid.
                </p>
                <br />
                <hr />
                <p className={Classes.Asterisk}><i>Questions with * are required.</i></p>
                <div className={Classes.Form}>
                    <div className={Classes.AgeContainer}>
                        <label htmlFor="age">How old are you:<span>*</span>&nbsp;</label>
                        <input type="number" maxLength={3} id="age" min={1} max={100} step={1} value={age} onChange={e => setAge(e.target.value)} />
                    </div>
                    <div className={Classes.GenderContainer}>
                        <label htmlFor="sex">What is your gender:<span>*</span>&nbsp;</label>
                        <select id="sex" value={sex} onChange={e => setSex(e.target.value)}>
                            <option value="noresp" defaultValue></option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                            <option value="noresponse">I’d prefer not to respond</option>
                        </select>
                    </div>
                    <div className={Classes.EngagingContainer}>
                        <label htmlFor="engaging">Please rate how <b>ENGAGING</b> you found the task:<span>*</span> </label>
                        <select id="engaging" value={engaging} onChange={e => setEngaging(e.target.value)}>
                            <option value="--" defaultValue> </option>
                            <option value="10">10 - Very engaging</option>
                            <option value="9">9</option>
                            <option value="8">8</option>
                            <option value="7">7</option>
                            <option value="6">6</option>
                            <option value="5">5 - Moderately</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                            <option value="0">0 - Not engaged</option>
                        </select>
                    </div>
                    <div className={Classes.DifficutlyContainer}>
                        <label htmlFor="difficulty">Please rate how <b>DIFFICULT</b> you found the task:<span>*</span> </label>
                        <select id="difficulty" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                            <option value="--" defaultValue></option>
                            <option value="10">10 - Very difficult</option>
                            <option value="9">9</option>
                            <option value="8">8</option>
                            <option value="7">7</option>
                            <option value="6">6</option>
                            <option value="5">5 - Moderately difficult</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                            <option value="0">0 - Not difficult at all</option>
                        </select>
                    </div>

                    <div className={Classes.TrustContainer}>
                        <label htmlFor="trust">Please rate how <b>TRUSTWORTHY</b> you found the other players:<span>*</span></label>
                        <select id="trust" value={trust} onChange={e => setTrust(e.target.value)}>
                            <option value="--" defaultValue></option>
                            <option value="10">10 - Very trustworthy</option>
                            <option value="9">9</option>
                            <option value="8">8</option>
                            <option value="7">7</option>
                            <option value="6">6</option>
                            <option value="5">5 - Moderately trustworthy</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                            <option value="0">0 - Not trustworthy at all</option>
                        </select>
                    </div> 

                    <div className={Classes.PriorContainer}>
                        <label htmlFor="prior">How did you decide whether the other players influenced each other? Did you have a specific strategy?<span>*</span></label>
                        <textarea id="prior" value={prior} onChange={e => setPrior(e.target.value)} />
                    </div>

                    <div className={Classes.BothContainer}>
                        <label htmlFor="both2">How did you decide whether <b>you influenced</b> the other players? Did you have a specific strategy?<span>*</span></label>
                        <textarea id="both2" value={both} onChange={e => setBoth(e.target.value)} />
                    </div> 

                    <div className={Classes.PosteriorContainer}>
                        <label htmlFor="posterior">How did you decide which <b>planet</b> to select?<span>*</span></label>
                        <textarea id="posterior" value={post} onChange={e => setPost(e.target.value)} />
                    </div>

                    <div className={Classes.CommentsContainer}>
                        <label htmlFor="comments">Do you have any comments regarding the experiment?</label>
                        <textarea id="comments" value={comment} onChange={e => setComment(e.target.value)} />
                    </div>
                </div>
                <Button clicked={submitDebriefHandler}>Next</Button>
            </div>
        </div>
    );
};

export default Debrief;
