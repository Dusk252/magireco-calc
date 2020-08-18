import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
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
                alignItems: 'center',
                '&& a': {
                    padding: '16px'
                }
            },
            positionFixed: {
                top: 'auto'
            }
        },
        MuiTabs: {
            root: {
                minHeight: '40px'
            }
        },
        MuiTab: {
            root: {
                minHeight: '40px'
            }
        },
        MuiTabScrollButton: {
            root: {
                backgroundColor: '#fff'
            }
        },
        MuiDisabled: {
            color: 'rgba(255, 255, 255, 0.3)'
        },
        MuiInputBase: {
            root: {
                '&$disabled': {
                    '&& .MuiInputAdornment-root .MuiTypography-colorTextSecondary': {
                        color: 'inherit'
                    }
                }
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
        },
        MuiSelect: {
            select: {
                '&$outlined&:focus': {
                    backgroundColor: '#424242'
                }
            }
        },
        MuiFormHelperText: {
            root: {
                lineHeight: '1.2',
                height: '1.2em'
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
