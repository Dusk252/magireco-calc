export const CMPTable = {
    0: 1,
    1: 1.3,
    2: 1.6,
    3: 1.9,
    4: 2.2,
    5: 2.5,
    6: 2.7,
    7: 2.9,
    8: 3.1,
    9: 3.3,
    10: 3.5,
    11: 3.9,
    12: 4.3,
    13: 4.7,
    14: 5.1,
    15: 5.5,
    16: 6.0,
    17: 6.5,
    18: 7.0,
    19: 7.5,
    20: 8.0
};

export const initialValues = {
    accel: {
        1: 10,
        2: 10.5,
        3: 14
    },
    blast: {
        1: 0,
        2: 0,
        3: 0
    },
    charge: {
        1: 2,
        2: 3,
        3: 4
    }
};

export const charTypesMpMod = {
    magia: 1.2,
    support: 1.2,
    attack: 1,
    heal: 1,
    balance: 0.9,
    defense: 0.8
};

export const mpCalc = (accelCombo, discSlot, discType, charType, mpUp, accelMpUp, chargeCount) => {
    return (
        (initialValues[discType][discSlot] + (accelCombo && discSlot != 1 ? 3 : 0)) *
        charTypesMpMod[charType] *
        (1 + mpUp) *
        (1 + accelMpUp) *
        CMPTable[Math.min(chargeCount, 20)]
    );
};

export const mpCalcOnDef = (charType, mpUp, mpUpDef) => {
    return 4 * charTypesMpMod[charType] * mpUp * mpUpDef;
};
