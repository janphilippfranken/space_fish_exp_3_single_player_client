import React from 'react';
import { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import planetImage from '../../static/images/planets_with_fish.png';
import cookImage from '../../static/images/cooking.png';
import saltImage from '../../static/images/salt.png';
import Classes from '../../SASS/containers/Instruction/InsOverview.module.scss';
import ScrollDivision from '../../components/ScrollDivision/ScrollDivision';

const InsOverview = props => {

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


    return (
        <div className={Classes.InsOverview}>
            
            <div className={Classes.InnerContainer}>
                <h1>LOST IN SPACE</h1>
                <h4>You have {remainingTimeMin} minutes and {remainingTimeSec} seconds left to complete this page.</h4>
                <hr />           
                <div className={Classes.InsReminder}>
                    <p><i>*** Please read carefully. You will complete a comprehension quiz at the end. ***</i></p>
                    <p><i>*** Scroll down to see details. ***</i></p>
                   
                </div> 
                <ScrollDivision>

         
                <p>Imagine there are two planets called Planet RED and Planet BLUE.<br></br></p> <br></br>
                    
                <p>Both planets are inhabited by a strange <b>SPACE FISH</b>.<br></br></p> <br></br>

                <p>On <b>Planet RED</b> fish are mainly <b className={Classes.PlanetColorRed}>RED</b> (2/3 of the fish are RED and 1/3 are BLUE).<br></br></p><br></br>
                
                <p>On <b>Planet BLUE</b> fish are mainly <b className={Classes.PlanetColorBlue}>BLUE</b> (2/3 of the fish are BLUE and 1/3 are RED).<br></br></p><br></br>

                <img src={planetImage} height={'200px'} width={'5px'} alt="planets"/><br></br>

                <p>In other respects the planets cannot be told apart!</p><br></br>

                <p>Note: Planets themselves have no color. A planet is called Planet RED / Planet BLUE as it happens to have more  <b className={Classes.PlanetColorRed}>RED</b> /  <b className={Classes.PlanetColorBlue}>BLUE</b> fish.</p><br></br>

    
                  
       
      

               
      

                    {/* <p><b>Important</b>: The strange space fish only reveal their color <b>after</b> being cooked! Prior to cooking, it is 
                    <b> impossible</b> to tell the color of a fish.</p>
                    
                    {/* 3/4 of the fish are RED, 
                    and 1/4 are BLUE. On the <b>BLUE planet</b> , the proportions are <b>reversed</b>: 3/4 of the fish are BLUE, 
                    and 1/4 are RED.</p> */}
           
                {/* <img src={cookImage} alt="cooking"/><br></br><br></br><br></br> */}

                {/* <p> */}
                    {/* <b>Important:</b> RED fish have to be cooked with <b>RED SALT</b>, while BLUE fish have to be cooked with <b>BLUE SALT</b>. If cooked with the wrong salt, a fish will become <b>toxic</b> and thus inedible.</p><br></br> */}

                    {/* <img src={saltImage} alt="salt"/><br></br><br></br><br></br> */} 
                    
                <hr />
                <Button clicked={props.goToInstruction}>Next</Button>
                </ScrollDivision>
            </div>
        </div>
    );
};

export default InsOverview;