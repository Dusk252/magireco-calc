import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { VALIDATION_MESSAGES } from '../../constants/const';
import { FormControl, InputLabel, FormHelperText, Select, MenuItem, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        minWidth: 120
    }
}));

const SelectInput = ({ name, label, defaultValue, options, validationObj, variant, showErrors = false, ...otherProps }) => {
    const classes = useStyles();
    const { handleChange, errors, control } = useFormContext();
    return (
        <FormControl className={classes.root} fullWidth>
            <Controller
                render={({ onChange, onBlur, value }) => (
                    <FormControl variant={variant} component='fieldset' {...otherProps}>
                        {label && <InputLabel id={name + '-label'}>{label}</InputLabel>}
                        <Select
                            labelId={name + '-label'}
                            id={name + '-select'}
                            onBlur={onBlur}
                            onChange={(e) => {
                                onChange(e);
                                handleChange();
                            }}
                            value={value ?? defaultValue}
                        >
                            {options.map((opt, index) => {
                                return (
                                    <MenuItem key={index} value={opt.value}>
                                        {opt.text}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                )}
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={validationObj ?? {}}
            />
            {showErrors && (
                <FormHelperText>
                    {errors[name] != null ? <span> {VALIDATION_MESSAGES[errors[name].type]}</span> : ''}
                </FormHelperText>
            )}
        </FormControl>
    );
};

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.array.isRequired,
    validationObj: PropTypes.object,
    variant: PropTypes.string,
    showErrors: PropTypes.bool
};

export default SelectInput;
