import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import DmgCalcPage from './pages/dmg/DmgCalcPage';
import MpCalcPage from './pages/mp/MpCalcPage';
import { ThemeProvider, CssBaseline, AppBar, makeStyles } from '@material-ui/core';
import { theme } from '../theme';

const useStyles = makeStyles(() => ({
    root: {
        justifyContent: 'flex-end'
    }
}));

const App = () => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AppBar color='default' className={classes.root}>
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
                <div style={{ paddingTop: '52px' }}>
                    <Switch>
                        <Route exact path='/'>
                            <Redirect to='/dmg' />
                        </Route>
                        <Route exact path='/dmg'>
                            <DmgCalcPage />
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
