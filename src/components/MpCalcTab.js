import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Container, Button, makeStyles } from '@material-ui/core';
import FormField from './FormField';
import { mpUp as mpUpCalc, accelMpUp as accelMpUpCalc } from './../utils/memoriaCalcs';
import { mpCalc } from './../utils/mpCalcs';
import * as constants from './../utils/const';
import ResultsDisplay from './ResultsDisplay';

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

let accelMpUpMemoria, mpUpMemoria;

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        width: '100%'
    }
}));

const MpFormDef = [
    {
        inputType: 'section',
        fields: [
            {
                inputType: 'row',
                itemSize: 4,
                fields: [
                    {
                        inputType: 'select',
                        name: 'discType',
                        label: 'ディスク種類',
                        validationObj: null,
                        options: [
                            {
                                value: 'accel',
                                text: 'Accele'
                            },
                            {
                                value: 'blast',
                                text: 'Blast'
                            },
                            {
                                value: 'charge',
                                text: 'Charge'
                            }
                        ]
                    },
                    {
                        inputType: 'select',
                        name: 'discSlot',
                        label: 'ディスク位置',
                        validationObj: null,
                        options: [
                            {
                                value: '1',
                                text: '1手目'
                            },
                            {
                                value: '2',
                                text: '2手目'
                            },
                            {
                                value: '3',
                                text: '3手目'
                            }
                        ]
                    },
                    {
                        inputType: 'select',
                        name: 'charType',
                        label: 'キャラクタータイプ',
                        validationObj: null,
                        options: [
                            {
                                value: 'magia',
                                text: 'マギア'
                            },
                            {
                                value: 'support',
                                text: 'サポート'
                            },
                            {
                                value: 'attack',
                                text: 'アタック'
                            },
                            {
                                value: 'heal',
                                text: 'ヒール'
                            },
                            {
                                value: 'balance',
                                text: 'バランス'
                            },
                            {
                                value: 'defense',
                                text: 'ディフェンス'
                            }
                        ]
                    }
                ]
            },
            {
                inputType: 'row',
                itemSize: 4,
                fields: [
                    {
                        inputType: 'text',
                        name: 'chargeCount',
                        label: 'チャージ数',
                        validationObj: {
                            required: true,
                            validate: {
                                number: (value) => !isNaN(Number(value))
                            }
                        }
                    },
                    {
                        inputType: 'checkbox',
                        name: 'accelCombo',
                        label: 'Accelコンボ',
                        validationObj: null
                    }
                ]
            },
            {
                inputType: 'row',
                itemSize: 4,
                fields: [
                    {
                        inputType: 'text',
                        name: 'mpUpPa',
                        label: 'MP獲得量UP倍率',
                        validationObj: {
                            required: true,
                            validate: {
                                number: (value) => !isNaN(Number(value))
                            }
                        }
                    },
                    {
                        inputType: 'text',
                        name: 'accelMpUpPa',
                        label: 'AccelMPUP倍率',
                        validationObj: {
                            required: true,
                            validate: {
                                number: (value) => !isNaN(Number(value))
                            }
                        }
                    }
                ]
            }
        ]
    },
    {
        inputType: 'section',
        label: 'メモリアを追加',
        collapse: true,
        fields: [
            {
                inputType: 'fieldGroupArray',
                name: 'accelMpUpMemoria',
                label: 'AccelMPUPメモリア',
                fields: [
                    {
                        inputType: 'select',
                        name: 'amount',
                        label: '',
                        validationObj: null,
                        options: Array.from(Array(10), (_, i) => {
                            return {
                                value: (i + 1).toString(),
                                text: 'AccelMPUP' + constants.ROMAN_NUMERALS[i + 1]
                            };
                        }),
                        defaultValue: '1'
                    }
                    // ,
                    // {
                    //     inputType: 'select',
                    //     name: 'type',
                    //     label: '',
                    //     validationObj: null,
                    //     options: [
                    //         {
                    //             value: '0',
                    //             text: 'UP'
                    //         },
                    //         {
                    //             value: '1',
                    //             text: 'DOWN'
                    //         }
                    //     ],
                    //     defaultValue: '0'
                    // }
                ]
            },
            {
                inputType: 'fieldGroupArray',
                name: 'mpUpMemoria',
                label: 'MP獲得量UPメモリア',
                fields: [
                    {
                        inputType: 'select',
                        name: 'amount',
                        label: '',
                        validationObj: null,
                        options: Array.from(Array(10), (_, i) => {
                            return {
                                value: (i + 1).toString(),
                                text: 'MP獲得量UP' + constants.ROMAN_NUMERALS[i + 1]
                            };
                        }),
                        defaultValue: '1'
                    }
                ]
            }
        ]
    }
];

const MpCalcTab = ({ index, tabInfo, onFormChange }) => {
    const formValues = tabInfo.formState ?? MpFormInit;
    const [isDirty, setDirty] = useState(false);
    const [results, setResults] = useState(null);

    const classes = useStyles();

    const handleChange = () => {
        setDirty(true);
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

    accelMpUpMemoria = useFieldArray({
        control: formMethods.control,
        name: 'accelMpUpMemoria'
    });

    mpUpMemoria = useFieldArray({
        control: formMethods.control,
        name: 'mpUpMemoria'
    });

    const mpFormArrays = {
        accelMpUpMemoria,
        mpUpMemoria
    };

    const onSubmit = (data) => {
        calculateResults(data);
    };

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
                    {MpFormDef.map((item, index) => (
                        <FormField key={index} inputDef={item} fieldArrays={mpFormArrays} />
                    ))}
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
