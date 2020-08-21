import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, Box } from '@material-ui/core';
import * as constants from '../../../constants/const';
import * as dmgConstants from '../../../constants/dmgConst';
import * as dmgCalcs from '../../../utils/damageCalcs';
import * as memoriaCalcs from '../../../utils/memoriaCalcs';
import * as connectCalcs from '../../../utils/connectCalcs';
import * as seishinKyoukaCalcs from '../../../utils/seishinKyoukaCalcs';
import ResultsDisplay from '../../forms/ResultsDisplay';
import DmgCalcForm from './DmgCalcForm';
import { firebaseLogEvent } from '../../../firebaseHelper';

const DmgCalcTab = ({ index, tabInfo, onFormChange, onFormSubmit }) => {
    const onSubmit = (data) => {
        firebaseLogEvent('dmgCalcForm');
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
        const atkHosei = dmgCalcs.atkHosei(
            reduceIfExists(data.atkHoseiMemoria, memoriaCalcs.atkUp) +
                reduceIfExists(data.atkHoseiConnect, connectCalcs.atkUp) +
                reduceIfExists(data.atkHoseiSkill, seishinKyoukaCalcs.atkUp) +
                reduceIfExists(data.hinshijiAtkUpMemoria, memoriaCalcs.hinshiAtkUp) +
                reduceIfExists(data.hinshijiAtkUpSkill, seishinKyoukaCalcs.hinshiAtkUp) +
                Number(data.atkUpPa) * 0.01
        );
        const defHosei = dmgCalcs.defHosei(
            reduceIfExists(data.defHoseiMemoria, memoriaCalcs.defDown) +
                reduceIfExists(data.defHoseiSkill, seishinKyoukaCalcs.defDown) +
                Number(data.defDownPa) * 0.01
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
                reduceIfExists(data.dmgUpSkill, seishinKyoukaCalcs.dealtDmgUp) +
                Number(data.dmgUpPa) * 0.01
        );
        const magiaDmgHosei = dmgCalcs.magiaHosei(
            reduceIfExists(data.magiaDmgUpMemoria, memoriaCalcs.magiaDmgUp) +
                reduceIfExists(data.magiaDmgUpConnect, connectCalcs.magiaDmgUp) +
                reduceIfExists(data.magiaDmgUpSkill, seishinKyoukaCalcs.magiaDmgUp) +
                Number(data.magiaDmgUpPa) * 0.01
        );
        const doppelDmgHosei =
            reduceIfExists(data.doppelDmgUpSkill, seishinKyoukaCalcs.doppelDmgUp) + Number(data.doppelDmgUpPa) * 0.01;
        const dmgUpJoutaiHosei =
            reduceIfExists(data.dmgUpJoutaiMemoria, memoriaCalcs.damageUp) +
            reduceIfExists(data.dmgUpJoutaiSkill, seishinKyoukaCalcs.damageUp) +
            Number(data.dmgUpJoutaiPa) * 0.01;
        const joutaiIjouDmgUp =
            reduceIfExists(data.joutaiIjouDmgUpMemoria, memoriaCalcs.joutaiIjouDmgUp) +
            reduceIfExists(data.joutaiIjouDmgUpConnect, connectCalcs.joutaiIjouDmgUp) +
            reduceIfExists(data.joutaiIjouDmgUpSkill, seishinKyoukaCalcs.joutaiIjouDmgUp) +
            Number(data.joutaiIjouDmgUpPa) * 0.01;
        const blastDmgUp =
            reduceIfExists(data.blastDmgUpMemoria, memoriaCalcs.blastDmgUp) +
            reduceIfExists(data.blastDmgUpConnect, connectCalcs.blastDmgUp) +
            reduceIfExists(data.blastDmgUpSkill_Skill, seishinKyoukaCalcs.blastDmgUpSkill) +
            reduceIfExists(data.blastDmgUpSkill_Ability, seishinKyoukaCalcs.blastDmgUpAbility) +
            Number(data.blastDmgUpPa) * 0.01;
        const chargeDmgUp = reduceIfExists(data.chargeDiscDmgUpSkill, seishinKyoukaCalcs.chargeDiscDmgUp);
        const chargeGoDmgUp =
            reduceIfExists(data.chargeGoDmgUpMemoria, memoriaCalcs.chargeGoDmgUp) +
            reduceIfExists(data.chargeGoDmgUpConnect, connectCalcs.chargeGoDmgUp) +
            reduceIfExists(data.chargeGoDmgUpSkill_Skill, seishinKyoukaCalcs.chargeGoDmgUpSkill) +
            reduceIfExists(data.chargeGoDmgUpSkill_Ability, seishinKyoukaCalcs.chargeGoDmgUpAbility) +
            Number(data.chargeGoDmgUpPa) * 0.01;

        const dmgHosei = dmgCalcs.dmgHoseiTotal(
            dmgUpHosei,
            dmgUpJoutaiHosei,
            joutaiIjouDmgUp,
            doppelDmgHosei,
            data.isMagiaOrDoppel === constants.DISC_TYPE.DOPPEL,
            data.joutaiIjou,
            data.discType,
            blastDmgUp,
            chargeDmgUp
        );
        const baseDamage = dmgCalcs.baseDmg(jikkouAtk, jikkouDef);

        const totalDamage =
            data.discType === constants.DISC_TYPE.MAGIA
                ? dmgCalcs.totalDmgMagia(
                      baseDamage,
                      data.questType,
                      Number(data.magiaDmg),
                      data.magiaCombo,
                      magiaDmgHosei,
                      data.zokuseiKankei,
                      data.zokuseiKyoukaMagia,
                      data.joutaiIjou,
                      Number(data.taiseiBairitsuPa),
                      dmgHosei
                  )
                : dmgCalcs.totalDmgDisc(
                      baseDamage,
                      data.questType,
                      data.discType,
                      data.discSlot,
                      data.puellaCombo,
                      data.blastCombo,
                      Number(data.discKakusei),
                      Number(data.chargeCount),
                      chargeGoDmgUp,
                      data.zokuseiKankei,
                      data.joutaiIjou,
                      Number(data.taiseiBairitsuPa),
                      dmgHosei,
                      data.isCrit
                  );

        const finalDamage = dmgCalcs.finalDamage(totalDamage);

        onFormSubmit(
            {
                interimResults: [
                    {
                        label: '実行ATK',
                        value: jikkouAtk
                    },
                    {
                        label: '実行DEF',
                        value: jikkouDef
                    },
                    {
                        label: '攻撃力補正',
                        value: atkHosei * 100,
                        postfix: '%',
                        limits: {
                            min: dmgConstants.KYOUKA_LIMITS.atkHosei.min * 100,
                            max: dmgConstants.KYOUKA_LIMITS.atkHosei.max * 100
                        }
                    },
                    {
                        label: '防御力補正',
                        value: defHosei * 100,
                        postfix: '%',
                        limits: {
                            min: dmgConstants.KYOUKA_LIMITS.defHosei.min * 100,
                            max: dmgConstants.KYOUKA_LIMITS.defHosei.max * 100
                        }
                    },
                    {
                        label: 'マギアダメージ補正',
                        value: magiaDmgHosei * 100,
                        postfix: '%',
                        limits: {
                            min: dmgConstants.KYOUKA_LIMITS.magiaHosei.min * 100,
                            max: dmgConstants.KYOUKA_LIMITS.magiaHosei.max * 100
                        }
                    },
                    {
                        label: 'ドッペルダメージ補正',
                        value: doppelDmgHosei * 100,
                        postfix: '%',
                        limits: {
                            min: dmgConstants.KYOUKA_LIMITS.doppelHosei.min * 100,
                            max: dmgConstants.KYOUKA_LIMITS.doppelHosei.max * 100
                        }
                    },
                    {
                        label: '与えるダメージ補正',
                        value: dmgUpHosei * 100,
                        postfix: '%',
                        limits: {
                            min: dmgConstants.KYOUKA_LIMITS.dmgUpHosei.min * 100,
                            max: dmgConstants.KYOUKA_LIMITS.dmgUpHosei.max * 100
                        }
                    },
                    {
                        label: 'Blast ダメージ補正',
                        value: blastDmgUp * 100,
                        postfix: '%',
                        limits: {
                            min: dmgConstants.KYOUKA_LIMITS.blastDmgUpHosei.min * 100,
                            max: dmgConstants.KYOUKA_LIMITS.blastDmgUpHosei.max * 100
                        }
                    },
                    {
                        label: '補正係数',
                        value: dmgHosei * 100,
                        postfix: '%',
                        limits: {
                            min: dmgConstants.KYOUKA_LIMITS.totalDmgHosei.min * 100,
                            max: dmgConstants.KYOUKA_LIMITS.totalDmgHosei.max * 100
                        }
                    }
                ],
                finalResults: [
                    {
                        label: '補正ダメージ',
                        value: totalDamage,
                        precision: 0
                    },
                    {
                        label: '最終ダメージ MIN',
                        value: finalDamage.min,
                        precision: 0
                    },
                    {
                        label: '最終ダメージ MAX',
                        value: finalDamage.max,
                        precision: 0
                    }
                ]
            },
            index
        );
    };

    return (
        <Container maxWidth='md'>
            <Box mt={3} mb={-1} mx={'auto'} pb={2} borderBottom='1px solid rgba(255, 255, 255, 0.3)'>
                <Box display='inline-block' borderRight='1px solid rgba(255, 255, 255, 0.3)' pr={3} mr={3}>
                    <Typography variant='h4' component='span'>
                        ダメージ計算
                    </Typography>
                </Box>
                <Typography variant='h5' component='span'>
                    {tabInfo.title}
                </Typography>
            </Box>

            <DmgCalcForm index={index} formState={tabInfo.formState} onFormChange={onFormChange} onSubmit={onSubmit} />
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
