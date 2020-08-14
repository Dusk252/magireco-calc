import * as types from './../actions/actionTypes';

export default function mpFormReducer(state = [], action) {
    switch (action.type) {
        case types.UPDATE_MP_FORM_STATE:
            return Object.assign([], [...state], {
                [action.index]: { ...state[action.index], formState: action.formState }
            });
        case types.ADD_MP_FORM_TAB:
            return [...state, { title: action.title, formState: null, results: null }];
        case types.REMOVE_MP_FORM_TAB: {
            let newState = Object.assign([], [...state]);
            newState.splice(action.index, 1);
            return newState;
        }
        case types.UPDATE_MP_FORM_RESULTS:
            return Object.assign([], [...state], { [action.index]: { ...state[action.index], results: action.results } });
        default:
            return state;
    }
}
