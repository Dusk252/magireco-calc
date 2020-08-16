import { INITIAL_VALUES, CHAR_TYPES_MP_MOD, CHAR_TYPES_MP_MOD_DEF } from '../constants/mpConst';
import { QUEST_TYPE, DISC_TYPE } from '../constants/const';

const CMPTable = {
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

export const mpCalc = (acceleBonus, mirrors, discSlot, discType, charType, mpUp, acceleMpUp, chargeCount) => {
    return (
        (INITIAL_VALUES[mirrors ? QUEST_TYPE.MIRRORS : QUEST_TYPE.QUEST][discType][discSlot] +
            (acceleBonus && discSlot != 1 ? 3 : 0)) *
        CHAR_TYPES_MP_MOD[charType] *
        (1 + mpUp) *
        (1 + acceleMpUp) *
        (discType === DISC_TYPE.ACCELE ? CMPTable[Math.min(chargeCount, 20)] : 1)
    );
};

export const mpCalcOnDef = (charType, mpUp, mpUpDef, questType) => {
    return (questType === QUEST_TYPE.MIRRORS ? 6 : 4) * CHAR_TYPES_MP_MOD_DEF[charType] * (1 + mpUp) * (1 + mpUpDef);
};
