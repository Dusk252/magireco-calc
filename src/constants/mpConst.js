export const INITIAL_VALUES = {
    default: {
        accele: {
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
    },
    mirrors: {
        accele: {
            1: 13.5,
            2: 15.75,
            3: 21
        },
        blast: {
            1: 0,
            2: 0,
            3: 0
        },
        charge: {
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
        value: 'accele',
        text: 'アクセル'
    },
    {
        value: 'blast',
        text: 'ブラスト'
    },
    {
        value: 'charge',
        text: 'チャージ'
    }
];
