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
    Button,
    IconButton,
    Grid,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    formControl: {
        padding: theme.spacing(1),
        minWidth: 120
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(3, 0)
    },
    fieldArraysPaper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2, 0),
        backgroundColor: theme.palette.background.default
    },
    formGroup: {
        flexDirection: 'row',
        flexWrap: 'nowrap'
    },
    checkbox: {
        padding: theme.spacing(1, 2),
        justifyContent: 'center',
        height: '100%'
    }
}));

const FormField = ({ inputDef, fieldArrays }) => {
    const { register, handleChange, errors, control } = useFormContext();
    const classes = useStyles();
    let { inputType, name, label, validationObj, fields, options, defaultValue } = inputDef;
    switch (inputType) {
        case 'section':
            return (
                <Paper className={classes.paper} variant='outlined'>
                    {label && (
                        <Typography id={name + '-label'} variant='subtitle1'>
                            {label}
                        </Typography>
                    )}
                    {fields.map((field, index) => (
                        <FormField key={index} inputDef={field} fieldArrays={fieldArrays} />
                    ))}
                </Paper>
            );
        case 'row':
            return (
                <Grid container>
                    {fields.map((field, index) => (
                        <Grid key={index} item {...(inputDef.itemSize != null ? { xs: inputDef.itemSize } : {})}>
                            <FormField inputDef={field} fieldArrays={fieldArrays} />
                        </Grid>
                    ))}
                </Grid>
            );
        case 'text':
            return (
                <FormControl className={classes.formControl} fullWidth>
                    <TextField
                        name={name}
                        label={label}
                        variant='outlined'
                        inputRef={register(validationObj)}
                        onChange={handleChange}
                        defaultValue={defaultValue}
                    />
                    <FormHelperText>
                        {errors[name] != null ? <span> {VALIDATION_MESSAGES[errors[name].type]}</span> : ''}
                    </FormHelperText>
                </FormControl>
            );
        case 'checkbox':
            return (
                <FormControl className={(classes.formControl, classes.checkbox)} fullWidth>
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
                    />
                    <FormHelperText>
                        {errors[name] != null ? <span> {VALIDATION_MESSAGES[errors[name].type]}</span> : ''}
                    </FormHelperText>
                </FormControl>
            );
        case 'select':
            return (
                <FormControl className={classes.formControl} fullWidth>
                    <Controller
                        render={({ onChange, onBlur, value }) => (
                            <FormControl component='fieldset'>
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
                    />
                    <FormHelperText>
                        {errors[name] != null ? <span> {VALIDATION_MESSAGES[errors[name].type]}</span> : ''}
                    </FormHelperText>
                </FormControl>
            );
        case 'radioButton':
            return (
                <FormControl className={classes.formControl} fullWidth>
                    <Controller
                        render={({ onChange, onBlur, value }) => (
                            <FormControl component='fieldset'>
                                {label && <FormLabel component='legend'>{label}</FormLabel>}
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
                        {errors[name] != null ? <span> {VALIDATION_MESSAGES[errors[name].type]}</span> : ''}
                    </FormHelperText>
                </FormControl>
            );
        case 'fieldGroupArray': {
            return (
                <Paper className={classes.fieldArraysPaper} variant='outlined'>
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
                            fieldArrays[name].append();
                            handleChange();
                        }}
                    >
                        Add
                    </Button>
                    {fieldArrays[name] && fieldArrays[name].fields.length > 0 && (
                        <FormControl className={classes.formControl} fullWidth>
                            {fieldArrays[name].fields.map((field, index) => {
                                return (
                                    <FormGroup key={field.id} className={classes.formGroup}>
                                        {Object.keys(fields).map((x, i) => (
                                            <FormField
                                                key={i}
                                                inputDef={{ ...fields[x], name: `${name}[${index}].${fields[x].name}` }}
                                                fieldArrays={fieldArrays}
                                            />
                                        ))}
                                        <IconButton
                                            type='button'
                                            onClick={() => {
                                                fieldArrays[name].remove(index);
                                                handleChange();
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </FormGroup>
                                );
                            })}
                        </FormControl>
                    )}
                </Paper>
            );
        }
    }
};

FormField.propTypes = {
    inputDef: PropTypes.object.isRequired,
    fieldArrays: PropTypes.object
};

export default FormField;
