import { GO_TO_PAGE, pages } from '../actions/navigation';

const initialState = {
    currentPage: pages.ETHICS
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GO_TO_PAGE:
            return { currentPage: pages[action.page] };
        default:
            return state;
    }
};


export default reducer;