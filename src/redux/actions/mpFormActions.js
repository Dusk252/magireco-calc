import * as types from './actionTypes';

export function updateMpFormTab(formState, index) {
    return { type: types.UPDATE_MP_FORM_STATE, formState, index };
}

export function addMpFormTab(title) {
    return { type: types.ADD_MP_FORM_TAB, title };
}

export function removeMpFormTab(index) {
    return { type: types.REMOVE_MP_FORM_TAB, index };
}
