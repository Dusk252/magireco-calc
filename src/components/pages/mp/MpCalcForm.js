import React, { useEffect } from 'react';
import { useForm, useWatch, useFieldArray, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Grid, Button, InputAdornment, makeStyles } from '@material-ui/core';
import {
    FormSection,
    TextInput,
    SelectInput,
    CheckboxInput,
    FieldArrayWrapper,
    FieldArrayElement
} from '../../forms/FormComponents';
import * as constants from '../../../constants/const';
import * as mpConstants from '../../../constants/mpConst';

const MpFormInit = {
    mpUpPa: 0,
    acceleMpUpPa: 0,
    defMpUpPa: 0,
    mpUpOver100Pa: 0,
    chargeCount: 0,
    acceleBonus: false,
    mirrors: false,
    mpOver100: false,
    charType: constants.DISC_TYPE.MAGIA,
    discType: constants.DISC_TYPE.ACCELE,
    discSlot: '1',
    acceleMpUpMemoria: [],
    mpUpMemoria: [],
    acceleMpUpConnects: [],
    mpUpConnects: [],
    acceleMpUpSkill: [],
    mpUpSkill: [],
    mpUpOver100Skill: []
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        width: '100%'
    }
}));

const MpCalcForm = ({ index, formState, onFormChange, onSubmit }) => {
    //objects are merged so we can keep the user's localstorage even when new fields are added
    const formValues = formState != null ? { ...MpFormInit, ...formState } : MpFormInit;
    const classes = useStyles();

    const { ...formMethods } = useForm({
        defaultValues: formValues
    });

    const handleChange = () => {
        onFormChange(formMethods.getValues(), index);
    };
    formMethods.handleChange = handleChange;

    const watchDiscInfo = useWatch({
        name: ['discType', 'discSlot'],
        control: formMethods.control,
        defaultValue: { discType: formValues.discType, discSlot: formValues.discSlot }
    });

    const setValue = formMethods.setValue;
    const getValues = formMethods.getValues;
    useEffect(() => {
        if (watchDiscInfo.discSlot == 1) {
            if (watchDiscInfo.discType === constants.DISC_TYPE.ACCELE) setValue('acceleBonus', true);
            else setValue('acceleBonus', false);
            onFormChange(getValues(), index);
        }
    }, [watchDiscInfo, setValue, getValues, onFormChange, index]);

    const memoriaFieldArrays = [
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'acceleMpUpMemoria'
            }),
            name: 'acceleMpUpMemoria',
            label: 'Accel MPUP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'mpUpMemoria'
            }),
            name: 'mpUpMemoria',
            label: 'MP獲得量UP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        }
    ];

    const connectFieldArrays = [
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'acceleMpUpConnects'
            }),
            name: 'acceleMpUpConnects',
            label: 'Accel MPUP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'mpUpConnects'
            }),
            name: 'mpUpConnects',
            label: 'MP獲得量UP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        }
    ];

    const seishinKyoukaFieldArrays = [
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'acceleMpUpSkill'
            }),
            name: 'acceleMpUpSkill',
            label: 'Accel MPUP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'mpUpSkill'
            }),
            name: 'mpUpSkill',
            label: 'MP獲得量UP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'mpUpOver100Skill'
            }),
            name: 'mpUpOver100Skill',
            label: 'MP100以上時MP獲得量UP',
            optionValues: Array.from(Array(4), (_, i) => i + 1)
        }
    ];

    const memoriaFieldArraysLen = memoriaFieldArrays.reduce((sum, el) => sum + el.array.fields.length, 0);
    const connectFieldArraysLen = connectFieldArrays.reduce((sum, el) => sum + el.array.fields.length, 0);
    const seishinKyoukaFieldArraysLen = seishinKyoukaFieldArrays.reduce((sum, el) => sum + el.array.fields.length, 0);

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)} autoComplete='off'>
                <FormSection title='基本情報'>
                    <Grid container>
                        <Grid item xs={4} md={3}>
                            <SelectInput
                                name='discType'
                                label='ディスク種類'
                                options={mpConstants.DISC_TYPE_DROPDOWN}
                                variant='outlined'
                                showErrors
                            />
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <SelectInput
                                name='discSlot'
                                label='ディスク位置'
                                options={constants.DISC_SLOT_DROPDOWN}
                                variant='outlined'
                                showErrors
                            />
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <SelectInput
                                name='charType'
                                label='キャラクタータイプ'
                                variant='outlined'
                                options={mpConstants.CHAR_TYPE_DROPDOWN}
                                showErrors
                            />
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <TextInput
                                name='chargeCount'
                                label='チャージ数'
                                validationObj={{
                                    required: true,
                                    validate: {
                                        isInteger: (value) => Number.isInteger(Number(value))
                                    }
                                }}
                                inputProps={{
                                    maxLength: 2
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <CheckboxInput
                                name='acceleBonus'
                                label='初手Acceleボーナス'
                                disabled={
                                    watchDiscInfo.discType !== constants.DISC_TYPE.ACCELE && watchDiscInfo.discSlot == 1
                                }
                            />
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <CheckboxInput name='mirrors' label='ミラーズ' />
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <CheckboxInput name='mpOver100' label='MP100以上' />
                        </Grid>
                    </Grid>
                </FormSection>
                <FormSection title='メモリア' numItems={memoriaFieldArraysLen} collapse open={memoriaFieldArraysLen > 0}>
                    {memoriaFieldArrays.map((element, index) => (
                        <FieldArrayWrapper key={index} name={element.name} label={element.label} fieldArray={element.array}>
                            {element.array.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={element.array} index={index}>
                                    <SelectInput
                                        name={`${element.name}[${index}].amount`}
                                        options={Array.from(element.optionValues, (i) => {
                                            return {
                                                value: i.toString(),
                                                text: element.label + ' ' + constants.ROMAN_NUMERALS[i]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                    ))}
                </FormSection>
                <FormSection title='コネクト' numItems={connectFieldArraysLen} collapse open={connectFieldArraysLen > 0}>
                    {connectFieldArrays.map((element, index) => (
                        <FieldArrayWrapper key={index} name={element.name} label={element.label} fieldArray={element.array}>
                            {element.array.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={element.array} index={index}>
                                    <SelectInput
                                        name={`${element.name}[${index}].amount`}
                                        options={Array.from(element.optionValues, (i) => {
                                            return {
                                                value: i.toString(),
                                                text: element.label + ' ' + constants.ROMAN_NUMERALS[i]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                    ))}
                </FormSection>
                <FormSection
                    title='精神強化'
                    numItems={seishinKyoukaFieldArraysLen}
                    collapse
                    open={seishinKyoukaFieldArraysLen > 0}
                >
                    {seishinKyoukaFieldArrays.map((element, index) => (
                        <FieldArrayWrapper key={index} name={element.name} label={element.label} fieldArray={element.array}>
                            {element.array.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={element.array} index={index}>
                                    <SelectInput
                                        name={`${element.name}[${index}].amount`}
                                        options={Array.from(element.optionValues, (i) => {
                                            return {
                                                value: i.toString(),
                                                text: element.label + ' ' + constants.ROMAN_NUMERALS[i]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                    ))}
                </FormSection>
                <FormSection
                    title='倍率としての入力'
                    subtitle='※メモリアやコネクトを入力した場合、この数字がそれで計算された倍率に足されます。'
                >
                    <Grid container>
                        <Grid item xs={4}>
                            <TextInput
                                name='mpUpPa'
                                label='MP獲得量UP倍率'
                                validationObj={{
                                    required: true,
                                    validate: {
                                        isNumber: (value) => !isNaN(Number(value))
                                    }
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>%</InputAdornment>
                                }}
                                inputProps={{
                                    maxLength: 6
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                name='acceleMpUpPa'
                                label='AccelMPUP倍率'
                                validationObj={{
                                    required: true,
                                    validate: {
                                        isNumber: (value) => !isNaN(Number(value))
                                    }
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>%</InputAdornment>
                                }}
                                inputProps={{
                                    maxLength: 6
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                name='mpUpOver100Pa'
                                label='MP100以上時MP獲得量'
                                validationObj={{
                                    required: true,
                                    validate: {
                                        isNumber: (value) => !isNaN(Number(value))
                                    }
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>%</InputAdornment>
                                }}
                                inputProps={{
                                    maxLength: 6
                                }}
                            />
                        </Grid>
                    </Grid>
                </FormSection>
                <Button className={classes.root} type='submit' color='primary' variant='contained'>
                    Submit
                </Button>
            </form>
        </FormProvider>
    );
};

MpCalcForm.propTypes = {
    index: PropTypes.any.isRequired,
    formState: PropTypes.object,
    onFormChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default MpCalcForm;
