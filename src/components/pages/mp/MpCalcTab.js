import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Container, Grid, Button, makeStyles } from '@material-ui/core';
import {
    FormSection,
    TextInput,
    SelectInput,
    CheckboxInput,
    FieldArrayWrapper,
    FieldArrayElement
} from '../../forms/FormComponents';
import { mpUp as mpUpCalc, accelMpUp as accelMpUpCalc } from '../../../utils/memoriaCalcs';
import { mpCalc } from '../../../utils/mpCalcs';
import * as constants from '../../../constants/const';
import * as mpConstants from '../../../constants/mpConst';
import ResultsDisplay from '../../ResultsDisplay';

const MpFormInit = {
    mpUpPa: 0,
    accelMpUpPa: 0,
    defMpUpPa: 0,
    chargeCount: 0,
    accelCombo: false,
    charType: 'magia',
    discType: 'accel',
    discSlot: '1',
    accelMpUpMemoria: [],
    mpUpMemoria: []
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        width: '100%'
    }
}));

const MpCalcTab = ({ index, tabInfo, onFormChange }) => {
    const formValues = tabInfo.formState ?? MpFormInit;
    const [isDirty, setDirty] = useState(false);
    const [results, setResults] = useState(null);

    const classes = useStyles();

    const handleChange = () => {
        setDirty(true);
    };

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

    const { getValues, ...formMethods } = useForm({
        defaultValues: formValues
    });
    formMethods.handleChange = handleChange;

    const accelMpUpMemoria = useFieldArray({
        control: formMethods.control,
        name: 'accelMpUpMemoria'
    });

    const mpUpMemoria = useFieldArray({
        control: formMethods.control,
        name: 'mpUpMemoria'
    });

    const reduceIfExists = (array, operation) => {
        return array == null
            ? 0
            : array.reduce((sum, entry) => {
                  return sum + operation(Number(entry.amount));
              }, 0);
    };

    const calculateResults = (data) => {
        const accelMpUpPa = Number(data.accelMpUpPa) * 0.01 + reduceIfExists(data.accelMpUpMemoria, accelMpUpCalc);
        const mpUpPa = Number(data.mpUpPa) * 0.01 + reduceIfExists(data.mpUpMemoria, mpUpCalc);
        const mpTotal = mpCalc(
            data.accelCombo,
            data.discSlot,
            data.discType,
            data.charType,
            mpUpPa,
            accelMpUpPa,
            Number(data.chargeCount)
        );
        setResults({
            interimResults: [
                {
                    label: 'AccelMPUP倍率',
                    res: {
                        value: accelMpUpPa * 100,
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
        });
    };

    return (
        <Container maxWidth='md'>
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)} autoComplete='off'>
                    <FormSection>
                        <Grid container>
                            <Grid item xs={4}>
                                <SelectInput
                                    name='discType'
                                    label='ディスク種類'
                                    options={Object.keys(mpConstants.INITIAL_VALUES).map((key) => ({
                                        value: key,
                                        text: mpConstants.INITIAL_VALUES[key].text
                                    }))}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectInput name='discSlot' label='ディスク位置' options={mpConstants.DISC_SLOT_DROPDOWN} />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectInput
                                    name='charType'
                                    label='キャラクタータイプ'
                                    options={mpConstants.CHAR_TYPES_DROPDOWN}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
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
                                <CheckboxInput name='accelCombo' label='Accelコンボ' />
                            </Grid>
                        </Grid>
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
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextInput
                                    name='accelMpUpPa'
                                    label='AccelMPUP倍率'
                                    validationObj={{
                                        required: true,
                                        validate: {
                                            isNumber: (value) => !isNaN(Number(value))
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </FormSection>
                    <FormSection label='メモリアを追加'>
                        <FieldArrayWrapper name='accelMpUpMemoria' label='AccelMPUPメモリア' fieldArray={accelMpUpMemoria}>
                            {accelMpUpMemoria.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={accelMpUpMemoria} index={index}>
                                    <SelectInput
                                        name={`accelMpUpMemoria[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: 'AccelMPUP' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={1}
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
                                        defaultValue={1}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                    </FormSection>
                    <Button className={classes.root} type='submit' color='primary' variant='contained'>
                        Submit
                    </Button>
                </form>
            </FormProvider>
            {results && <ResultsDisplay {...results} />}
        </Container>
    );
};

MpCalcTab.propTypes = {
    index: PropTypes.any.isRequired,
    tabInfo: PropTypes.object.isRequired,
    onFormChange: PropTypes.func.isRequired
};

export default MpCalcTab;
