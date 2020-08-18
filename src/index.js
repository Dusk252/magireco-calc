import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import configureStore from './redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { LOCAL_STORAGE_MP, LOCAL_STORAGE_DMG } from './constants/const';

//localStorage.removeItem(LOCAL_STORAGE_MP);
//localStorage.removeItem(LOCAL_STORAGE_DMG);

const storedMpStateString = localStorage.getItem(LOCAL_STORAGE_MP);
const storedDmgStateString = localStorage.getItem(LOCAL_STORAGE_DMG);

const store = configureStore({
    mpFormTabs: storedMpStateString != null ? JSON.parse(storedMpStateString) : [],
    dmgFormTabs: storedDmgStateString != null ? JSON.parse(storedDmgStateString) : []
});

render(
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>,
    document.getElementById('app')
);
