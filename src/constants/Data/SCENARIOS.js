import shuffle from '../../utils/shuffleArray';

export default class Scenario {
    /* 
        add here infos
    */

    constructor() {
        this.titles = [
            'Welcome to Skylab!',
            'Welcome to Almas!',
            'Welcome to Salyut-1!',
            'Welcome to Tiangong-1!',
            'Welcome to Salyut-2!'
        ];

        this.structureOrder = shuffle([
            ['5.5%', '2%', '1.5%'],
            ['26.5%', '22%','22.5%'],
            ['47.5%', '44%', '43.5%'],
            ['68.5%', '65%', '64.5%'] 
        ]);

        this.planetPosition = shuffle([
            '0',
            '0'
        ]);

    }

    generateScenario = (scenarioId, cond, targetBelief, left_right) => {        
        const title = this.titles[scenarioId];
        const structureOrder = this.structureOrder;
        const planetPosition = this.planetPosition; 
        const condition = cond;
        const tarBelief = targetBelief;
        const lr = left_right;

        return {
            condition: condition,
            structureOrder: structureOrder,
            planetPosition: planetPosition,
            title: title,
            targetBelief: tarBelief,
            left_right: lr,

        }
    }
};
