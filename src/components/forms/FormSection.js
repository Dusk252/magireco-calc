import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        margin: theme.spacing(3, 0)
    }
}));

const FormSection = ({ label, children }) => {
    const classes = useStyles();
    return (
        <Paper className={classes.root} variant='outlined'>
            {label && (
                <Typography id={name + '-label'} variant='subtitle1'>
                    {label}
                </Typography>
            )}
            {children}
        </Paper>
    );
};

FormSection.propTypes = {
    label: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default FormSection;
