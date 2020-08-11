import * as types from '../actions/actionTypes';

export default function dmgFormReducer(state = [], action) {
    switch (action.type) {
        case types.UPDATE_DMG_FORM_STATE: {
            let updatedTab = { title: state[action.index].title, formState: action.formState };
            return Object.assign([], [...state], { [action.index]: updatedTab });
        }
        case types.ADD_DMG_FORM_TAB:
            return [...state, { title: action.title, formState: null }];
        case types.REMOVE_DMG_FORM_TAB: {
            let newState = Object.assign([], [...state]);
            newState.splice(action.index, 1);
            return newState;
        }
        default:
            return state;
    }
}
