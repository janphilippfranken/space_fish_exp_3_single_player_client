export const STORE_SOCIAL_TRAINING_STRUCTURE = 'STORE_SOCIAL_TRAINING_STRUCTURE';

const w = window;

export const storeSocialTrainingStructure = socialTrainingStructureData => {
    const socialTrainingStructure = socialTrainingStructureData.socialTrainingStructure;
    return { type: STORE_SOCIAL_TRAINING_STRUCTURE, socialTrainingStructureData: {socialTrainingStructure: socialTrainingStructure}};
};

