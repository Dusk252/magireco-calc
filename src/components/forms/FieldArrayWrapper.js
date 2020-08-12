import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { Paper, InputLabel, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        margin: theme.spacing(2, 0),
        backgroundColor: theme.palette.background.default
    }
}));

const FieldArrayWrapper = ({ name, label, fieldArray, children }) => {
    const classes = useStyles();
    const { handleChange } = useFormContext();
    return (
        <Paper className={classes.root} variant='outlined'>
            {label && (
                <InputLabel id={name + '-label'} component='span'>
                    {label}
                </InputLabel>
            )}
            <Button
                type='button'
                variant='outlined'
                color='primary'
                onClick={() => {
                    fieldArray.append();
                    handleChange();
                }}
            >
                Add
            </Button>
            {children}
        </Paper>
    );
};

FieldArrayWrapper.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    fieldArray: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
};

export default FieldArrayWrapper;
