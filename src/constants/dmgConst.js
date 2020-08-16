import { DISC_TYPE, QUEST_TYPE, COMBO_TYPE } from './const';

export const MIN_TOTAL_DMG = 250;
export const MIN_MAGIA_DMG = 500;
export const MIN_BASE_DMG = 500;
export const MAX_DMG = 9999999;

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
    },
    {
        value: DISC_TYPE.MAGIA,
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
        value: QUEST_TYPE.QUEST,
        text: 'クエスト'
    },
    {
        value: QUEST_TYPE.MIRRORS,
        text: 'ミラーズ'
    },
    {
        value: QUEST_TYPE.KIMOCHISEN,
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

export const DISC_MAP = {
    [COMBO_TYPE.DEFAULT]: {
        [DISC_TYPE.ACCELE]: 1.0,
        [DISC_TYPE.BLAST]: 0.6,
        [DISC_TYPE.CHARGE]: 0.8
    },
    [COMBO_TYPE.PUELLA_OR_BLAST]: {
        [DISC_TYPE.ACCELE]: 1.2,
        [DISC_TYPE.BLAST]: 0.9,
        [DISC_TYPE.CHARGE]: 1.2
    },
    [COMBO_TYPE.PUELLA_BLAST]: {
        [DISC_TYPE.BLAST]: 1.2
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
    [QUEST_TYPE.QUEST]: {
        0: 1,
        1: 1.5,
        2: 0.5
    },
    [QUEST_TYPE.MIRRORS]: {
        0: 1,
        1: 1.5,
        2: 0.5
    },
    [QUEST_TYPE.KIMOCHISEN]: {
        0: 0.75,
        1: 1.65,
        2: 0.5
    }
};

export const JOUTAI_IJOU_YUURI = 1.2;

export const ZOKUSEI_KYOUKA_MAGIA_MAP = {
    [QUEST_TYPE.QUEST]: 3,
    [QUEST_TYPE.MIRRORS]: 3,
    [QUEST_TYPE.KIMOCHISEN]: 3.1
};

export const KYOUKA_LIMITS = {
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
    blastDmgUpHosei: {
        min: -0.95,
        max: 1
    },
    chargeDmgUpHosei: {
        min: -0.95,
        max: 1
    },
    totalDmgHosei: {
        min: 0.3,
        max: 3
    }
};
