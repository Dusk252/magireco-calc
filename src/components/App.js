import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import DmgCalcPage from './pages/dmg/DmgCalcPage';
import MpCalcPage from './pages/mp/MpCalcPage';
import { ThemeProvider, createMuiTheme, CssBaseline, AppBar, makeStyles } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#f6a5c0',
            main: '#f48fb1',
            dark: '#aa647b'
        },
        secondary: {
            light: '#fdedf2',
            main: '#fff',
            dark: '#764656'
        }
    },
    overrides: {
        MuiAppBar: {
            root: {
                flexDirection: 'row',
                '&& a': {
                    padding: '16px'
                }
            }
        },
        MuiTabScrollButton: {
            root: {
                backgroundColor: '#fff'
            }
        },
        MuiInputLabel: {
            root: {
                display: 'inline-block'
            },
            shrink: {
                transform: 'translate(0, 1.5px) scale(1)',
                fontSize: '0.75rem'
            },
            outlined: {
                '&$shrink': {
                    transform: 'translate(14px, -6px) scale(1)',
                    background: '#424242',
                    border: 'solid 5px #424242',
                    borderTop: '0',
                    left: '-3px'
                }
            }
        },
        MuiTypography: {
            body2: {
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.75rem',
                marginBottom: '12px'
            }
        }
        // MuiListItem: {
        //     root: {
        //         '&$selected, &$selected:hover': {
        //             backgroundColor: '#f48fb1'
        //         }
        //     }
        // }
    },
    props: {
        MuiInputLabel: {
            shrink: true,
            disableAnimation: true
        },
        MuiButtonBase: {
            disableRipple: true
        }
    }
});

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
                <div style={{ paddingTop: '50px' }}>
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
