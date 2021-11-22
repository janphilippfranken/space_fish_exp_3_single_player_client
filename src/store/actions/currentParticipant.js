export const REGISTER_PARTICIPANT_NAME = "REGISTER_PARTICIPANT_NAME";
export const REGISTER_PARTICIPANT_ID = "REGISTER_PARTICIPANT_ID";
export const REGISTER_PARTICIPANT_STIMULI = "REGISTER_PARTICIPANT_STIMULI";
export const REGISTER_PARTICIPANT_CONDITION = "REGISTER_PARTICIPANT_CONDITION";
export const REGISTER_PARTICIPANT_FISH = "REGISTER_PARTICIPANT_FISH";
export const REGISTER_PARTICIPANT_POSITION = "REGISTER_PARTICIPANT_POSITION";
export const REGISTER_PARTICIPANT_STRUCTURE_HINT = "REGISTER_PARTICIPANT_STRUCTURE_HINT";
export const REGISTER_PARTICIPANT_PID = "REGISTER_PARTICIPANT_PID";
export const REGISTER_PARTICIPANT_TRAINING = "REGISTER_PARTICIPANT_TRAINING";
export const REGISTER_PARTICIPANT_SOCIAL_TRAINING = "REGISTER_PARTICIPANT_SOCIAL_TRAINING";
export const REGISTER_PARTICIPANT_SOCIAL_TRAINING_STRUCTURE = "REGISTER_PARTICIPANT_SOCIAL_TRAINING_STRUCTURE";


export const registerParticipantName = name => ({type: REGISTER_PARTICIPANT_NAME, participantName: name});
export const registerParticipantId = id => ({type: REGISTER_PARTICIPANT_ID, participantId: id});
export const registerParticipantStimuli = stimuli => ({type: REGISTER_PARTICIPANT_STIMULI, participantStimuli: stimuli});
export const registerParticipantCondition = condition => ({type: REGISTER_PARTICIPANT_CONDITION, participantCondition: condition});
export const registerParticipantFish = fish => ({type: REGISTER_PARTICIPANT_FISH, participantFish: fish});
export const registerParticipantPosition = position => ({type: REGISTER_PARTICIPANT_POSITION, participantPosition: position});
export const registerParticipantStructureHint = structureHint => ({type: REGISTER_PARTICIPANT_STRUCTURE_HINT, participantStructureHint: structureHint});
export const registerParticipantPID = pid => ({type: REGISTER_PARTICIPANT_PID, participantPID: pid});
export const registerParticipantTraining = training => ({type: REGISTER_PARTICIPANT_TRAINING, participantTraining: training});
export const registerParticipantSocialTraining = socialTraining => ({type: REGISTER_PARTICIPANT_SOCIAL_TRAINING, participantSocialTraining: socialTraining});
export const registerParticipantSocialTrainingStructure = socialTrainingStructure => ({type: REGISTER_PARTICIPANT_SOCIAL_TRAINING_STRUCTURE, participantSocialTrainingStructure: socialTrainingStructure});