import {
    JINKEI_MAP,
    MAGIA_COMBO_MAP,
    DISC_MAP,
    BLAST_MOD,
    ZOKUSEI_MAP,
    JOUTAI_IJOU_YUURI,
    ZOKUSEI_KYOUKA_MAGIA_MAP,
    KYOUKA_LIMITS
} from '../constants/dmgConst';

const ChargeHoseiTable = {
    accele: {
        0: 1,
        1: 1.1,
        2: 1.2,
        3: 1.3,
        4: 1.4,
        5: 1.5,
        6: 1.6,
        7: 1.7,
        8: 1.8,
        9: 1.9,
        10: 2.0,
        11: 2.1,
        12: 2.2,
        13: 2.3,
        14: 2.4,
        15: 2.5,
        16: 2.6,
        17: 2.7,
        18: 2.8,
        19: 2.9,
        20: 3.0
    },
    blast: {
        0: 1,
        1: 1.4,
        2: 1.7,
        3: 2.0,
        4: 2.3,
        5: 2.5,
        6: 2.7,
        7: 2.9,
        8: 3.1,
        9: 3.3,
        10: 3.5,
        11: 3.7,
        12: 3.9,
        13: 4.1,
        14: 4.3,
        15: 4.5,
        16: 4.6,
        17: 4.7,
        18: 4.8,
        19: 4.9,
        20: 5.0
    }
};

//攻撃力補正
export const atkHosei = (atkUp) => {
    return 1 + atkUp;
};

//防御力補正
export const defHosei = (defUp) => {
    return 1 - defUp;
};

//マギアダメージ補正
export const magiaHosei = (magiaUp) => {
    return 1 + magiaUp;
};

//ドッペルダメージ補正
export const doppelHosei = (doppelUp) => {
    return doppelUp;
};

//与えるダメージUP補正
export const dmgUpHosei = (dmgUp) => {
    return dmgUp;
};

//補正係数合計
export const dmgHoseiTotal = (
    dmgUpHosei,
    dmgUpJoutaiHosei,
    joutaiIjouDmgUpHosei,
    doppelHosei,
    isDoppel,
    isJoutaiIjou,
    discType,
    blastDmgUp
    //chargeDmgUp
) => {
    return (
        1 +
        Math.min(Math.max(dmgUpHosei, KYOUKA_LIMITS.dmgUpHosei.min), KYOUKA_LIMITS.dmgUpHosei.max) +
        dmgUpJoutaiHosei +
        (discType === 'blast'
            ? Math.min(Math.max(blastDmgUp, KYOUKA_LIMITS.blastDmgUpHosei.min), KYOUKA_LIMITS.blastDmgUpHosei.max)
            : 0) +
        // (discType === 'charge'
        //     ? Math.min(Math.max(chargeDmgUp, KYOUKA_LIMITS.chargeDmgUpHosei.min), KYOUKA_LIMITS.chargeDmgUpHosei.max)
        //     : 0) +
        (isJoutaiIjou ? joutaiIjouDmgUpHosei : 0) +
        (isDoppel ? Math.min(Math.max(doppelHosei, KYOUKA_LIMITS.doppelHosei.min), KYOUKA_LIMITS.doppelHosei.max) : 0)
    );
};

//実行Atk
export const jikkouAtk = (atkHosei, baseAtk, memoriaAtk, seishinKyoukaAtk, kakuseiPa, jinkeiHosei) => {
    return (
        (baseAtk * (1 + kakuseiPa * 0.01) + memoriaAtk + seishinKyoukaAtk) *
        Math.min(Math.max(atkHosei, KYOUKA_LIMITS.atkHosei.min), KYOUKA_LIMITS.atkHosei.max) *
        JINKEI_MAP[jinkeiHosei]
    );
};

//実行Def
export const jikkouDef = (defHosei, baseDef, memoriaDef = 0, seishinKyoukaDef = 0, kakuseiPa = 0, jinkeiHosei = 1) => {
    return (
        (baseDef * (1 + kakuseiPa * 0.01) + memoriaDef + seishinKyoukaDef) *
        Math.min(Math.max(defHosei, KYOUKA_LIMITS.defHosei.min), KYOUKA_LIMITS.defHosei.max) *
        jinkeiHosei
    );
};

//基礎ダメージ
export const baseDmg = (jikkouAtk, jikkouDef) => {
    return Math.max(jikkouAtk - jikkouDef / 3, 500);
};

//通常の攻撃の補正ダメージ
export const totalDmgDisc = (
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
) => {
    let comboStatus =
        puellaCombo && blastCombo && discType === 'blast'
            ? 'puellaBlastCombo'
            : puellaCombo || blastCombo
            ? 'puellaOrBlastCombo'
            : 'default';
    return Math.max(
        baseDmg *
            (DISC_MAP[comboStatus][discType] + (questType === 'mirrors' && discType === 'blast') ? 0.1 : 0) *
            (discType === 'blast' ? BLAST_MOD[discSlot] : 1) *
            (1 + discKakusei) *
            Math.min(
                discType === 'accele' || discType === 'blast'
                    ? ChargeHoseiTable[discType][Math.min(chargeCount, 20)] *
                          (questType === 'mirrors' ? 0.9 : 1) *
                          (1 + chargeGoDmgUp)
                    : 1,
                5.5
            ) *
            ZOKUSEI_MAP[questType][zokuseiKankei] *
            (zokuseiKankei == 1 && isJoutaiIjou ? JOUTAI_IJOU_YUURI : 1) *
            (1 + taiseiBairitsuPa * 0.01) *
            (Math.min(Math.max(dmgHosei, KYOUKA_LIMITS.totalDmgHosei.min), KYOUKA_LIMITS.totalDmgHosei.max) +
                (isCrit ? (dmgHosei > 1 ? 1 : dmgHosei) : 0)) *
            (questType === 'mirrors' ? 0.7 : 1),
        250
    );
};

//マギア/ドッペルの補正ダメージ
export const totalDmgMagia = (
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
) => {
    console.log(
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
    return (
        Math.max(
            baseDmg *
                (magiaBaseDmg * 0.01) *
                MAGIA_COMBO_MAP[magiaCombo] *
                Math.min(Math.max(magiaDmgHosei, KYOUKA_LIMITS.magiaHosei.min), KYOUKA_LIMITS.magiaHosei.max),
            500
        ) *
        (zokuseiKankei == 1 && isZokuseiKyouka
            ? ZOKUSEI_KYOUKA_MAGIA_MAP[questType]
            : ZOKUSEI_MAP[questType][zokuseiKankei]) *
        (zokuseiKankei == 1 && isJoutaiIjou ? JOUTAI_IJOU_YUURI : 1) *
        (1 + taiseiBairitsuPa * 0.01) *
        Math.min(Math.max(dmgHosei, KYOUKA_LIMITS.totalDmgHosei.min), KYOUKA_LIMITS.totalDmgHosei.max) *
        (questType === 'mirrors' ? 0.7 : 1)
    );
};
