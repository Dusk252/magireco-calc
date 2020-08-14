import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Container, Grid, Button, Typography, InputAdornment, makeStyles } from '@material-ui/core';
import {
    FormSection,
    TextInput,
    SelectInput,
    CheckboxInput,
    FieldArrayWrapper,
    FieldArrayElement
} from '../../forms/FormComponents';
import { mpUp as mpUpMemoriaCalc, acceleMpUp as acceleMpUpMemoriaCalc } from '../../../utils/memoriaCalcs';
import { mpUp as mpUpConnectCalc, acceleMpUp as acceleMpUpConnectCalc } from '../../../utils/connectCalcs';
import { mpCalc } from '../../../utils/mpCalcs';
import * as constants from '../../../constants/const';
import * as mpConstants from '../../../constants/mpConst';
import ResultsDisplay from '../../ResultsDisplay';

const MpFormInit = {
    mpUpPa: 0,
    acceleMpUpPa: 0,
    defMpUpPa: 0,
    chargeCount: 0,
    acceleBonus: false,
    mirrors: false,
    charType: 'magia',
    discType: 'accele',
    discSlot: '1',
    acceleMpUpMemoria: [],
    mpUpMemoria: [],
    acceleMpUpConnects: [],
    mpUpConnects: []
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        width: '100%'
    }
}));

const MpCalcTab = ({ index, tabInfo, onFormChange, onFormSubmit }) => {
    //objects are merged so we can keep the user's localstorage even when new fields are added
    const formValues = tabInfo.formState != null ? { ...MpFormInit, ...tabInfo.formState } : MpFormInit;
    const [isDirty, setDirty] = useState(false);

    const classes = useStyles();

    const { getValues, ...formMethods } = useForm({
        defaultValues: formValues
    });

    const handleChange = () => {
        setDirty(true);
    };
    formMethods.handleChange = handleChange;

    const acceleMpUpMemoria = useFieldArray({
        control: formMethods.control,
        name: 'acceleMpUpMemoria'
    });

    const mpUpMemoria = useFieldArray({
        control: formMethods.control,
        name: 'mpUpMemoria'
    });

    const acceleMpUpConnects = useFieldArray({
        control: formMethods.control,
        name: 'acceleMpUpConnects'
    });

    const mpUpConnects = useFieldArray({
        control: formMethods.control,
        name: 'acceleMpUpConnects'
    });

    const onSubmit = (data) => {
        calculateResults(data);
    };

    useEffect(() => {
        if (isDirty) {
            const timeout = setTimeout(() => {
                onFormChange(getValues(), index);
                setDirty(false);
            }, 500);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isDirty, getValues, onFormChange, index]);

    const reduceIfExists = (array, operation) => {
        return array == null
            ? 0
            : array.reduce((sum, entry) => {
                  return sum + operation(Number(entry.amount));
              }, 0);
    };

    const calculateResults = (data) => {
        const acceleMpUpPa =
            Number(data.acceleMpUpPa) * 0.01 +
            reduceIfExists(data.acceleMpUpMemoria, acceleMpUpMemoriaCalc) +
            reduceIfExists(data.acceleMpUpConnects, acceleMpUpConnectCalc);
        const mpUpPa =
            Number(data.mpUpPa) * 0.01 +
            reduceIfExists(data.mpUpMemoria, mpUpMemoriaCalc) +
            reduceIfExists(data.mpUpConnects, mpUpConnectCalc);
        const mpTotal = mpCalc(
            data.acceleBonus,
            data.mirrors,
            data.discSlot,
            data.discType,
            data.charType,
            mpUpPa,
            acceleMpUpPa,
            Number(data.chargeCount)
        );
        onFormSubmit(
            {
                interimResults: [
                    {
                        label: 'Accel MPUP倍率',
                        res: {
                            value: acceleMpUpPa * 100,
                            postfix: '%'
                        }
                    },
                    {
                        label: 'MP獲得量UP倍率',
                        res: {
                            value: mpUpPa * 100,
                            postfix: '%'
                        }
                    }
                ],
                finalResult: {
                    label: '合計獲得MP',
                    res: {
                        value: mpTotal
                    }
                }
            },
            index
        );
    };

    return (
        <Container maxWidth='md'>
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)} autoComplete='off'>
                    <FormSection>
                        <Grid container>
                            <Grid item xs={4}>
                                <SelectInput name='discType' label='ディスク種類' options={mpConstants.DISC_TYPE_DROPDOWN} />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectInput name='discSlot' label='ディスク位置' options={constants.DISC_SLOT_DROPDOWN} />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectInput
                                    name='charType'
                                    label='キャラクタータイプ'
                                    options={mpConstants.CHAR_TYPE_DROPDOWN}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextInput
                                    name='chargeCount'
                                    label='チャージ数'
                                    validationObj={{
                                        required: true,
                                        validate: {
                                            isInteger: (value) => Number.isInteger(Number(value))
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <CheckboxInput name='acceleBonus' label='初手Acceleボーナス' />
                            </Grid>
                            <Grid item xs={4}>
                                <CheckboxInput name='mirrors' label='ミラーズ' />
                            </Grid>
                        </Grid>
                    </FormSection>
                    <FormSection
                        label='メモリア'
                        collapse
                        open={acceleMpUpMemoria.fields.length > 0 || mpUpMemoria.fields.length > 0}
                    >
                        <FieldArrayWrapper
                            name='acceleMpUpMemoria'
                            label='Accel MPUPメモリア'
                            fieldArray={acceleMpUpMemoria}
                        >
                            {acceleMpUpMemoria.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={acceleMpUpMemoria} index={index}>
                                    <SelectInput
                                        name={`acceleMpUpMemoria[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: 'Accel MPUP' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                        <FieldArrayWrapper name='mpUpMemoria' label='MP獲得量UPメモリア' fieldArray={mpUpMemoria}>
                            {mpUpMemoria.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={mpUpMemoria} index={index}>
                                    <SelectInput
                                        name={`mpUpMemoria[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: 'MP獲得量UP' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                    </FormSection>
                    <FormSection
                        label='コネクト'
                        collapse
                        open={acceleMpUpConnects.fields.length > 0 || mpUpConnects.fields.length > 0}
                    >
                        <FieldArrayWrapper
                            name='acceleMpUpConnects'
                            label='Accel MPUPコネクト'
                            fieldArray={acceleMpUpConnects}
                        >
                            {acceleMpUpConnects.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={acceleMpUpConnects} index={index}>
                                    <SelectInput
                                        name={`acceleMpUpConnects[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: 'Accel MPUP' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                        <FieldArrayWrapper name='mpUpConnects' label='MP獲得量UPコネクト' fieldArray={mpUpConnects}>
                            {mpUpConnects.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={mpUpConnects} index={index}>
                                    <SelectInput
                                        name={`mpUpConnects[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: 'MP獲得量UP' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                    </FormSection>
                    <FormSection label='倍率としての入力'>
                        <Typography variant='body2'>
                            ※メモリアやコネクトを入力した場合、この数字がそれで計算された倍率に足されます。
                        </Typography>
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
                                />
                            </Grid>
                        </Grid>
                    </FormSection>
                    <Button className={classes.root} type='submit' color='primary' variant='contained'>
                        Submit
                    </Button>
                </form>
            </FormProvider>
            {tabInfo.results && <ResultsDisplay {...tabInfo.results} />}
        </Container>
    );
};

MpCalcTab.propTypes = {
    index: PropTypes.any.isRequired,
    tabInfo: PropTypes.object.isRequired,
    onFormChange: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired
};

export default MpCalcTab;
