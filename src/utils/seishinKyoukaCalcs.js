import * as memoriaCalcs from './memoriaCalcs';

//攻撃力UP
export const atkUp = (effectLvl) => {
    return memoriaCalcs.atkUp(effectLvl);
};

//防御力DOWN
export const defDown = (effectLvl) => {
    return memoriaCalcs.defDown(effectLvl);
};

//与えるダメージUP
export const dealtDmgUp = (effectLvl) => {
    return memoriaCalcs.dealtDmgUp(effectLvl);
};

//Accele MPUP
export const acceleMpUp = (effectLvl) => {
    return memoriaCalcs.acceleMpUp(effectLvl);
};

//ChargeディスクダメージUP
export const chargeDiscDmgUp = (effectLvl) => {
    return effectLvl * 0.05;
};

//Blast ダメージUP
export const blastDmgUpAbility = (effectLvl) => {
    switch (effectLvl) {
        case 2:
            return 0.165;
        case 3:
            return 0.2;
        case 4:
            return 0.25;
        default:
            return 0;
    }
};
export const blastDmgUpSkill = (effectLvl) => {
    switch (effectLvl) {
        case 3:
            return 0.25;
        case 5:
            return 0.3;
        case 6:
            return 0.4;
        case 9:
            return 0.5;
        default:
            return 0;
    }
};

//Charge後ダメージUP
export const chargeGoDmgUpAbility = (effectLvl) => {
    return effectLvl * 0.025 + 0.05;
};

export const chargeGoDmgUpSkill = (effectLvl) => {
    return memoriaCalcs.chargeGoDmgUp(effectLvl);
};

//マギアダメージUP
export const magiaDmgUp = (effectLvl) => {
    return memoriaCalcs.magiaDmgUp(effectLvl);
};

//ドッペルダメージUP
export const doppelDmgUp = (effectLvl) => {
    return effectLvl * 0.05;
};

//MP獲得量UP
export const mpUp = (effectLvl) => {
    return memoriaCalcs.mpUp(effectLvl);
};

//被ダメージ時MPUP
export const mpUpDef = (effectLvl) => {
    return effectLvl * 0.01;
};

//弱点属性MPUP倍率
export const mpUpDefWeak = (effectLvl) => {
    return memoriaCalcs.mpUpDefWeak(effectLvl);
};

//MP100以上時MP獲得量UP
export const mpUpOver100 = (effectLvl) => {
    switch (effectLvl) {
        case 1:
            return 0.15;
        case 2:
            return 0.2;
        case 3:
            return 0.22;
        case 4:
            return 0.24;
        default:
            return 0;
    }
};

//ダメージアップ状態
export const damageUp = (effectLvl) => {
    return memoriaCalcs.damageUp(effectLvl);
};

//瀕死時攻撃力UP
export const hinshiAtkUp = (effectLvl) => {
    return memoriaCalcs.hinshiAtkUp(effectLvl);
};

//対魔女ダメージアップ
export const antiWitchDmgUp = (effectLvl) => {
    return effectLvl * 0.05;
};

//敵状態異常時ダメージUP
export const joutaiIjouDmgUp = (effectLvl) => {
    return memoriaCalcs.joutaiIjouDmgUp(effectLvl);
};
