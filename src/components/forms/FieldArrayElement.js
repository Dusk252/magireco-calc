import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { FormGroup, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
    root: {
        flexDirection: 'row',
        flexWrap: 'nowrap'
    }
}));

const FieldArrayElement = ({ index, fieldArray, children }) => {
    const classes = useStyles();
    const { handleChange } = useFormContext();
    return (
        <FormGroup className={classes.root}>
            {children}
            <IconButton
                type='button'
                onClick={() => {
                    fieldArray.remove(index);
                    handleChange();
                }}
            >
                <DeleteIcon />
            </IconButton>
        </FormGroup>
    );
};

FieldArrayElement.propTypes = {
    index: PropTypes.number.isRequired,
    fieldArray: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
};

export default FieldArrayElement;