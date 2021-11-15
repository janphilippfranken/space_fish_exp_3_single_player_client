import './Instructions.css';
import { useDispatch } from 'react-redux';
import { pages, goToPage } from '../../store/actions/navigation';
import Button from '../../components/Button/Button';


const Instructions = () => {

    const dispatch = useDispatch();

    const goToGameHandler = () => {
        dispatch(goToPage(pages.REGISTER));
    };

    return (
        <>
        <p>Instructions Complete, Proceed to Register for Lobby</p>
            <Button clicked={goToGameHandler}>
                Next
            </Button>
        </>
    );
};

export default Instructions;