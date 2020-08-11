import * as types from '../actions/actionTypes';

export default function dmgFormReducer(state = [], action) {
    switch (action.type) {
        case types.UPDATE_MP_FORM_STATE:
            return { ...state, ...action.config };
        default:
            return state;
    }
}
