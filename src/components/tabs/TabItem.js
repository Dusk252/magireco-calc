import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Tab, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    tab: {
        textAlign: 'left',
        height: '40px',
        '&& span': {
            alignItems: 'flex-start'
        }
    },
    iconButton: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
        fontSize: '1.1rem',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.common.white
        },
        padding: theme.spacing(0.5)
    },
    svgIcon: {
        fontSize: '1.1rem'
    }
}));

const TabItem = ({ label, index, handleRemove, ...a11yProps }) => {
    const classes = useStyles();
    return (
        <div>
            <Tab className={classes.tab} label={label} {...a11yProps} color='secondary' />
            <IconButton
                className={classes.iconButton}
                onClick={() => {
                    handleRemove(index);
                }}
            >
                <CloseIcon className={classes.svgIcon} />
            </IconButton>
        </div>
    );
};

export default TabItem;

TabItem.propTypes = {
    label: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    handleRemove: PropTypes.func
};
