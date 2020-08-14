import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, useWatch, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Container, Grid, Typography, InputAdornment, Button, Collapse, makeStyles, Box } from '@material-ui/core';
import {
    FormSection,
    TextInput,
    SelectInput,
    CheckboxInput,
    FieldArrayWrapper,
    FieldArrayElement,
    RadioButtonInput
} from '../../forms/FormComponents';
import * as constants from '../../../constants/const';
import * as dmgConstants from '../../../constants/dmgConst';
import * as dmgCalcs from '../../../utils/damageCalcs';
import * as memoriaCalcs from '../../../utils/memoriaCalcs';
import * as connectCalcs from '../../../utils/connectCalcs';
import ResultsDisplay from '../../ResultsDisplay';

const DmgFormInit = {
    atk: 0,
    atkKakusei: 0,
    atkMemoria: 0,
    atkEnhance: 0,
    def: 0,
    defKakusei: 0,
    defMemoria: 0,
    defEnhance: 0,
    discType: 'accele',
    discSlot: '1',
    discKakusei: 0,
    zokuseiKankei: '0',
    jinkeiAtk: '1',
    chargeCount: 0,
    questType: 'quest',
    joutaiIjou: false,
    blastCombo: false,
    puellaCombo: false,
    isMagiaOrDoppel: 'magia',
    magiaDmg: 0,
    magiaCombo: '1',
    zokuseiKyoukaMagia: false,

    atkUpPa: 0,
    defDownPa: 0,
    dmgUpPa: 0,
    dmgUpJoutaiPa: 0,
    joutaiIjouDmgUpPa: 0,
    blastDmgUpPa: 0,
    //chargeDmgUpPa: 0,
    chargeGoDmgUpPa: 0,
    taiseiBairitsuPa: 0,
    magiaDmgUpPa: 0,
    doppelDmgUpPa: 0
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        width: '100%'
    }
}));

const DmgCalcTab = ({ index, tabInfo, onFormChange, onFormSubmit }) => {
    //objects are merged so we can keep the user's localstorage even when new fields are added
    const formValues = tabInfo.formState != null ? { ...DmgFormInit, ...tabInfo.formState } : DmgFormInit;
    const [isDirty, setDirty] = useState(false);

    const classes = useStyles();

    const { getValues, ...formMethods } = useForm({
        defaultValues: formValues
    });
    const handleChange = () => {
        setDirty(true);
    };
    formMethods.handleChange = handleChange;

    const watchDiscType = useWatch({ name: 'discType', control: formMethods.control, defaultValue: formValues.discType });

    const atkHoseiMemoria = useFieldArray({
        control: formMethods.control,
        name: 'atkHoseiMemoria'
    });
    const dmgUpMemoria = useFieldArray({
        control: formMethods.control,
        name: 'dmgUpMemoria'
    });
    const dmgUpJoutaiMemoria = useFieldArray({
        control: formMethods.control,
        name: 'dmgUpJoutaiMemoria'
    });
    const joutaiIjouDmgUpMemoria = useFieldArray({
        control: formMethods.control,
        name: 'joutaiIjouDmgUpMemoria'
    });
    const defHoseiMemoria = useFieldArray({
        control: formMethods.control,
        name: 'defHoseiMemoria'
    });
    const blastDmgUpMemoria = useFieldArray({
        control: formMethods.control,
        name: 'blastDmgUpMemoria'
    });
    const chargeGoDmgUpMemoria = useFieldArray({
        control: formMethods.control,
        name: 'chargeGoDmgUpMemoria'
    });
    const magiaDmgUpMemoria = useFieldArray({
        control: formMethods.control,
        name: 'magiaDmgUpMemoria'
    });
    const doppelDmgUp = useFieldArray({
        control: formMethods.control,
        name: 'doppelDmgUp'
    });
    const atkHoseiConnect = useFieldArray({
        control: formMethods.control,
        name: 'atkHoseiConnect'
    });
    const dmgUpConnect = useFieldArray({
        control: formMethods.control,
        name: 'dmgUpConnect'
    });
    const joutaiIjouDmgUpConnect = useFieldArray({
        control: formMethods.control,
        name: 'joutaiIjouDmgUpConnect'
    });
    const defHoseiConnect = useFieldArray({
        control: formMethods.control,
        name: 'defHoseiConnect'
    });
    const blastDmgUpConnect = useFieldArray({
        control: formMethods.control,
        name: 'blastDmgUpConnect'
    });
    const chargeGoDmgUpConnect = useFieldArray({
        control: formMethods.control,
        name: 'chargeGoDmgUpConnect'
    });
    const magiaDmgUpConnect = useFieldArray({
        control: formMethods.control,
        name: 'magiaDmgUpConnect'
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
        const atkHosei = dmgCalcs.atkHosei(
            reduceIfExists(data.atkHoseiMemoria, memoriaCalcs.atkUp) +
                reduceIfExists(data.atkHoseiConnect, connectCalcs.atkUp) +
                Number(data.atkUpPa) * 0.01
        );
        const defHosei = dmgCalcs.defHosei(
            reduceIfExists(data.defHoseiMemoria, memoriaCalcs.defDown) + Number(data.defDownPa) * 0.01
        );
        const jikkouAtk = dmgCalcs.jikkouAtk(
            atkHosei,
            Number(data.atk),
            Number(data.atkMemoria),
            Number(data.atkEnhance),
            Number(data.atkKakusei),
            data.jinkeiAtk
        );
        const jikkouDef = dmgCalcs.jikkouDef(
            defHosei,
            Number(data.def),
            Number(data.defMemoria),
            Number(data.defEnhance),
            Number(data.defKakusei)
        );
        const dmgUpHosei = dmgCalcs.dmgUpHosei(
            reduceIfExists(data.dmgUpMemoria, memoriaCalcs.dealtDmgUp) +
                reduceIfExists(data.dmgUpConnect, connectCalcs.dealtDmgUp) +
                Number(data.dmgUpPa) * 0.01
        );
        const magiaDmgHosei = dmgCalcs.magiaHosei(
            reduceIfExists(data.magiaDmgUpMemoria, memoriaCalcs.magiaDmgUp) +
                reduceIfExists(data.magiaDmgUpConnect, connectCalcs.magiaDmgUp) +
                Number(data.magiaDmgUpPa) * 0.01
        );
        const doppelDmgHosei = dmgCalcs.doppelHosei(
            reduceIfExists(data.doppelDmgUp, memoriaCalcs.magiaDmgUp) + Number(data.doppelDmgUpPa) * 0.01
        );
        const dmgUpJoutaiHosei =
            reduceIfExists(data.dmgUpJoutaiMemoria, memoriaCalcs.damageUp) + Number(data.dmgUpJoutaiPa) * 0.01;
        const joutaiIjouDmgUp =
            reduceIfExists(data.joutaiIjouDmgUpMemoria, memoriaCalcs.joutaiIjouDmgUp) +
            reduceIfExists(data.joutaiIjouDmgUpConnect, connectCalcs.joutaiIjouDmgUp) +
            Number(data.joutaiIjouDmgUpPa) * 0.01;
        const blastDmgUp =
            reduceIfExists(data.blastDmgUpMemoria, memoriaCalcs.blastDmgUp) +
            reduceIfExists(data.blastDmgUpConnect, connectCalcs.blastDmgUp) +
            Number(data.blastDmgUpPa) * 0.01;
        const chargeGoDmgUp =
            reduceIfExists(data.chargeGoDmgUpMemoria, memoriaCalcs.chargeGoDmgUp) +
            reduceIfExists(data.chargeGoDmgUpConnect, connectCalcs.chargeGoDmgUp) +
            Number(data.chargeGoDmgUpPa) * 0.01;

        const dmgHosei = dmgCalcs.dmgHoseiTotal(
            dmgUpHosei,
            dmgUpJoutaiHosei,
            joutaiIjouDmgUp,
            doppelDmgHosei,
            data.isMagiaOrDoppel === 'doppel',
            data.joutaiIjou,
            data.discType,
            blastDmgUp
        );
        const baseDamage = dmgCalcs.baseDmg(jikkouAtk, jikkouDef);

        const totalDamage =
            data.discType === 'magia'
                ? dmgCalcs.totalDmgMagia(
                      baseDamage,
                      Number(data.magiaDmg),
                      data.magiaCombo,
                      magiaDmgHosei,
                      data.zokuseiKankei,
                      Number(data.taiseiBairitsuPa),
                      dmgHosei
                  )
                : dmgCalcs.totalDmgDisc(
                      baseDamage,
                      data.discType,
                      data.discSlot,
                      data.puellaCombo,
                      data.blastCombo,
                      Number(data.discKakusei),
                      Number(data.chargeCount),
                      chargeGoDmgUp,
                      data.zokuseiKankei,
                      Number(data.taiseiBairitsuPa),
                      dmgHosei
                  );

        const finalDamage = {
            min: totalDamage * 0.95,
            max: totalDamage * 1.05
        };

        onFormSubmit(
            {
                interimResults: [
                    {
                        label: '実行ATK',
                        res: {
                            value: jikkouAtk
                        }
                    },
                    {
                        label: '実行DEF',
                        res: {
                            value: jikkouDef
                        }
                    },
                    {
                        label: '攻撃力補正',
                        res: {
                            value: atkHosei * 100,
                            postfix: '%'
                        }
                    },
                    {
                        label: '防御力補正',
                        res: {
                            value: defHosei * 100,
                            postfix: '%'
                        }
                    },
                    {
                        label: 'マギアダメージ補正',
                        res: {
                            value: magiaDmgHosei * 100,
                            postfix: '%'
                        }
                    },
                    {
                        label: 'ドッペルダメージ補正',
                        res: {
                            value: doppelDmgHosei * 100,
                            postfix: '%'
                        }
                    },
                    {
                        label: '与えるダメージ補正',
                        res: {
                            value: dmgUpHosei * 100,
                            postfix: '%'
                        }
                    },
                    {
                        label: '補正係数',
                        res: {
                            value: dmgHosei * 100,
                            postfix: '%'
                        }
                    }
                ],
                finalResult: {
                    label: '最終ダメージ',
                    res: {
                        value: finalDamage.max
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
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='atk'
                                    label='基礎ATK'
                                    validationObj={{
                                        required: true,
                                        validate: {
                                            isInteger: (value) => Number.isInteger(Number(value))
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='atkKakusei'
                                    label='覚醒ATK+倍率'
                                    validationObj={{
                                        required: true,
                                        validate: {
                                            isInteger: (value) => Number.isInteger(Number(value))
                                        }
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position='end'>%</InputAdornment>
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='atkMemoria'
                                    label='メモリアATK'
                                    validationObj={{
                                        required: true,
                                        validate: {
                                            isInteger: (value) => Number.isInteger(Number(value))
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='atkEnhance'
                                    label='精神強化ATK'
                                    validationObj={{
                                        required: true,
                                        validate: {
                                            isInteger: (value) => Number.isInteger(Number(value))
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='def'
                                    label='基礎DEF'
                                    validationObj={{
                                        required: true,
                                        validate: {
                                            isInteger: (value) => Number.isInteger(Number(value))
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='defKakusei'
                                    label='覚醒DEF+倍率'
                                    validationObj={{
                                        required: true,
                                        validate: {
                                            isInteger: (value) => Number.isInteger(Number(value))
                                        }
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position='end'>%</InputAdornment>
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='defMemoria'
                                    label='メモリアDEF'
                                    validationObj={{
                                        required: true,
                                        validate: {
                                            isInteger: (value) => Number.isInteger(Number(value))
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='defEnhance'
                                    label='精神強化DEF'
                                    validationObj={{
                                        required: true,
                                        validate: {
                                            isInteger: (value) => Number.isInteger(Number(value))
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <SelectInput
                                    name='discType'
                                    label='ディスク種類'
                                    options={dmgConstants.DISC_TYPE_DROPDOWN}
                                />
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='discKakusei'
                                    label={`覚醒${
                                        dmgConstants.DISC_TYPE_DROPDOWN.find((el) => el.value == watchDiscType).text
                                    }+倍率`}
                                    validationObj={{
                                        required: true,
                                        validate: {
                                            isInteger: (value) => Number.isInteger(Number(value))
                                        }
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position='end'>%</InputAdornment>
                                    }}
                                    disabled={watchDiscType === 'magia'}
                                />
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <SelectInput name='zokuseiKankei' label='属性関係' options={dmgConstants.ZOKUSEI_DROPDOWN} />
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <SelectInput name='jinkeiAtk' label='陣形効果' options={dmgConstants.JINKEI_DROPDOWN} />
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
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <SelectInput
                                    name='discSlot'
                                    label='ディスク位置'
                                    options={constants.DISC_SLOT_DROPDOWN}
                                    disabled={watchDiscType === 'magia'}
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <CheckboxInput name='puellaCombo' label='ピュエラコンボ' />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <CheckboxInput name='blastCombo' label='ブラストコンボ' />
                            </Grid>
                            <Grid item xs={8} md={6}>
                                <RadioButtonInput name='questType' options={dmgConstants.QUEST_TYPE_OPTIONS} />
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <CheckboxInput name='joutaiIjou' label='状態異常マス' />
                            </Grid>
                        </Grid>
                        <Collapse in={watchDiscType === 'magia'} timeout='auto'>
                            <Box pt={3} pb={0} mb={3} borderBottom={'1px solid rgba(255,255,255,.5)'}>
                                <Typography variant='subtitle1'>マギア関係</Typography>
                            </Box>
                            <Grid container>
                                <Grid item xs={6} md={3}>
                                    <RadioButtonInput
                                        name='isMagiaOrDoppel'
                                        options={[
                                            { value: 'magia', text: 'マギア' },
                                            { value: 'doppel', text: 'ドッペル' }
                                        ]}
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <TextInput
                                        name='magiaDmg'
                                        label='ダメージ倍率'
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
                                <Grid item xs={6} md={3}>
                                    <SelectInput
                                        name='magiaCombo'
                                        label='マギアコンボ'
                                        options={dmgConstants.MAGIA_COMBO_DROPDOWN}
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <CheckboxInput name='zokuseiKyoukaMagia' label='属性強化' />
                                </Grid>
                            </Grid>
                        </Collapse>
                    </FormSection>
                    <FormSection
                        label='メモリア'
                        collapse
                        open={[
                            atkHoseiMemoria,
                            dmgUpMemoria,
                            dmgUpJoutaiMemoria,
                            joutaiIjouDmgUpMemoria,
                            magiaDmgUpMemoria,
                            defHoseiMemoria,
                            blastDmgUpMemoria,
                            //chargeDmgUpMemoria,
                            chargeGoDmgUpMemoria,
                            doppelDmgUp
                        ].some((item) => item.length > 0)}
                    >
                        <FieldArrayWrapper name='atkHoseiMemoria' label='攻撃力UPメモリア' fieldArray={atkHoseiMemoria}>
                            {atkHoseiMemoria.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={atkHoseiMemoria} index={index}>
                                    <SelectInput
                                        name={`atkHoseiMemoria[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: '攻撃力UP' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                        <FieldArrayWrapper name='dmgUpMemoria' label='与えるダメージUPメモリア' fieldArray={dmgUpMemoria}>
                            {dmgUpMemoria.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={dmgUpMemoria} index={index}>
                                    <SelectInput
                                        name={`dmgUpMemoria[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: '与えるダメージUP' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                        <FieldArrayWrapper
                            name='dmgUpJoutaiMemoria'
                            label='ダメージアップ状態メモリア'
                            fieldArray={dmgUpJoutaiMemoria}
                        >
                            {dmgUpJoutaiMemoria.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={dmgUpJoutaiMemoria} index={index}>
                                    <SelectInput
                                        name={`dmgUpJoutaiMemoria[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: 'ダメージアップ状態' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                        <FieldArrayWrapper
                            name='joutaiIjouDmgUpMemoria'
                            label='敵状態異常時ダメージUPメモリア'
                            fieldArray={joutaiIjouDmgUpMemoria}
                        >
                            {joutaiIjouDmgUpMemoria.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={joutaiIjouDmgUpMemoria} index={index}>
                                    <SelectInput
                                        name={`joutaiIjouDmgUpMemoria[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: '敵状態異常時ダメージUP' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                        <FieldArrayWrapper name='defHoseiMemoria' label='防御力DOWNメモリア' fieldArray={defHoseiMemoria}>
                            {defHoseiMemoria.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={defHoseiMemoria} index={index}>
                                    <SelectInput
                                        name={`defHoseiMemoria[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: '防御力DOWN' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                        <FieldArrayWrapper
                            name='blastDmgUpMemoria'
                            label='Blast ダメージUPメモリア'
                            fieldArray={blastDmgUpMemoria}
                        >
                            {blastDmgUpMemoria.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={blastDmgUpMemoria} index={index}>
                                    <SelectInput
                                        name={`blastDmgUpMemoria[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: 'Blast ダメージUP' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                        <FieldArrayWrapper
                            name='chargeGoDmgUpMemoria'
                            label='Charge後ダメージUPメモリア'
                            fieldArray={chargeGoDmgUpMemoria}
                        >
                            {chargeGoDmgUpMemoria.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={chargeGoDmgUpMemoria} index={index}>
                                    <SelectInput
                                        name={`chargeGoDmgUpMemoria[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: 'Charge後ダメージUP' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                        <FieldArrayWrapper
                            name='magiaDmgUpMemoria'
                            label='マギアダメージUPメモリア'
                            fieldArray={magiaDmgUpMemoria}
                        >
                            {magiaDmgUpMemoria.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={magiaDmgUpMemoria} index={index}>
                                    <SelectInput
                                        name={`magiaDmgUpMemoria[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: 'マギアダメージUP' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                        <FieldArrayWrapper name='doppelDmgUp' label='ドッペルダメージUP' fieldArray={doppelDmgUp}>
                            {doppelDmgUp.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={doppelDmgUp} index={index}>
                                    <SelectInput
                                        name={`doppelDmgUp[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: 'ドッペルダメージUP' + constants.ROMAN_NUMERALS[i + 1]
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
                        open={[
                            atkHoseiConnect,
                            dmgUpConnect,
                            joutaiIjouDmgUpConnect,
                            magiaDmgUpConnect,
                            defHoseiConnect,
                            blastDmgUpConnect,
                            //chargeDmgUpConnect,
                            chargeGoDmgUpConnect
                        ].some((item) => item.length > 0)}
                    >
                        <FieldArrayWrapper name='atkHoseiConnect' label='攻撃力UPコネクト' fieldArray={atkHoseiConnect}>
                            {atkHoseiConnect.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={atkHoseiConnect} index={index}>
                                    <SelectInput
                                        name={`atkHoseiConnect[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: '攻撃力UP' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                        <FieldArrayWrapper name='dmgUpConnect' label='与えるダメージUPコネクト' fieldArray={dmgUpConnect}>
                            {dmgUpConnect.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={dmgUpConnect} index={index}>
                                    <SelectInput
                                        name={`dmgUpConnect[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: '与えるダメージUP' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                        <FieldArrayWrapper
                            name='joutaiIjouDmgUpConnect'
                            label='敵状態異常時ダメージUPコネクト'
                            fieldArray={joutaiIjouDmgUpConnect}
                        >
                            {joutaiIjouDmgUpConnect.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={joutaiIjouDmgUpConnect} index={index}>
                                    <SelectInput
                                        name={`joutaiIjouDmgUpConnect[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: '敵状態異常時ダメージUP' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                        <FieldArrayWrapper name='defHoseiConnect' label='防御力DOWNコネクト' fieldArray={defHoseiConnect}>
                            {defHoseiConnect.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={defHoseiConnect} index={index}>
                                    <SelectInput
                                        name={`defHoseiConnect[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: '防御力DOWN' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                        <FieldArrayWrapper
                            name='blastDmgUpConnect'
                            label='Blast ダメージUPコネクト'
                            fieldArray={blastDmgUpConnect}
                        >
                            {blastDmgUpConnect.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={blastDmgUpConnect} index={index}>
                                    <SelectInput
                                        name={`blastDmgUpConnect[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: 'Blast ダメージUP' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                        <FieldArrayWrapper
                            name='chargeGoDmgUpConnect'
                            label='Charge後ダメージUPコネクト'
                            fieldArray={chargeGoDmgUpConnect}
                        >
                            {chargeGoDmgUpConnect.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={chargeGoDmgUpConnect} index={index}>
                                    <SelectInput
                                        name={`chargeGoDmgUpConnect[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: 'Charge後ダメージUP' + constants.ROMAN_NUMERALS[i + 1]
                                            };
                                        })}
                                        defaultValue={'1'}
                                    />
                                </FieldArrayElement>
                            ))}
                        </FieldArrayWrapper>
                        <FieldArrayWrapper
                            name='magiaDmgUpConnect'
                            label='マギアダメージUPコネクト'
                            fieldArray={magiaDmgUpConnect}
                        >
                            {magiaDmgUpConnect.fields.map((field, index) => (
                                <FieldArrayElement key={index} fieldArray={magiaDmgUpConnect} index={index}>
                                    <SelectInput
                                        name={`magiaDmgUpConnect[${index}].amount`}
                                        options={Array.from(Array(10), (_, i) => {
                                            return {
                                                value: (i + 1).toString(),
                                                text: 'マギアダメージUP' + constants.ROMAN_NUMERALS[i + 1]
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
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='atkUpPa'
                                    label='攻撃力UP倍率'
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
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='defDownPa'
                                    label='防御力DOWN倍率'
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
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='dmgUpPa'
                                    label='与えるダメージUP倍率'
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
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='dmgUpJoutaiPa'
                                    label='ダメージアップ状態倍率'
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
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='joutaiIjouDmgUpPa'
                                    label='敵状態異常時ダメージUP倍率'
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
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='blastDmgUpPa'
                                    label='敵状態異常時ダメージUP倍率'
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
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='chargeGoDmgUpPa'
                                    label='敵状態異常時ダメージUP倍率'
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
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='taiseiBairitsuPa'
                                    label='耐性倍率倍率'
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
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='magiaDmgUpPa'
                                    label='マギアダメージUP倍率'
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
                            <Grid item xs={4} md={3}>
                                <TextInput
                                    name='doppelDmgUpPa'
                                    label='ドッペルダメージUP倍率'
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

DmgCalcTab.propTypes = {
    index: PropTypes.any.isRequired,
    tabInfo: PropTypes.object.isRequired,
    onFormChange: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired
};

export default DmgCalcTab;
