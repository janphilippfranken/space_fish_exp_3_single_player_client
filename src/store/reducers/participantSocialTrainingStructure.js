import { STORE_SOCIAL_TRAINING_STRUCTURE } from '../actions/participantSocialTrainingStructure';

const initialState = { socialTrainingStructure: 'x'};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_SOCIAL_TRAINING_STRUCTURE:
            return action.socialTrainingStructureData;
        default:
            return state;
    }
};

export default reducer;



