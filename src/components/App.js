import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import DmgCalcPage from './pages/dmg/DmgCalcPage';
import MpCalcPage from './pages/mp/MpCalcPage';
import AboutPage from './pages/about/AboutPage';
import { ThemeProvider, CssBaseline, AppBar, makeStyles, Typography, Box } from '@material-ui/core';
import { theme } from '../theme';
import Logo from '../img/magireco-keisanki.svg';

const useStyles = makeStyles(() => ({
    root: {
        justifyContent: 'flex-end'
    },
    imageIcon: {
        height: '100%'
    }
}));

const App = () => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AppBar color='default' className={classes.root}>
                    <Box display='flex' alignItems='center' height='64px' mr='auto' px={2}>
                        <Logo width={35} height={35} viewBox='0 0 570 570' />
                        <Box pl={1}>
                            <Typography variant='h5' color='primary'>
                                マギレコ Calculator
                            </Typography>
                        </Box>
                    </Box>
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
                <div style={{ paddingTop: '64px', paddingBottom: '44px', minHeight: 'calc(100vh - 60px)' }}>
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
                        <Route exact path='/about'>
                            <AboutPage />
                        </Route>
                    </Switch>
                </div>
                <AppBar color='default' position='static'>
                    <Box width='100%' justifyContent='center' p={2}>
                        <Typography variant='subtitle1' align='center'>
                            &copy; {new Date().getFullYear()} MagiReco Calculator by Dusk252
                        </Typography>
                    </Box>
                </AppBar>
            </Router>
        </ThemeProvider>
    );
};

export default App;
