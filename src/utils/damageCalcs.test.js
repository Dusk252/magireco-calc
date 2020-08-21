import * as dmgCalcs from './damageCalcs';
import { MIN_BASE_DMG } from '../constants/dmgConst';
import { COMBO_TYPE, DISC_TYPE, QUEST_TYPE } from '../constants/const';

const expectToBeCloseToArray = (actual, expected) => {
    expect(actual.length).toBe(expected.length);
    actual.forEach((x, i) => expect(x).toBeCloseTo(expected[i]));
};

describe('Damage calculations module', function () {
    it('correctly calculates the 実行Atk stat', function () {
        const targetFuncCaller = ({ atkHosei, baseAtk, memoriaAtk, seishinKyoukaAtk, kakuseiPa, jinkeiHosei }) => {
            return dmgCalcs.jikkouAtk(atkHosei, baseAtk, memoriaAtk, seishinKyoukaAtk, kakuseiPa, jinkeiHosei);
        };

        const inputs = [
            { atkHosei: 0, baseAtk: 2000, memoriaAtk: 0, seishinKyoukaAtk: 0, kakuseiPa: 0, jinkeiHosei: 1 },
            { atkHosei: 1, baseAtk: 2000, memoriaAtk: 0, seishinKyoukaAtk: 0, kakuseiPa: 0, jinkeiHosei: 1 },
            { atkHosei: 2, baseAtk: 2000, memoriaAtk: 0, seishinKyoukaAtk: 0, kakuseiPa: 0, jinkeiHosei: 1 },
            { atkHosei: 3, baseAtk: 2000, memoriaAtk: 0, seishinKyoukaAtk: 0, kakuseiPa: 0, jinkeiHosei: 1 },
            { atkHosei: 1, baseAtk: 8000, memoriaAtk: 2000, seishinKyoukaAtk: 500, kakuseiPa: 8, jinkeiHosei: 0 },
            { atkHosei: 1, baseAtk: 8000, memoriaAtk: 2000, seishinKyoukaAtk: 500, kakuseiPa: 8, jinkeiHosei: 1 },
            { atkHosei: 1, baseAtk: 8000, memoriaAtk: 2000, seishinKyoukaAtk: 500, kakuseiPa: 8, jinkeiHosei: 2 },
            { atkHosei: 1, baseAtk: 8000, memoriaAtk: 2000, seishinKyoukaAtk: 500, kakuseiPa: 8, jinkeiHosei: 3 },
            { atkHosei: 2, baseAtk: 8000, memoriaAtk: 2000, seishinKyoukaAtk: 500, kakuseiPa: 8, jinkeiHosei: 2 },
            { atkHosei: 2.5, baseAtk: 8000, memoriaAtk: 2000, seishinKyoukaAtk: 500, kakuseiPa: 8, jinkeiHosei: 3 }
        ];

        const expectedOutputs = [
            2000 * 0.05,
            2000,
            2000 * 2,
            2000 * 2,
            (8000 * 1.08 + 2000 + 500) * 0.9,
            8000 * 1.08 + 2000 + 500,
            (8000 * 1.08 + 2000 + 500) * 1.1,
            (8000 * 1.08 + 2000 + 500) * 1.15,
            (8000 * 1.08 + 2000 + 500) * 2 * 1.1,
            (8000 * 1.08 + 2000 + 500) * 2 * 1.15
        ];

        const outputs = inputs.map((input) => targetFuncCaller(input));

        expectToBeCloseToArray(outputs, expectedOutputs);
    });
    it('correctly calculates the 実行Def stat', function () {
        const targetFuncCaller = ({ defHosei, baseDef, memoriaDef, seishinKyoukaDef, kakuseiPa, jinkeiHosei }) => {
            return dmgCalcs.jikkouDef(defHosei, baseDef, memoriaDef, seishinKyoukaDef, kakuseiPa, jinkeiHosei);
        };

        const inputs = [
            { defHosei: 0, baseDef: 2000, memoriaDef: 0, seishinKyoukaDef: 0, kakuseiPa: 0, jinkeiHosei: 1 },
            { defHosei: 1, baseDef: 2000, memoriaDef: 0, seishinKyoukaDef: 0, kakuseiPa: 0, jinkeiHosei: 1 },
            { defHosei: 2, baseDef: 2000, memoriaDef: 0, seishinKyoukaDef: 0, kakuseiPa: 0, jinkeiHosei: 1 },
            { defHosei: 3, baseDef: 2000, memoriaDef: 0, seishinKyoukaDef: 0, kakuseiPa: 0, jinkeiHosei: 1 },
            { defHosei: 1, baseDef: 8000, memoriaDef: 2000, seishinKyoukaDef: 500, kakuseiPa: 8, jinkeiHosei: 0 },
            { defHosei: 1, baseDef: 8000, memoriaDef: 2000, seishinKyoukaDef: 500, kakuseiPa: 8, jinkeiHosei: 1 },
            { defHosei: 1, baseDef: 8000, memoriaDef: 2000, seishinKyoukaDef: 500, kakuseiPa: 8, jinkeiHosei: 2 },
            { defHosei: 1, baseDef: 8000, memoriaDef: 2000, seishinKyoukaDef: 500, kakuseiPa: 8, jinkeiHosei: 3 },
            { defHosei: 2, baseDef: 8000, memoriaDef: 2000, seishinKyoukaDef: 500, kakuseiPa: 8, jinkeiHosei: 2 },
            { defHosei: 2.5, baseDef: 8000, memoriaDef: 2000, seishinKyoukaDef: 500, kakuseiPa: 8, jinkeiHosei: 3 }
        ];

        const expectedOutputs = [
            2000 * 0.05,
            2000,
            2000 * 2,
            2000 * 2,
            (8000 * 1.08 + 2000 + 500) * 0.9,
            8000 * 1.08 + 2000 + 500,
            (8000 * 1.08 + 2000 + 500) * 1.1,
            (8000 * 1.08 + 2000 + 500) * 1.15,
            (8000 * 1.08 + 2000 + 500) * 2 * 1.1,
            (8000 * 1.08 + 2000 + 500) * 2 * 1.15
        ];

        const outputs = inputs.map((input) => targetFuncCaller(input));

        expectToBeCloseToArray(outputs, expectedOutputs);
    });

    it('correctly calculates base damage', function () {
        const targetFuncCaller = ({ jikkouAtk, jikkouDef }) => {
            return dmgCalcs.baseDmg(jikkouAtk, jikkouDef);
        };

        const inputs = [
            { jikkouAtk: 9000, jikkouDef: 3000 },
            { jikkouAtk: 0, jikkouDef: 99999 },
            { jikkouAtk: 99999, jikkouDef: 0 }
        ];

        const expectedOutputs = [8000, MIN_BASE_DMG, 99999];

        const outputs = inputs.map((input) => targetFuncCaller(input));

        expectToBeCloseToArray(outputs, expectedOutputs);
    });

    it('correctly calculates disc modifier', function () {
        const targetFuncCaller = ({ comboStatus, discType, questType, discSlot }) => {
            return dmgCalcs.discBase(comboStatus, discType, questType, discSlot);
        };

        let inputs = [
            //通常
            { comboStatus: COMBO_TYPE.DEFAULT, discType: DISC_TYPE.ACCELE, questType: QUEST_TYPE.QUEST, discSlot: 1 },
            { comboStatus: COMBO_TYPE.DEFAULT, discType: DISC_TYPE.BLAST, questType: QUEST_TYPE.QUEST, discSlot: 1 },
            { comboStatus: COMBO_TYPE.DEFAULT, discType: DISC_TYPE.CHARGE, questType: QUEST_TYPE.QUEST, discSlot: 1 },
            {
                comboStatus: COMBO_TYPE.PUELLA_OR_BLAST,
                discType: DISC_TYPE.ACCELE,
                questType: QUEST_TYPE.QUEST,
                discSlot: 1
            },
            { comboStatus: COMBO_TYPE.PUELLA_OR_BLAST, discType: DISC_TYPE.BLAST, questType: QUEST_TYPE.QUEST, discSlot: 1 },
            {
                comboStatus: COMBO_TYPE.PUELLA_OR_BLAST,
                discType: DISC_TYPE.CHARGE,
                questType: QUEST_TYPE.QUEST,
                discSlot: 1
            },
            { comboStatus: COMBO_TYPE.PUELLA_BLAST, discType: DISC_TYPE.BLAST, questType: QUEST_TYPE.QUEST, discSlot: 1 },
            { comboStatus: COMBO_TYPE.PUELLA_BLAST, discType: DISC_TYPE.ACCELE, questType: QUEST_TYPE.QUEST, discSlot: 1 },
            { comboStatus: COMBO_TYPE.DEFAULT, discType: DISC_TYPE.BLAST, questType: QUEST_TYPE.QUEST, discSlot: 2 },
            { comboStatus: COMBO_TYPE.PUELLA_OR_BLAST, discType: DISC_TYPE.BLAST, questType: QUEST_TYPE.QUEST, discSlot: 2 },
            { comboStatus: COMBO_TYPE.PUELLA_BLAST, discType: DISC_TYPE.BLAST, questType: QUEST_TYPE.QUEST, discSlot: 2 },
            { comboStatus: COMBO_TYPE.DEFAULT, discType: DISC_TYPE.BLAST, questType: QUEST_TYPE.QUEST, discSlot: 3 },
            { comboStatus: COMBO_TYPE.PUELLA_OR_BLAST, discType: DISC_TYPE.BLAST, questType: QUEST_TYPE.QUEST, discSlot: 3 },
            { comboStatus: COMBO_TYPE.PUELLA_BLAST, discType: DISC_TYPE.BLAST, questType: QUEST_TYPE.QUEST, discSlot: 3 },
            { comboStatus: COMBO_TYPE.DEFAULT, discType: DISC_TYPE.ACCELE, questType: QUEST_TYPE.QUEST, discSlot: 2 },
            { comboStatus: COMBO_TYPE.DEFAULT, discType: DISC_TYPE.CHARGE, questType: QUEST_TYPE.QUEST, discSlot: 3 }
        ];
        //add mirrors version
        inputs = inputs.concat(inputs.map((item) => ({ ...item, questType: QUEST_TYPE.MIRRORS })));

        const expectedOutputs = [
            //通常
            1.0,
            0.6,
            0.8,
            1.2,
            0.9,
            1.2,
            1.2,
            NaN, //might come as 1.0
            0.6 * 1.1,
            0.9 * 1.1,
            1.2 * 1.1,
            0.6 * 1.2,
            0.9 * 1.2,
            1.2 * 1.2,
            1.0,
            0.8,
            //ミラーズ
            1.0,
            0.7,
            0.8,
            1.2,
            1.0,
            1.2,
            1.3,
            NaN, //might come as 1.0
            0.7 * 1.1,
            1.0 * 1.1,
            1.3 * 1.1,
            0.7 * 1.2,
            1.0 * 1.2,
            1.3 * 1.2,
            1.0,
            0.8
        ];

        const outputs = inputs.map((input) => targetFuncCaller(input));

        expect(outputs).toStrictEqual(expectedOutputs);
    });

    it('correctly calculates charge modifier', function () {
        const targetFuncCaller = ({ discType, chargeCount, questType, chargeGoDmgUp }) => {
            return dmgCalcs.chargeHosei(discType, chargeCount, questType, chargeGoDmgUp);
        };

        const inputs = [
            { discType: DISC_TYPE.ACCELE, chargeCount: 0, questType: QUEST_TYPE.QUEST, chargeGoDmgUp: 0 },
            { discType: DISC_TYPE.BLAST, chargeCount: 0, questType: QUEST_TYPE.QUEST, chargeGoDmgUp: 0 },
            { discType: DISC_TYPE.CHARGE, chargeCount: 0, questType: QUEST_TYPE.QUEST, chargeGoDmgUp: 0 },
            { discType: DISC_TYPE.ACCELE, chargeCount: 0, questType: QUEST_TYPE.MIRRORS, chargeGoDmgUp: 0 },
            { discType: DISC_TYPE.BLAST, chargeCount: 0, questType: QUEST_TYPE.MIRRORS, chargeGoDmgUp: 0 },
            { discType: DISC_TYPE.CHARGE, chargeCount: 0, questType: QUEST_TYPE.MIRRORS, chargeGoDmgUp: 0 },
            { discType: DISC_TYPE.ACCELE, chargeCount: 10, questType: QUEST_TYPE.QUEST, chargeGoDmgUp: 0 },
            { discType: DISC_TYPE.BLAST, chargeCount: 10, questType: QUEST_TYPE.QUEST, chargeGoDmgUp: 0 },
            { discType: DISC_TYPE.CHARGE, chargeCount: 10, questType: QUEST_TYPE.QUEST, chargeGoDmgUp: 0 },
            { discType: DISC_TYPE.ACCELE, chargeCount: 10, questType: QUEST_TYPE.MIRRORS, chargeGoDmgUp: 0 },
            { discType: DISC_TYPE.BLAST, chargeCount: 10, questType: QUEST_TYPE.MIRRORS, chargeGoDmgUp: 0 },
            { discType: DISC_TYPE.CHARGE, chargeCount: 10, questType: QUEST_TYPE.MIRRORS, chargeGoDmgUp: 0 },
            { discType: DISC_TYPE.ACCELE, chargeCount: 25, questType: QUEST_TYPE.QUEST, chargeGoDmgUp: 0 },
            { discType: DISC_TYPE.BLAST, chargeCount: 25, questType: QUEST_TYPE.QUEST, chargeGoDmgUp: 0 },
            { discType: DISC_TYPE.ACCELE, chargeCount: 10, questType: QUEST_TYPE.QUEST, chargeGoDmgUp: 0.2 },
            { discType: DISC_TYPE.BLAST, chargeCount: 10, questType: QUEST_TYPE.QUEST, chargeGoDmgUp: 0.2 },
            { discType: DISC_TYPE.ACCELE, chargeCount: 10, questType: QUEST_TYPE.MIRRORS, chargeGoDmgUp: 0.2 },
            { discType: DISC_TYPE.BLAST, chargeCount: 10, questType: QUEST_TYPE.MIRRORS, chargeGoDmgUp: 0.2 },
            { discType: DISC_TYPE.ACCELE, chargeCount: 10, questType: QUEST_TYPE.QUEST, chargeGoDmgUp: 1.8 },
            { discType: DISC_TYPE.BLAST, chargeCount: 10, questType: QUEST_TYPE.QUEST, chargeGoDmgUp: 1.8 }
        ];

        const expectedOutputs = [
            1,
            1,
            1,
            1,
            1,
            1,
            2,
            3.5,
            1,
            2 * 0.9,
            3.5 * 0.9,
            1,
            3,
            5,
            2 * 1.2,
            3.5 * 1.2,
            2 * 1.2 * 0.9,
            3.5 * 1.2 * 0.9,
            5.5,
            5.5
        ];

        const outputs = inputs.map((input) => targetFuncCaller(input));

        expectToBeCloseToArray(outputs, expectedOutputs);
    });

    it('correctly calculates the overall damage modifier', function () {
        const targetFuncCaller = ({
            dmgUpHosei,
            dmgUpJoutaiHosei,
            joutaiIjouDmgUpHosei,
            doppelHosei,
            isDoppel,
            isJoutaiIjou,
            discType,
            blastDmgUp,
            chargeDmgUp
        }) => {
            return dmgCalcs.dmgHoseiTotal(
                dmgUpHosei,
                dmgUpJoutaiHosei,
                joutaiIjouDmgUpHosei,
                doppelHosei,
                isDoppel,
                isJoutaiIjou,
                discType,
                blastDmgUp,
                chargeDmgUp
            );
        };

        const inputs = [
            {
                dmgUpHosei: 0,
                dmgUpJoutaiHosei: 0,
                joutaiIjouDmgUpHosei: 0,
                doppelHosei: 0,
                isDoppel: false,
                isJoutaiIjou: false,
                discType: DISC_TYPE.ACCELE,
                blastDmgUp: 0,
                chargeDmgUp: 0
            },
            {
                dmgUpHosei: 0,
                dmgUpJoutaiHosei: 0,
                joutaiIjouDmgUpHosei: 0,
                doppelHosei: 0,
                isDoppel: false,
                isJoutaiIjou: false,
                discType: DISC_TYPE.ACCELE,
                blastDmgUp: 0.5,
                chargeDmgUp: 0
            },
            {
                dmgUpHosei: 0,
                dmgUpJoutaiHosei: 0,
                joutaiIjouDmgUpHosei: 0,
                doppelHosei: 0,
                isDoppel: false,
                isJoutaiIjou: false,
                discType: DISC_TYPE.BLAST,
                blastDmgUp: 0.5,
                chargeDmgUp: 0
            },
            {
                dmgUpHosei: 1,
                dmgUpJoutaiHosei: 1,
                joutaiIjouDmgUpHosei: 0,
                doppelHosei: 0,
                isDoppel: false,
                isJoutaiIjou: false,
                discType: DISC_TYPE.ACCELE,
                blastDmgUp: 0,
                chargeDmgUp: 0
            },
            {
                dmgUpHosei: 2,
                dmgUpJoutaiHosei: 0,
                joutaiIjouDmgUpHosei: 0,
                doppelHosei: 0,
                isDoppel: false,
                isJoutaiIjou: false,
                discType: DISC_TYPE.ACCELE,
                blastDmgUp: 0,
                chargeDmgUp: 0
            },
            {
                dmgUpHosei: 0,
                dmgUpJoutaiHosei: 2,
                joutaiIjouDmgUpHosei: 0,
                doppelHosei: 0,
                isDoppel: false,
                isJoutaiIjou: false,
                discType: DISC_TYPE.ACCELE,
                blastDmgUp: 0,
                chargeDmgUp: 0
            },
            {
                dmgUpHosei: 1,
                dmgUpJoutaiHosei: 3,
                joutaiIjouDmgUpHosei: 0,
                doppelHosei: 0,
                isDoppel: false,
                isJoutaiIjou: false,
                discType: DISC_TYPE.ACCELE,
                blastDmgUp: 0,
                chargeDmgUp: 0
            },
            {
                dmgUpHosei: 1,
                dmgUpJoutaiHosei: 0,
                joutaiIjouDmgUpHosei: 1,
                doppelHosei: 0,
                isDoppel: false,
                isJoutaiIjou: false,
                discType: DISC_TYPE.ACCELE,
                blastDmgUp: 0,
                chargeDmgUp: 0
            },
            {
                dmgUpHosei: 1,
                dmgUpJoutaiHosei: 0,
                joutaiIjouDmgUpHosei: 1,
                doppelHosei: 0,
                isDoppel: false,
                isJoutaiIjou: true,
                discType: DISC_TYPE.ACCELE,
                blastDmgUp: 0,
                chargeDmgUp: 0
            },
            {
                dmgUpHosei: 1,
                dmgUpJoutaiHosei: 0,
                joutaiIjouDmgUpHosei: 0.2,
                doppelHosei: 0.5,
                isDoppel: true,
                isJoutaiIjou: true,
                discType: DISC_TYPE.MAGIA,
                blastDmgUp: 1,
                chargeDmgUp: 0
            },
            {
                dmgUpHosei: 1,
                dmgUpJoutaiHosei: -2,
                joutaiIjouDmgUpHosei: 0,
                doppelHosei: 0,
                isDoppel: false,
                isJoutaiIjou: false,
                discType: DISC_TYPE.ACCELE,
                blastDmgUp: 0,
                chargeDmgUp: 0
            },
            {
                dmgUpHosei: 2,
                dmgUpJoutaiHosei: -2,
                joutaiIjouDmgUpHosei: 0,
                doppelHosei: 0,
                isDoppel: false,
                isJoutaiIjou: false,
                discType: DISC_TYPE.ACCELE,
                blastDmgUp: 0,
                chargeDmgUp: 0
            },
            {
                dmgUpHosei: 1,
                dmgUpJoutaiHosei: -1,
                joutaiIjouDmgUpHosei: 0,
                doppelHosei: 0,
                isDoppel: false,
                isJoutaiIjou: false,
                discType: DISC_TYPE.ACCELE,
                blastDmgUp: 0,
                chargeDmgUp: 0.5
            },
            {
                dmgUpHosei: 1,
                dmgUpJoutaiHosei: -1,
                joutaiIjouDmgUpHosei: 0,
                doppelHosei: 0,
                isDoppel: false,
                isJoutaiIjou: false,
                discType: DISC_TYPE.CHARGE,
                blastDmgUp: 0,
                chargeDmgUp: 0.5
            }
        ];

        const expectedOutputs = [1, 1, 1.5, 3, 2, 3, 5, 2, 3, 2.7, 0, 0, 1, 1.5];

        const outputs = inputs.map((input) => targetFuncCaller(input));

        expectToBeCloseToArray(outputs, expectedOutputs);
    });

    it('correctly calculates regular disc damage', function () {
        const targetFuncCaller = ({
            baseDmg,
            questType,
            discType,
            discSlot,
            puellaCombo,
            blastCombo,
            discKakusei,
            chargeCount,
            chargeGoDmgUp,
            zokuseiKankei,
            isJoutaiIjou,
            taiseiBairitsuPa,
            dmgHosei,
            isCrit
        }) => {
            return dmgCalcs.totalDmgDisc(
                baseDmg,
                questType,
                discType,
                discSlot,
                puellaCombo,
                blastCombo,
                discKakusei,
                chargeCount,
                chargeGoDmgUp,
                zokuseiKankei,
                isJoutaiIjou,
                taiseiBairitsuPa,
                dmgHosei,
                isCrit
            );
        };

        const inputs = [
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.QUEST,
                discType: DISC_TYPE.ACCELE,
                discSlot: 1,
                puellaCombo: false,
                blastCombo: false,
                discKakusei: 8,
                chargeCount: 0,
                chargeGoDmgUp: 0,
                zokuseiKankei: 0,
                isJoutaiIjou: false,
                taiseiBairitsuPa: 0,
                dmgHosei: 1,
                isCrit: false
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.QUEST,
                discType: DISC_TYPE.ACCELE,
                discSlot: 1,
                puellaCombo: true,
                blastCombo: false,
                discKakusei: 8,
                chargeCount: 10,
                chargeGoDmgUp: 0,
                zokuseiKankei: 1,
                isJoutaiIjou: false,
                taiseiBairitsuPa: 0,
                dmgHosei: 1,
                isCrit: false
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.QUEST,
                discType: DISC_TYPE.BLAST,
                discSlot: 2,
                puellaCombo: true,
                blastCombo: false,
                discKakusei: 8,
                chargeCount: 10,
                chargeGoDmgUp: 0.05,
                zokuseiKankei: 1,
                isJoutaiIjou: false,
                taiseiBairitsuPa: 0,
                dmgHosei: 1,
                isCrit: false
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.QUEST,
                discType: DISC_TYPE.BLAST,
                discSlot: 2,
                puellaCombo: true,
                blastCombo: false,
                discKakusei: 8,
                chargeCount: 10,
                chargeGoDmgUp: 0.05,
                zokuseiKankei: 1,
                isJoutaiIjou: true,
                taiseiBairitsuPa: 0,
                dmgHosei: 1,
                isCrit: false
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.QUEST,
                discType: DISC_TYPE.BLAST,
                discSlot: 2,
                puellaCombo: true,
                blastCombo: false,
                discKakusei: 8,
                chargeCount: 10,
                chargeGoDmgUp: 0.05,
                zokuseiKankei: 0,
                isJoutaiIjou: true,
                taiseiBairitsuPa: 0,
                dmgHosei: 1,
                isCrit: false
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.QUEST,
                discType: DISC_TYPE.BLAST,
                discSlot: 2,
                puellaCombo: true,
                blastCombo: false,
                discKakusei: 8,
                chargeCount: 10,
                chargeGoDmgUp: 0.05,
                zokuseiKankei: 1,
                isJoutaiIjou: false,
                taiseiBairitsuPa: 20,
                dmgHosei: 1,
                isCrit: false
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.QUEST,
                discType: DISC_TYPE.BLAST,
                discSlot: 2,
                puellaCombo: true,
                blastCombo: true,
                discKakusei: 8,
                chargeCount: 10,
                chargeGoDmgUp: 0.05,
                zokuseiKankei: 1,
                isJoutaiIjou: false,
                taiseiBairitsuPa: 20,
                dmgHosei: 3,
                isCrit: false
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.QUEST,
                discType: DISC_TYPE.BLAST,
                discSlot: 2,
                puellaCombo: true,
                blastCombo: false,
                discKakusei: 8,
                chargeCount: 10,
                chargeGoDmgUp: 0.05,
                zokuseiKankei: 1,
                isJoutaiIjou: false,
                taiseiBairitsuPa: 20,
                dmgHosei: 5,
                isCrit: true
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.QUEST,
                discType: DISC_TYPE.CHARGE,
                discSlot: 2,
                puellaCombo: true,
                blastCombo: false,
                discKakusei: 8,
                chargeCount: 10,
                chargeGoDmgUp: 0.05,
                zokuseiKankei: 1,
                isJoutaiIjou: false,
                taiseiBairitsuPa: 20,
                dmgHosei: 2.5,
                isCrit: true
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.KIMOCHISEN,
                discType: DISC_TYPE.ACCELE,
                discSlot: 2,
                puellaCombo: false,
                blastCombo: false,
                discKakusei: 10,
                chargeCount: 0,
                chargeGoDmgUp: 0,
                zokuseiKankei: 1,
                isJoutaiIjou: true,
                taiseiBairitsuPa: 20,
                dmgHosei: 2,
                isCrit: false
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.KIMOCHISEN,
                discType: DISC_TYPE.ACCELE,
                discSlot: 2,
                puellaCombo: true,
                blastCombo: false,
                discKakusei: 8,
                chargeCount: 10,
                chargeGoDmgUp: 0.05,
                zokuseiKankei: 1,
                isJoutaiIjou: true,
                taiseiBairitsuPa: 20,
                dmgHosei: 2,
                isCrit: true
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.KIMOCHISEN,
                discType: DISC_TYPE.ACCELE,
                discSlot: 2,
                puellaCombo: true,
                blastCombo: false,
                discKakusei: 8,
                chargeCount: 0,
                chargeGoDmgUp: 0,
                zokuseiKankei: 0,
                isJoutaiIjou: true,
                taiseiBairitsuPa: 20,
                dmgHosei: 2,
                isCrit: false
            },
            {
                baseDmg: 500,
                questType: QUEST_TYPE.KIMOCHISEN,
                discType: DISC_TYPE.ACCELE,
                discSlot: 2,
                puellaCombo: true,
                blastCombo: false,
                discKakusei: 8,
                chargeCount: 0,
                chargeGoDmgUp: 0,
                zokuseiKankei: 0,
                isJoutaiIjou: true,
                taiseiBairitsuPa: 20,
                dmgHosei: 2,
                isCrit: false
            }
        ];

        const expectedOutputs = [
            16200,
            58320,
            88409.475,
            106091.37,
            58939.65,
            106091.37,
            424365.48,
            424365.48,
            122472,
            78408,
            290993.472,
            34992,
            1166.4
        ];

        const outputs = inputs.map((input) => targetFuncCaller(input));

        expectToBeCloseToArray(outputs, expectedOutputs);
    });

    it('correctly calculates magia disc damage', function () {
        const targetFuncCaller = ({
            baseDmg,
            questType,
            magiaBaseDmg,
            magiaCombo,
            magiaDmgHosei,
            zokuseiKankei,
            isZokuseiKyouka,
            isJoutaiIjou,
            taiseiBairitsuPa,
            dmgHosei
        }) => {
            return dmgCalcs.totalDmgMagia(
                baseDmg,
                questType,
                magiaBaseDmg,
                magiaCombo,
                magiaDmgHosei,
                zokuseiKankei,
                isZokuseiKyouka,
                isJoutaiIjou,
                taiseiBairitsuPa,
                dmgHosei
            );
        };

        const inputs = [
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.QUEST,
                magiaBaseDmg: 350,
                magiaCombo: 1,
                magiaDmgHosei: 1,
                zokuseiKankei: 0,
                isZokuseiKyouka: false,
                isJoutaiIjou: false,
                taiseiBairitsuPa: 0,
                dmgHosei: 1
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.QUEST,
                magiaBaseDmg: 350,
                magiaCombo: 1,
                magiaDmgHosei: 2,
                zokuseiKankei: 0,
                isZokuseiKyouka: false,
                isJoutaiIjou: false,
                taiseiBairitsuPa: 0,
                dmgHosei: 1
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.QUEST,
                magiaBaseDmg: 350,
                magiaCombo: 3,
                magiaDmgHosei: 3,
                zokuseiKankei: 0,
                isZokuseiKyouka: false,
                isJoutaiIjou: false,
                taiseiBairitsuPa: 30,
                dmgHosei: 2.5
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.QUEST,
                magiaBaseDmg: 350,
                magiaCombo: 1,
                magiaDmgHosei: 1,
                zokuseiKankei: 1,
                isZokuseiKyouka: false,
                isJoutaiIjou: false,
                taiseiBairitsuPa: 0,
                dmgHosei: 1
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.QUEST,
                magiaBaseDmg: 350,
                magiaCombo: 1,
                magiaDmgHosei: 1,
                zokuseiKankei: 1,
                isZokuseiKyouka: true,
                isJoutaiIjou: false,
                taiseiBairitsuPa: 0,
                dmgHosei: 1
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.QUEST,
                magiaBaseDmg: 550,
                magiaCombo: 1,
                magiaDmgHosei: 1,
                zokuseiKankei: 1,
                isZokuseiKyouka: true,
                isJoutaiIjou: true,
                taiseiBairitsuPa: 20,
                dmgHosei: 1
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.QUEST,
                magiaBaseDmg: 350,
                magiaCombo: 1,
                magiaDmgHosei: 1,
                zokuseiKankei: 2,
                isZokuseiKyouka: true,
                isJoutaiIjou: true,
                taiseiBairitsuPa: 0,
                dmgHosei: 1
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.KIMOCHISEN,
                magiaBaseDmg: 350,
                magiaCombo: 1,
                magiaDmgHosei: 1,
                zokuseiKankei: 1,
                isZokuseiKyouka: false,
                isJoutaiIjou: false,
                taiseiBairitsuPa: 0,
                dmgHosei: 1
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.KIMOCHISEN,
                magiaBaseDmg: 350,
                magiaCombo: 1,
                magiaDmgHosei: 1,
                zokuseiKankei: 1,
                isZokuseiKyouka: true,
                isJoutaiIjou: false,
                taiseiBairitsuPa: 0,
                dmgHosei: 1
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.KIMOCHISEN,
                magiaBaseDmg: 350,
                magiaCombo: 1,
                magiaDmgHosei: 1,
                zokuseiKankei: 1,
                isZokuseiKyouka: true,
                isJoutaiIjou: true,
                taiseiBairitsuPa: 0,
                dmgHosei: 1
            },
            {
                baseDmg: 15000,
                questType: QUEST_TYPE.MIRRORS,
                magiaBaseDmg: 350,
                magiaCombo: 1,
                magiaDmgHosei: 1,
                zokuseiKankei: 0,
                isZokuseiKyouka: false,
                isJoutaiIjou: false,
                taiseiBairitsuPa: 0,
                dmgHosei: 1
            }
        ];

        const expectedOutputs = [52500, 105000, 409500, 78750, 157500, 356400, 26250, 86625, 162750, 195300, 36750];

        const outputs = inputs.map((input) => targetFuncCaller(input));

        expectToBeCloseToArray(outputs, expectedOutputs);
    });
});
