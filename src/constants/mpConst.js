import { DISC_TYPE, QUEST_TYPE } from './const';

export const INITIAL_VALUES = {
    [QUEST_TYPE.QUEST]: {
        [DISC_TYPE.ACCELE]: {
            1: 10,
            2: 10.5,
            3: 14
        },
        [DISC_TYPE.BLAST]: {
            1: 0,
            2: 0,
            3: 0
        },
        [DISC_TYPE.CHARGE]: {
            1: 2,
            2: 3,
            3: 4
        }
    },
    [QUEST_TYPE.MIRRORS]: {
        [DISC_TYPE.ACCELE]: {
            1: 13.5,
            2: 15.75,
            3: 21
        },
        [DISC_TYPE.BLAST]: {
            1: 0,
            2: 0,
            3: 0
        },
        [DISC_TYPE.CHARGE]: {
            1: 3,
            2: 4.5,
            3: 6
        }
    }
};

export const CHAR_TYPES_MP_MOD = {
    magia: 1.2,
    support: 1.2,
    attack: 1,
    heal: 1,
    balance: 0.9,
    defense: 0.8
};

export const CHAR_TYPES_MP_MOD_DEF = {
    magia: 1.2,
    support: 1,
    attack: 0.8,
    heal: 1.2,
    balance: 0.9,
    defense: 1
};

export const CHAR_TYPE_DROPDOWN = [
    {
        value: 'magia',
        text: 'マギア'
    },
    {
        value: 'support',
        text: 'サポート'
    },
    {
        value: 'attack',
        text: 'アタック'
    },
    {
        value: 'heal',
        text: 'ヒール'
    },
    {
        value: 'balance',
        text: 'バランス'
    },
    {
        value: 'defense',
        text: 'ディフェンス'
    }
];

export const DISC_TYPE_DROPDOWN = [
    {
        value: DISC_TYPE.ACCELE,
        text: 'アクセル'
    },
    {
        value: DISC_TYPE.BLAST,
        text: 'ブラスト'
    },
    {
        value: DISC_TYPE.CHARGE,
        text: 'チャージ'
    }
];
