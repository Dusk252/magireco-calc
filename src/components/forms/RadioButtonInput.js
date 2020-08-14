import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { VALIDATION_MESSAGES } from '../../constants/const';
import { FormControl, FormControlLabel, FormLabel, FormHelperText, RadioGroup, Radio, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        height: '100%',
        minWidth: 120
    },
    radioGroup: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center'
    },
    formControlLabel: {
        '&:last-child': {
            marginRight: theme.spacing(0)
        }
    }
}));

const RadioButtonInput = ({ name, label, defaultValue, options, validationObj }) => {
    const classes = useStyles();
    const { handleChange, errors, control } = useFormContext();
    return (
        <FormControl className={classes.root} fullWidth>
            <Controller
                render={({ onChange, onBlur, value }) => (
                    <FormControl className={classes.radioGroup} component='fieldset'>
                        {label && <FormLabel component='legend'>{label}</FormLabel>}
                        <RadioGroup
                            className={classes.radioGroup}
                            aria-label={name}
                            name={name}
                            onChange={(e) => {
                                onChange(e);
                                handleChange();
                            }}
                            onBlur={onBlur}
                            value={value ?? defaultValue}
                            defaultValue={defaultValue}
                        >
                            {options.map((opt, index) => {
                                return (
                                    <FormControlLabel
                                        value={opt.value}
                                        key={index}
                                        control={<Radio color='primary' />}
                                        label={opt.text}
                                        className={classes.formControlLabel}
                                    />
                                );
                            })}
                        </RadioGroup>
                    </FormControl>
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

RadioButtonInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.array.isRequired,
    validationObj: PropTypes.object
};

export default RadioButtonInput;
