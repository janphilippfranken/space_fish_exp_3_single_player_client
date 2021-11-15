export const STORE_TRAINING = 'STORE_TRAINING';

const w = window;

export const storeTraining = trainingData => {
    const training = trainingData.training;
    return { type: STORE_TRAINING, trainingData: {training: training}};
};

