import React from 'react';
import Classes from './End.module.css';

const End = props => {
    return (
        <div className={Classes.End}>
            <div className={Classes.InnerContainer}>
                <h1>You reached the end!!</h1>
                <hr />
                <p>Copy this code to be eligible via payment on Prolific: 1A79B39E</p>
                     {/* {participantToken}</p> */}
                <hr />
                <div id='EndImg'>
                <img  src='https://www.nownovel.com/include/images/icons/round_mountain.png' alt="thank you" />
                </div>
            </div>
        </div>
    );
};

export default End;