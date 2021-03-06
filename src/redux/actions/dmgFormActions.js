import * as types from './actionTypes';

export function updateDmgFormTab(formState, index) {
    return { type: types.UPDATE_DMG_FORM_STATE, formState, index };
}

export function addDmgFormTab(title, formState) {
    return { type: types.ADD_DMG_FORM_TAB, title, formState };
}

export function removeDmgFormTab(index) {
    return { type: types.REMOVE_DMG_FORM_TAB, index };
}

export function updateDmgFormResults(results, index) {
    return { type: types.UPDATE_DMG_FORM_RESULTS, results, index };
}
