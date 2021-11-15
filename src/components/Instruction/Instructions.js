import React, { useState } from 'react';
import InsOverview from './InsOverview';
import InsTask0 from './InsTask0';
import InsTask1 from './InsTask1';
import InsTask2 from './InsTask2';
import InsTask3 from './InsTask3';
import InsTask4 from './InsTask4';
import InsTask5 from './InsTask5';
import InsSummary from './InsSummary';
import InsQuiz from './InsQuiz';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


const INS_PHASES = {
    overview: 'INSTRUCTIONS_OVERVIEW',
    task0: 'INSTRUCTIONS_TASK_0',
    task1: 'INSTRUCTIONS_TASK_1',
    task2: 'INSTRUCTIONS_TASK_2',
    task3: 'INSTRUCTIONS_TASK_3',
    task4: 'INSTRUCTIONS_TASK_4',
    task5: 'INSTRUCTIONS_TASK_5',
    summary: 'SUMMARY',
    comprehensionQuiz: 'QUIZ'
};

const Instructions = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(setTimer(true, 1, 5));
    }, [dispatch]);

    const [instructionsPhase, setInstructionsPhase] = useState(INS_PHASES.overview);

    const goToInstructionHandler = instructionPage => {
        setInstructionsPhase(instructionPage);
    };

    let currentInstruction;
    if (instructionsPhase === INS_PHASES.overview) {
        currentInstruction = <InsOverview goToInstruction={goToInstructionHandler.bind(this, INS_PHASES.task0)}/>;
    } else if (instructionsPhase === INS_PHASES.task0) {
        currentInstruction = <InsTask0 goToInstruction={goToInstructionHandler.bind(this, INS_PHASES.task1)} />;
    } else if (instructionsPhase === INS_PHASES.task1) {
        currentInstruction = <InsTask1 goToInstruction={goToInstructionHandler.bind(this, INS_PHASES.task2)} />;
    } else if (instructionsPhase === INS_PHASES.task2) {
        currentInstruction = <InsTask2 goToInstruction={goToInstructionHandler.bind(this, INS_PHASES.task3)} />;
    } else if (instructionsPhase === INS_PHASES.task3) {
        currentInstruction = <InsTask3 goToInstruction={goToInstructionHandler.bind(this, INS_PHASES.task4)} />;
    } else if (instructionsPhase === INS_PHASES.task4) {
        currentInstruction = <InsTask4 goToInstruction={goToInstructionHandler.bind(this, INS_PHASES.task5)} />;
    } else if (instructionsPhase === INS_PHASES.task5) {
        currentInstruction = <InsTask5 goToInstruction={goToInstructionHandler.bind(this, INS_PHASES.summary)} />;
    } else if (instructionsPhase === INS_PHASES.summary) {
        currentInstruction = <InsSummary goToInstruction={goToInstructionHandler.bind(this, INS_PHASES.comprehensionQuiz)} />;
    } else if (instructionsPhase === INS_PHASES.comprehensionQuiz) {
        currentInstruction = <InsQuiz goToInstruction={goToInstructionHandler.bind(this, INS_PHASES.summary)} />;
    }

    return (
        currentInstruction
    );
};

export default Instructions;