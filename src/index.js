import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import configureStore from './redux/store';
import { Provider as ReduxProvider } from 'react-redux';

localStorage.removeItem('mpFormTabsState');

const storedMpStateString = localStorage.getItem('mpFormTabsState');
const storedDmgStateString = localStorage.getItem('dmgFormStateString');

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
