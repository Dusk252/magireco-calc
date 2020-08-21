//攻撃力UP
export const atkUp = (effectLvl) => {
    return effectLvl * 0.05;
};

//瀕死時攻撃力UP
export const hinshiAtkUp = (effectLvl) => {
    return effectLvl * 0.05 + 0.05;
};

//防御力DOWN
export const defDown = (effectLvl) => {
    return effectLvl * 0.05;
};

//与えるダメージUP
export const dealtDmgUp = (effectLvl) => {
    return effectLvl * 0.05;
};

//Accele MPUP
export const acceleMpUp = (effectLvl) => {
    return effectLvl * 0.025 + 0.075;
};

//Blast ダメージUP
export const blastDmgUp = (effectLvl) => {
    return effectLvl * 0.05 + 0.1;
};

//Charge後ダメージUP
export const chargeGoDmgUp = (effectLvl) => {
    return effectLvl * 0.025 + 0.025;
};

//マギアダメージUP
export const magiaDmgUp = (effectLvl) => {
    return effectLvl * 0.025 + 0.025;
};

//MP獲得量UP
export const mpUp = (effectLvl) => {
    return effectLvl * 0.025 + 0.025;
};

//弱点属性MPUP倍率
export const mpUpDefWeak = (effectLvl) => {
    return effectLvl * 0.01 + 0.01;
};

//ダメージアップ状態
export const damageUp = (effectLvl) => {
    return effectLvl * 0.05;
};

//敵状態異常時ダメージUP
export const joutaiIjouDmgUp = (effectLvl) => {
    return effectLvl * 0.05 + 0.1;
};
