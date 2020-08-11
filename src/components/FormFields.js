import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { VALIDATION_MESSAGES } from '../utils/const';
import {
    Paper,
    FormGroup,
    FormLabel,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Checkbox,
    InputLabel,
    Select,
    MenuItem,
    RadioGroup,
    Radio,
    TextField,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

const FormFields = ({ inputDefs, fieldArrays }) => {
    const { register, handleChange, errors, control } = useFormContext();
    const classes = useStyles();

    return (
        <>
            {inputDefs.map((item, index) => {
                let { inputType, name, label, validationObj, fields, options, defaultValue } = item;
                switch (inputType) {
                    case 'section':
                        return (
                            <Paper key={index} variant='outlined'>
                                <FormFields inputDefs={fields} />
                            </Paper>
                        );
                    case 'text':
                        return (
                            <FormControl key={index} className={classes.formControl}>
                                <TextField
                                    name={name}
                                    label={label}
                                    variant='outlined'
                                    inputRef={register(validationObj)}
                                    onChange={handleChange}
                                    defaultValue={defaultValue}
                                />
                                <FormHelperText>
                                    {errors[name] != null ? (
                                        <span key={index}> {VALIDATION_MESSAGES[errors[name].type]}</span>
                                    ) : (
                                        ''
                                    )}
                                </FormHelperText>
                            </FormControl>
                        );
                    case 'checkbox':
                        return (
                            <FormControl key={index} className={classes.formControl}>
                                <Controller
                                    render={({ onChange, onBlur, value }) => (
                                        <FormControlLabel
                                            control={<Checkbox />}
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
                                />
                                <FormHelperText>
                                    {errors[name] != null ? (
                                        <span key={index}> {VALIDATION_MESSAGES[errors[name].type]}</span>
                                    ) : (
                                        ''
                                    )}
                                </FormHelperText>
                            </FormControl>
                        );
                    case 'select':
                        return (
                            <FormControl key={index} className={classes.formControl}>
                                <Controller
                                    key={index}
                                    render={({ onChange, onBlur, value }) => (
                                        <FormControl component='fieldset'>
                                            <InputLabel id={name + '-label'}>{label}</InputLabel>
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
                                />
                                <FormHelperText>
                                    {errors[name] != null ? (
                                        <span key={index}> {VALIDATION_MESSAGES[errors[name].type]}</span>
                                    ) : (
                                        ''
                                    )}
                                </FormHelperText>
                            </FormControl>
                        );
                    case 'radioButton':
                        return (
                            <FormControl key={index} className={classes.formControl}>
                                <Controller
                                    render={({ onChange, onBlur, value }) => (
                                        <FormControl component='fieldset'>
                                            <FormLabel component='legend'>{label}</FormLabel>
                                            <RadioGroup
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
                                                            control={<Radio />}
                                                            label={opt.text}
                                                        />
                                                    );
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                    )}
                                    name={name}
                                    control={control}
                                />
                                <FormHelperText>
                                    {errors[name] != null ? (
                                        <span key={index}> {VALIDATION_MESSAGES[errors[name].type]}</span>
                                    ) : (
                                        ''
                                    )}
                                </FormHelperText>
                            </FormControl>
                        );
                    case 'fieldGroupArray': {
                        return (
                            <FormControl key={index} className={classes.formControl}>
                                {fieldArrays[name] &&
                                    fieldArrays[name].fields.map((field, index) => {
                                        return (
                                            <FormGroup key={field.id}>
                                                <FormFields
                                                    inputDefs={Object.keys(fields).map((x) => {
                                                        return { ...fields[x], name: `${name}[${index}].${fields[x].name}` };
                                                    })}
                                                />
                                                <Button
                                                    type='button'
                                                    onClick={() => {
                                                        fieldArrays[name].remove(index);
                                                        handleChange();
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                            </FormGroup>
                                        );
                                    })}
                                <Button
                                    type='button'
                                    onClick={() => {
                                        fieldArrays[name].append();
                                        handleChange();
                                    }}
                                >
                                    Add
                                </Button>
                            </FormControl>
                        );
                    }
                }
            })}
        </>
    );
};

FormFields.propTypes = {
    inputDefs: PropTypes.array.isRequired,
    fieldArrays: PropTypes.object
};

export default FormFields;
