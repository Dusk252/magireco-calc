import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { VALIDATION_MESSAGES } from '../../constants/const';
import { FormControl, FormControlLabel, FormHelperText, Checkbox, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        minWidth: 120
    },
    checkbox: {
        padding: theme.spacing(1, 2),
        justifyContent: 'center',
        height: '100%'
    }
}));

const CheckboxInput = ({ name, label, defaultValue, validationObj, ...otherProps }) => {
    const classes = useStyles();
    const { handleChange, errors, control } = useFormContext();
    return (
        <FormControl className={(classes.root, classes.checkbox)} fullWidth {...otherProps}>
            <Controller
                render={({ onChange, onBlur, value }) => (
                    <FormControlLabel
                        control={<Checkbox color='primary' />}
                        label={label}
                        onBlur={onBlur}
                        onChange={(e) => {
                            onChange(e.target.checked);
                            handleChange();
                        }}
                        checked={value}
                        defaultValue={defaultValue}
                    />
                )}
                name={name}
                control={control}
                rules={validationObj ?? {}}
            />
            <FormHelperText>
                {errors[name] != null ? <span> {VALIDATION_MESSAGES[errors[name].type]}</span> : ''}
            </FormHelperText>
        </FormControl>
    );
};

CheckboxInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    defaultValue: PropTypes.bool,
    validationObj: PropTypes.object
};

export default CheckboxInput;
