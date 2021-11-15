import Scenarios from '../../constants/Data/SCENARIOS';
import { INCREMENT_CONDITION } from '../actions/conditionData';
import shuffle from '../../utils/shuffleArray';

const scenarioInstance = new Scenarios();

// for 4 structures - note there are two conditions for both influence each other (one with excitatory / one with inhibitory effects dependent on time fish is sampled)
const conditions = ['lr', 'lr'];

const targetBeliefs = [{'subject1': 0, 'subject2': 0, 'subject3': 1},
                       {'subject1': 0, 'subject2': 0, 'subject3': 1},
                       {'subject1': 0, 'subject2': 0, 'subject3': 1},
                       {'subject1': 0, 'subject2': 0, 'subject3': 1},
                       {'subject1': 0, 'subject2': 0, 'subject3': 1}];

const randOrder = shuffle([0, 1]);  // random condition order 
const scenariosOrder = shuffle([0, 1]);  // cover story for each space station 

const randConditions = conditions[randOrder[0]];

const conditionData = [
    scenarioInstance.generateScenario(scenariosOrder[0], conditions[randOrder[0]], targetBeliefs[0])];
    // scenarioInstance.generateScenario(scenariosOrder[1], conditions[randOrder[1]], targetBeliefs[0])];

const initialState = {
    conditions: randConditions,
    conditionNumber: 0, // running number, the only that gets changed while in experiment
    conditionData: conditionData,
    scenarioOrder: scenariosOrder,
    randOrder: randOrder,
};

// currently not incrementing, just selecting one condition 
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT_CONDITION:
            const oldState = { ...state };
            return { ...state, conditionNumber: oldState.conditionNumber + 1 };

        default:
            return state;
    }
};

export default reducer;