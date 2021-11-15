import { STORE_SOCIAL_TRAINING } from '../actions/participantSocialTraining';

const initialState = { socialTraining: 'x'};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_SOCIAL_TRAINING:
            return action.socialTrainingData;
        default:
            return state;
    }
};

export default reducer;



