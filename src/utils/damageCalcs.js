export const kyoukaLimits = {
    atkHosei: {
        min: 0.05,
        max: 2
    },
    defHosei: {
        min: 0.05,
        max: 2
    },
    magiaHosei: {
        min: 0.05,
        max: 2
    },
    doppelHosei: {
        min: -0.95,
        max: 1
    },
    dmgUpHosei: {
        min: -0.95,
        max: 1
    },
    totalDmgHosei: {
        min: 0.3,
        max: 3
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
export const dmgHoseiTotal = (dmgUpHosei, dmgUpJoutaiHosei, joutaiIjouDmgUpHosei, doppelHosei, isDoppel, isJoutaiIjou) => {
    return (
        1 +
        Math.min(Math.max(dmgUpHosei, kyoukaLimits.dmgUpHosei.min), kyoukaLimits.dmgUpHosei.max) +
        dmgUpJoutaiHosei +
        (isJoutaiIjou ? joutaiIjouDmgUpHosei : 0) +
        (isDoppel ? Math.min(Math.max(doppelHosei, kyoukaLimits.doppelHosei.min), kyoukaLimits.doppelHosei.max) : 0)
    );
};

//実行Atk
export const jikkouAtk = (atkHosei, baseAtk, memoriaAtk, seishinKyoukaAtk, kakuseiPa, jinkeiHosei) => {
    return (
        (baseAtk * (1 + kakuseiPa * 0.01) + memoriaAtk + seishinKyoukaAtk) *
        Math.min(Math.max(atkHosei, kyoukaLimits.atkHosei.min), kyoukaLimits.atkHosei.max) *
        jinkeiHosei
    );
};

//実行Def
export const jikkouDef = (defHosei, baseDef, memoriaDef = 0, seishinKyoukaDef = 0, kakuseiPa = 0, jinkeiHosei = 1) => {
    return (
        (baseDef * (1 + kakuseiPa * 0.01) + memoriaDef + seishinKyoukaDef) *
        Math.min(Math.max(defHosei, kyoukaLimits.defHosei.min), kyoukaLimits.defHosei.max) *
        jinkeiHosei
    );
};

//基礎ダメージ
export const baseDmg = (jikkouAtk, jikkouDef) => {
    return jikkouAtk - jikkouDef / 3;
};

//マギア基礎ダメージ
export const magiaBaseDmg = (magiaDmg, magiaLvl, isDoppel = false) => {
    return isDoppel ? magiaDmg / 100 : magiaDmg / 100 + magiaLvl * 0.1;
};

//補正ダメージ
export const totalDmg = (
    baseDmg,
    magiaBaseDmg,
    magiaComboHosei,
    magiaDmgHosei,
    zokuseiHosei,
    taiseiBairitsuPa,
    dmgHosei
) => {
    return (
        baseDmg *
        magiaBaseDmg *
        magiaComboHosei *
        Math.min(Math.max(magiaDmgHosei, kyoukaLimits.magiaHosei.min), kyoukaLimits.magiaHosei.max) *
        zokuseiHosei *
        (1 + taiseiBairitsuPa * 0.01) *
        Math.min(Math.max(dmgHosei, kyoukaLimits.totalDmgHosei.min), kyoukaLimits.totalDmgHosei.max)
    );
};
