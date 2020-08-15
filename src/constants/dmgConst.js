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
    },
    {
        value: 'magia',
        text: 'マギア'
    }
];

export const ZOKUSEI_DROPDOWN = [
    {
        value: '0',
        text: '有利不利なし'
    },
    {
        value: '1',
        text: '有利'
    },
    {
        value: '2',
        text: '不利'
    }
];

export const JINKEI_DROPDOWN = [
    {
        value: '0',
        text: '攻撃力減少[Ⅰ]'
    },
    {
        value: '1',
        text: 'なし'
    },
    {
        value: '2',
        text: '攻撃力上昇[Ⅰ]'
    },
    {
        value: '3',
        text: '攻撃力上昇[II]'
    }
];

export const QUEST_TYPE_OPTIONS = [
    {
        value: 'quest',
        text: 'クエスト'
    },
    {
        value: 'mirrors',
        text: 'ミラーズ'
    },
    {
        value: 'kimochisen',
        text: 'キモチ戦'
    }
];

export const MAGIA_COMBO_DROPDOWN = [
    {
        value: '1',
        text: '1つ目'
    },
    {
        value: '2',
        text: '2つ目'
    },
    {
        value: '3',
        text: '3つ目'
    }
];

//TO DO: mirrors
export const DISC_MAP = {
    default: {
        accele: 1.0,
        blast: 0.6,
        charge: 0.8
    },
    puellaOrBlastCombo: {
        accele: 1.2,
        blast: 0.9,
        charge: 1.2
    },
    puellaBlastCombo: {
        blast: 1.2
    }
};

export const BLAST_MOD = {
    1: 1,
    2: 1.1,
    3: 1.2
};

export const JINKEI_MAP = {
    0: 0.9,
    1: 1,
    2: 1.1,
    3: 1.15
};

export const MAGIA_COMBO_MAP = {
    1: 1,
    2: 1.1,
    3: 1.2
};

export const ZOKUSEI_MAP = {
    quest: {
        0: 1,
        1: 1.5,
        2: 0.5
    },
    mirrors: {
        0: 1,
        1: 1.5,
        2: 0.5
    },
    kimochisen: {
        0: 0.75,
        1: 1.65,
        2: 0.5
    }
};

export const JOUTAI_IJOU_YUURI = 1.2;

export const ZOKUSEI_KYOUKA_MAGIA_MAP = {
    quest: 3,
    mirrors: 3,
    kimochisen: 3.1
};
