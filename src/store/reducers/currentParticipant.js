import { REGISTER_PARTICIPANT_NAME, REGISTER_PARTICIPANT_ID, REGISTER_PARTICIPANT_STIMULI, REGISTER_PARTICIPANT_CONDITION, REGISTER_PARTICIPANT_FISH, REGISTER_PARTICIPANT_POSITION, REGISTER_PARTICIPANT_STRUCTURE_HINT, REGISTER_PARTICIPANT_PID, REGISTER_PARTICIPANT_TRAINING, REGISTER_PARTICIPANT_SOCIAL_TRAINING, REGISTER_PARTICIPANT_SOCIAL_TRAINING_STRUCTURE } from '../actions/currentParticipant';

const initialState = {
    name: '',
    id: '',
    stimuli: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_PARTICIPANT_NAME:
            return { ...state, name: action.participantName };
        case REGISTER_PARTICIPANT_ID:
            return { ...state, id: action.participantId};
        case REGISTER_PARTICIPANT_STIMULI:
            return { ...state, stimuli: action.participantStimuli};
        case REGISTER_PARTICIPANT_CONDITION:
            return { ...state, condition: action.participantCondition};
        case REGISTER_PARTICIPANT_FISH:
            return { ...state, fish: action.participantFish};
        case REGISTER_PARTICIPANT_POSITION:
            return { ...state, position: action.participantPosition};
        case REGISTER_PARTICIPANT_STRUCTURE_HINT:
            return { ...state, structureHint: action.participantStructureHint};
        case REGISTER_PARTICIPANT_PID:
            return { ...state, pid: action.participantPID};
        case REGISTER_PARTICIPANT_TRAINING:
            return { ...state, training: action.participantTraining};
        case REGISTER_PARTICIPANT_SOCIAL_TRAINING:
            return { ...state, socialTraining: action.participantSocialTraining};
        case REGISTER_PARTICIPANT_SOCIAL_TRAINING_STRUCTURE:
            return { ...state, socialTrainingStructure: action.REGISTER_PARTICIPANT_SOCIAL_TRAINING_STRUCTURE};
        default:
            return state;
    }
}


export default reducer;