import { REGISTER_ROOM } from '../actions/currentRoom';

const initialState = {
    participants: [],
    hasTaskStarted: false,
    commonData: false,
    roomId: null,
    planetSelections: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_ROOM:
            return { ...action.room };
        default:
            return state;
    }
}

export default reducer;