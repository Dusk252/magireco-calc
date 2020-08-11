import { combineReducers } from 'redux';
import mpFormTabs from './mpFormReducer';
import dmgFormTabs from './dmgFormReducer';

const rootReducer = combineReducers({
    mpFormTabs,
    dmgFormTabs
});

export default rootReducer;
