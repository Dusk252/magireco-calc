//攻撃力UP
export const atkUp = (effectLvl) => {
    return effectLvl * 0.025 + 0.175;
};

//与えるダメージUP
export const dealtDmgUp = (effectLvl) => {
    return effectLvl * 0.025 + 0.175;
};

//Accele MPUP
export const accelMpUp = (effectLvl) => {
    return effectLvl * 0.05 + 0.05;
};

//Blast ダメージUP
export const blastDmgUp = (effectLvl) => {
    return effectLvl * 0.05 + 0.35;
};

//Charge後ダメージUP
export const chargeGoDmgUp = (effectLvl) => {
    return effectLvl * 0.025 + 0.075;
};

//マギアダメージUP
//TO DO - assuming same as memoria - need to check eventually
export const magiaDmgUp = (effectLvl) => {
    return effectLvl * 0.025 + 0.025;
};

//MP獲得量UP
export const mpUp = (effectLvl) => {
    return effectLvl * 0.025 + 0.075;
};

//敵状態異常時ダメージUP
export const joutaiIjouDmgUp = (effectLvl) => {
    return effectLvl * 0.025 + 0.25;
};
