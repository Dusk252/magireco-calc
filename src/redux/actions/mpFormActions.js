import * as types from './actionTypes';

export function updateMpFormTab(formState, index) {
    return { type: types.UPDATE_MP_FORM_STATE, formState, index };
}

export function addMpFormTab(title, formState) {
    return { type: types.ADD_MP_FORM_TAB, title, formState };
}

export function removeMpFormTab(index) {
    return { type: types.REMOVE_MP_FORM_TAB, index };
}

export function updateMpFormResults(results, index) {
    return { type: types.UPDATE_MP_FORM_RESULTS, results, index };
}
