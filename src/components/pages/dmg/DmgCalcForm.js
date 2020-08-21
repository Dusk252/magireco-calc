import React, { useEffect } from 'react';
import { useForm, useFieldArray, useWatch, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Grid, Typography, InputAdornment, Button, Collapse, makeStyles, Box } from '@material-ui/core';
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

const DmgFormInit = {
    atk: 0,
    atkKakusei: 0,
    atkMemoria: 0,
    atkEnhance: 0,
    def: 0,
    defKakusei: 0,
    defMemoria: 0,
    defEnhance: 0,
    discType: constants.DISC_TYPE.ACCELE,
    discSlot: '1',
    discKakusei: 0,
    zokuseiKankei: '0',
    jinkeiAtk: '1',
    chargeCount: 0,
    questType: constants.QUEST_TYPE.QUEST,
    joutaiIjou: false,
    blastCombo: false,
    puellaCombo: false,
    isCrit: false,
    isMagiaOrDoppel: constants.DISC_TYPE.MAGIA,
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

const DmgCalcForm = ({ index, formState, onFormChange, onSubmit }) => {
    //objects are merged so we can keep the user's localstorage even when new fields are added
    const formValues = formState != null ? { ...DmgFormInit, ...formState } : DmgFormInit;

    const classes = useStyles();

    const { ...formMethods } = useForm({
        defaultValues: formValues
    });
    const handleChange = () => {
        onFormChange(formMethods.getValues(), index);
    };
    formMethods.handleChange = handleChange;

    const watchDiscType = useWatch({ name: 'discType', control: formMethods.control, defaultValue: formValues.discType });
    const watchBlastCombo = useWatch({
        name: 'blastCombo',
        control: formMethods.control,
        defaultValue: formValues.blastCombo
    });
    const watchQuestType = useWatch({
        name: 'questType',
        control: formMethods.control,
        defaultValues: formValues.questType
    });

    const setValue = formMethods.setValue;
    const getValues = formMethods.getValues;
    useEffect(() => {
        if (watchDiscType) {
            if (watchDiscType !== constants.DISC_TYPE.BLAST && watchBlastCombo) {
                setValue('blastCombo', false);
                onFormChange(getValues(), index);
            }
        }
    }, [watchDiscType, watchBlastCombo, setValue, getValues, onFormChange, index]);

    const memoriaFieldArrays = [
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'atkHoseiMemoria'
            }),
            name: 'atkHoseiMemoria',
            label: '攻撃力UP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'dmgUpMemoria'
            }),
            name: 'dmgUpMemoria',
            label: '与えるダメージUP',
            //dropNumber: 6
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'dmgUpJoutaiMemoria'
            }),
            name: 'dmgUpJoutaiMemoria',
            label: 'ダメージアップ状態',
            //dropNumber: 8
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'joutaiIjouDmgUpMemoria'
            }),
            name: 'joutaiIjouDmgUpMemoria',
            label: '敵状態異常時ダメージUP',
            //dropNumber: 6
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'defHoseiMemoria'
            }),
            name: 'defHoseiMemoria',
            label: '防御力DOWN',
            //dropNumber: 9
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'blastDmgUpMemoria'
            }),
            name: 'blastDmgUpMemoria',
            label: 'Blast ダメージUP',
            //dropNumber: 9
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'chargeGoDmgUpMemoria'
            }),
            name: 'chargeGoDmgUpMemoria',
            label: 'Charge後ダメージUP',
            //dropNumber: 5
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'magiaDmgUpMemoria'
            }),
            name: 'magiaDmgUpMemoria',
            label: 'マギアダメージUP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'hinshijiAtkUpMemoria'
            }),
            name: 'hinshijiAtkUpMemoria',
            label: '瀕死時攻撃力UP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        }
    ];

    const connectFieldArrays = [
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'atkHoseiConnect'
            }),
            name: 'atkHoseiConnect',
            label: '攻撃力UP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'dmgUpConnect'
            }),
            name: 'dmgUpConnect',
            label: '与えるダメージUP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'joutaiIjouDmgUpConnect'
            }),
            name: 'joutaiIjouDmgUpConnect',
            label: '敵状態異常時ダメージUP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'defHoseiConnect'
            }),
            name: 'defHoseiConnect',
            label: '防御力DOWN',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'blastDmgUpConnect'
            }),
            name: 'blastDmgUpConnect',
            label: 'Blast ダメージUP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'chargeGoDmgUpConnect'
            }),
            name: 'chargeGoDmgUpConnect',
            label: 'Charge後ダメージUP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'magiaDmgUpConnect'
            }),
            name: 'magiaDmgUpConnect',
            label: 'マギアダメージUP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        }
    ];

    const seishinKyoukaFieldArrays = [
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'atkHoseiSkill'
            }),
            name: 'atkHoseiSkill',
            label: '攻撃力UP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'dmgUpSkill'
            }),
            name: 'dmgUpSkill',
            label: '与えるダメージUP',
            //dropNumber: 6
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'dmgUpJoutaiSkill'
            }),
            name: 'dmgUpJoutaiSkill',
            label: 'ダメージアップ状態',
            //dropNumber: 8
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'joutaiIjouDmgUpSkill'
            }),
            name: 'joutaiIjouDmgUpSkill',
            label: '敵状態異常時ダメージUP',
            //dropNumber: 6
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'defHoseiSkill'
            }),
            name: 'defHoseiSkill',
            label: '防御力DOWN',
            //dropNumber: 9
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'chargeDiscDmgUpSkill'
            }),
            name: 'chargeDiscDmgUpSkill',
            label: 'ChargeディスクダメージUP',
            //dropNumber: 9
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'blastDmgUpSkill_Ability'
            }),
            name: 'blastDmgUpSkill_Ability',
            label: 'Blast ダメージUP（アビリティ）',
            //dropNumber: 9
            optionValues: [2, 3, 4],
            defaultValue: '2'
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'blastDmgUpSkill_Skill'
            }),
            name: 'blastDmgUpSkill_Skill',
            label: 'Blast ダメージUP（スキル）',
            //dropNumber: 9
            optionValues: [3, 5, 6, 9],
            defaultValue: '3'
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'chargeGoDmgUpSkill_Ability'
            }),
            name: 'chargeGoDmgUpSkill_Ability',
            label: 'Charge後ダメージUP（アビリティ）',
            //dropNumber: 5
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'chargeGoDmgUpSkill_Skill'
            }),
            name: 'chargeGoDmgUpSkill_Skill',
            label: 'Charge後ダメージUP（スキル）',
            //dropNumber: 5
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'magiaDmgUpSkill'
            }),
            name: 'magiaDmgUpSkill',
            label: 'マギアダメージUP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'doppelDmgUpSkill'
            }),
            name: 'doppelDmgUpSkill',
            label: 'ドッペルダメージUP',
            //dropNumber: 5
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        },
        {
            array: useFieldArray({
                control: formMethods.control,
                name: 'hinshijiAtkUpSkill'
            }),
            name: 'hinshijiAtkUpSkill',
            label: '瀕死時攻撃力UP',
            optionValues: Array.from(Array(10), (_, i) => i + 1)
        }
        // {
        //     array: useFieldArray({
        //         control: formMethods.control,
        //         name: 'antiWitchDmgUpSkill'
        //     }),
        //     name: 'antiWitchDmgUpSkill',
        //     label: '対魔女ダメージアップ',
        //     optionValues: Array.from(Array(10), (_, i) => i + 1)
        // }
    ];

    const percentageFields = [
        {
            name: 'atkUpPa',
            label: '攻撃力UP倍率'
        },
        {
            name: 'defDownPa',
            label: '防御力DOWN倍率'
        },
        {
            name: 'dmgUpPa',
            label: '与えるダメージUP倍率'
        },
        {
            name: 'dmgUpJoutaiPa',
            label: 'ダメージアップ状態倍率'
        },
        {
            name: 'joutaiIjouDmgUpPa',
            label: '敵状態異常時ダメージUP倍率'
        },
        {
            name: 'blastDmgUpPa',
            label: 'Blast ダメージUP倍率'
        },
        {
            name: 'chargeGoDmgUpPa',
            label: 'Charge後ダメージUP倍率'
        },
        {
            name: 'taiseiBairitsuPa',
            label: '耐性倍率倍率'
        },
        {
            name: 'magiaDmgUpPa',
            label: 'マギアダメージUP倍率'
        },
        {
            name: 'doppelDmgUpPa',
            label: 'ドッペルダメージUP倍率'
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
                            <TextInput
                                name='atk'
                                label='基礎ATK'
                                validationObj={{
                                    required: true,
                                    validate: {
                                        isInteger: (value) => Number.isInteger(Number(value))
                                    }
                                }}
                                inputProps={{
                                    maxLength: 5
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
                                inputProps={{
                                    maxLength: 2
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
                                inputProps={{
                                    maxLength: 4
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
                                inputProps={{
                                    maxLength: 4
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
                                inputProps={{
                                    maxLength: 5
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
                                inputProps={{
                                    maxLength: 2
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
                                inputProps={{
                                    maxLength: 4
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
                                inputProps={{
                                    maxLength: 4
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <SelectInput
                                name='discType'
                                label='ディスク種類'
                                options={dmgConstants.DISC_TYPE_DROPDOWN}
                                variant='outlined'
                                showErrors
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
                                inputProps={{
                                    maxLength: 2
                                }}
                                disabled={watchDiscType === constants.DISC_TYPE.MAGIA}
                            />
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <SelectInput
                                name='zokuseiKankei'
                                label='属性関係'
                                options={dmgConstants.ZOKUSEI_DROPDOWN}
                                variant='outlined'
                                showErrors
                            />
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <SelectInput
                                name='jinkeiAtk'
                                label='陣形効果'
                                options={dmgConstants.JINKEI_DROPDOWN}
                                variant='outlined'
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
                                disabled={watchDiscType === constants.DISC_TYPE.MAGIA}
                            />
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <SelectInput
                                name='discSlot'
                                label='ディスク位置'
                                options={constants.DISC_SLOT_DROPDOWN}
                                disabled={watchDiscType === constants.DISC_TYPE.MAGIA}
                                variant='outlined'
                                showErrors
                            />
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <CheckboxInput
                                name='puellaCombo'
                                label='ピュエラコンボ'
                                disabled={watchDiscType === constants.DISC_TYPE.MAGIA}
                            />
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <CheckboxInput
                                name='blastCombo'
                                label='ブラストコンボ'
                                disabled={watchDiscType !== constants.DISC_TYPE.BLAST}
                            />
                        </Grid>
                        <Grid item xs={8} md={6}>
                            <RadioButtonInput name='questType' options={dmgConstants.QUEST_TYPE_OPTIONS} />
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <CheckboxInput name='joutaiIjou' label='特定状態異常マス' />
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <CheckboxInput
                                name='isCrit'
                                label='クリティカル'
                                disabled={watchDiscType === constants.DISC_TYPE.MAGIA}
                            />
                        </Grid>
                        {watchQuestType === constants.QUEST_TYPE.KIMOCHISEN ? (
                            <Grid item xs={12}>
                                <Box px={2}>
                                    <Typography variant='body2'>
                                        *キモチ戦では不確かな数字があるため結果が若干ズレることがあります。
                                    </Typography>
                                </Box>
                            </Grid>
                        ) : (
                            ''
                        )}
                    </Grid>
                    <Collapse in={watchDiscType === constants.DISC_TYPE.MAGIA} timeout='auto'>
                        <Box pt={3} pb={0} mb={3} borderBottom={'1px solid rgba(255,255,255,.5)'}>
                            <Typography variant='subtitle1'>マギア関連</Typography>
                        </Box>
                        <Grid container>
                            <Grid item xs={6} md={3}>
                                <RadioButtonInput
                                    name='isMagiaOrDoppel'
                                    options={[
                                        { value: constants.DISC_TYPE.MAGIA, text: 'マギア' },
                                        { value: constants.DISC_TYPE.DOPPEL, text: 'ドッペル' }
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
                                    inputProps={{
                                        maxLength: 6
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <SelectInput
                                    name='magiaCombo'
                                    label='マギアコンボ'
                                    options={dmgConstants.MAGIA_COMBO_DROPDOWN}
                                    variant='outlined'
                                    showErrors
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <CheckboxInput name='zokuseiKyoukaMagia' label='属性強化' />
                            </Grid>
                        </Grid>
                    </Collapse>
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
                                        defaultValue={element.defaultValue ?? '1'}
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
                                        defaultValue={element.defaultValue ?? '1'}
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
                    <Box px={2}>
                        <Typography variant='body2'>
                            *BlastダメージUPとCharge後ダメージUPの場合はスキルとアビリティの数字が異なっていますのでご注意してください。
                        </Typography>
                    </Box>
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
                                        defaultValue={element.defaultValue ?? '1'}
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
                        {percentageFields.map((field, index) => (
                            <Grid item xs={4} md={3} key={index}>
                                <TextInput
                                    name={field.name}
                                    label={field.label}
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
                        ))}
                    </Grid>
                </FormSection>
                <Button className={classes.root} type='submit' color='primary' variant='contained'>
                    Submit
                </Button>
            </form>
        </FormProvider>
    );
};

DmgCalcForm.propTypes = {
    index: PropTypes.any.isRequired,
    formState: PropTypes.object,
    onFormChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default DmgCalcForm;
