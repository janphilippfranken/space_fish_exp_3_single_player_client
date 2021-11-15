import { STORE_TRAINING } from '../actions/participantTraining';

const initialState = { training: 'x'};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_TRAINING:
            return action.trainingData;
        default:
            return state;
    }
};

export default reducer;



