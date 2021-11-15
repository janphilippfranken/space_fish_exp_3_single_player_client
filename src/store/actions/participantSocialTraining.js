export const STORE_SOCIAL_TRAINING = 'STORE_SOCIAL_TRAINING';

const w = window;

export const storeSocialTraining = socialTrainingData => {
    const socialTraining = socialTrainingData.socialTraining;
    return { type: STORE_SOCIAL_TRAINING, socialTrainingData: {socialTraining: socialTraining}};
};

