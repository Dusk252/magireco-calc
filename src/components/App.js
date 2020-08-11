import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import DamageCalcPage from './DamageCalcPage';
import MpCalcPage from './MpCalcPage';
import { ThemeProvider, createMuiTheme, CssBaseline, AppBar } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#f6a5c0',
            main: '#f48fb1',
            dark: '#aa647b'
        }
    },
    props: {
        MuiInputLabel: {
            shrink: true,
            disableAnimation: true
        }
    }
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AppBar className='horiz-menu' color='default'>
                    <Link style={{ color: theme.palette.primary.main, textDecoration: 'none' }} to='/dmg'>
                        ダメージ計算
                    </Link>
                    <Link style={{ color: theme.palette.primary.main, textDecoration: 'none' }} to='/mp'>
                        MP計算
                    </Link>
                    <Link style={{ color: theme.palette.primary.main, textDecoration: 'none' }} to='/about'>
                        About
                    </Link>
                </AppBar>
                <div style={{ paddingTop: '50px' }}>
                    <Switch>
                        <Route exact path='/'>
                            <Redirect to='/dmg' />
                        </Route>
                        <Route exact path='/dmg'>
                            <DamageCalcPage />
                        </Route>
                        <Route exact path='/mp'>
                            <MpCalcPage />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
