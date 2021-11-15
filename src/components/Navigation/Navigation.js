import { useSelector } from 'react-redux';
import UOEsignature from '../uoeSignature/uoeSignature';
import { pages } from '../../store/actions/navigation';
import Classes from './Navigation.module.css';
import Instructions from '../Instruction/Instructions';
import Register from '../Register/Register';
import Game from '../Game/Game';
import Debrief from '../Debrief/Debrief';
import END from '../End/End';
import Ethics from '../Ethics/Ethics';

const Navigation = () => {
    const currentPage = useSelector(state => state.navigation.currentPage);

    let displayingPage;
    switch (currentPage) {
        case pages.ETHICS:
            displayingPage = <Ethics />
            break;
        case pages.INSTRUCTIONS:
            displayingPage = <Instructions />
            break;
        case pages.REGISTER:
            displayingPage = <Register />
            break;
        case pages.GAME:
            displayingPage = <Game />
            break;
        case pages.DEBRIEF:
            displayingPage = <Debrief />
            break;
        case pages.END:
            displayingPage = <END />
            break;
        default:
            throw new Error("currentPage value is wrong");
    }

    return (
        <div className={Classes.Container}>
            <UOEsignature />
            {/* <Timer minutes={timer.min} seconds={timer.sec} disableTimer={timer.timer} /> */}
            <main className={Classes.main}>
                {displayingPage}
            </main>
        </div>
    );
};
    // return displayingPage;


export default Navigation;