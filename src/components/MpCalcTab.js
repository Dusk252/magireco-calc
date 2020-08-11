import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Container, Button } from '@material-ui/core';
import FormField from './FormField';
import { mpUp as mpUpCalc, accelMpUp as accelMpUpCalc } from './../utils/memoriaCalcs';
import { mpCalc } from './../utils/mpCalcs';
import * as constants from './../utils/const';

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

    const calculateResults = (data) => {
        const accelMpUpPa =
            Number(data.accelMpUpPa) * 0.01 +
            (data.accelMpUpMemoria == null
                ? 0
                : data.accelMpUpMemoria.reduce((sum, cur) => sum + accelMpUpCalc(Number(cur.amount)), 0));
        const mpUpPa =
            Number(data.mpUpPa) * 0.01 +
            (data.mpUpMemoria == null ? 0 : data.mpUpMemoria.reduce((sum, cur) => sum + mpUpCalc(Number(cur.amount)), 0));
        setResults(
            mpCalc(
                data.accelCombo,
                data.discSlot,
                data.discType,
                data.charType,
                mpUpPa,
                accelMpUpPa,
                Number(data.chargeCount)
            )
        );
    };

    return (
        <Container maxWidth='md'>
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)} autoComplete='off'>
                    {MpFormDef.map((item, index) => (
                        <FormField key={index} inputDef={item} fieldArrays={mpFormArrays} />
                    ))}
                    <Button type='submit' color='primary' variant='contained'>
                        Submit
                    </Button>
                </form>
            </FormProvider>
            {results && <div id='results'>{results}</div>}
        </Container>
    );
};

MpCalcTab.propTypes = {
    index: PropTypes.any.isRequired,
    tabInfo: PropTypes.object.isRequired,
    onFormChange: PropTypes.func.isRequired
};

export default MpCalcTab;
