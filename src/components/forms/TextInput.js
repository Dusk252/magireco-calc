import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { VALIDATION_MESSAGES } from '../../constants/const';
import { TextField, FormControl, FormHelperText, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        minWidth: 120
    }
}));

const TextInput = ({ name, label, defaultValue, validationObj }) => {
    const classes = useStyles();
    const { register, handleChange, errors } = useFormContext();
    return (
        <FormControl className={classes.root} fullWidth>
            <TextField
                name={name}
                label={label ?? ''}
                variant='outlined'
                inputRef={register(validationObj ?? {})}
                onChange={handleChange}
                defaultValue={defaultValue}
            />
            <FormHelperText>
                {errors[name] != null ? <span> {VALIDATION_MESSAGES[errors[name].type]}</span> : ''}
            </FormHelperText>
        </FormControl>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    validationObj: PropTypes.object
};

export default TextInput;
