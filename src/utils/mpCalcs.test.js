import * as mpCalcs from './mpCalcs';
import { DISC_TYPE, QUEST_TYPE } from '../constants/const';

const expectToBeCloseToArray = (actual, expected) => {
    expect(actual.length).toBe(expected.length);
    actual.forEach((x, i) => expect(x).toBeCloseTo(expected[i]));
};

describe('MP calculations module', function () {
    it('correctly calculates the MP on attack', function () {
        const targetFuncCaller = ({ acceleBonus, mirrors, discSlot, discType, charType, mpUp, acceleMpUp, chargeCount }) => {
            return mpCalcs.mpCalc(acceleBonus, mirrors, discSlot, discType, charType, mpUp, acceleMpUp, chargeCount);
        };

        const inputs = [
            {
                acceleBonus: true,
                mirrors: false,
                discSlot: 1,
                discType: DISC_TYPE.ACCELE,
                charType: 'magia',
                mpUp: 0,
                acceleMpUp: 0,
                chargeCount: 0
            },
            {
                acceleBonus: true,
                mirrors: false,
                discSlot: 2,
                discType: DISC_TYPE.BLAST,
                charType: 'magia',
                mpUp: 0,
                acceleMpUp: 0,
                chargeCount: 0
            },
            {
                acceleBonus: false,
                mirrors: false,
                discSlot: 3,
                discType: DISC_TYPE.ACCELE,
                charType: 'magia',
                mpUp: 0,
                acceleMpUp: 0,
                chargeCount: 10
            },
            {
                acceleBonus: true,
                mirrors: false,
                discSlot: 3,
                discType: DISC_TYPE.CHARGE,
                charType: 'balance',
                mpUp: 0,
                acceleMpUp: 0,
                chargeCount: 10
            },
            {
                acceleBonus: false,
                mirrors: false,
                discSlot: 1,
                discType: DISC_TYPE.BLAST,
                charType: 'attack',
                mpUp: 0,
                acceleMpUp: 0,
                chargeCount: 10
            },
            {
                acceleBonus: true,
                mirrors: true,
                discSlot: 2,
                discType: DISC_TYPE.ACCELE,
                charType: 'magia',
                mpUp: 0,
                acceleMpUp: 0,
                chargeCount: 0
            },
            {
                acceleBonus: true,
                mirrors: false,
                discSlot: 1,
                discType: DISC_TYPE.ACCELE,
                charType: 'magia',
                mpUp: 0.5,
                acceleMpUp: 0,
                chargeCount: 0
            },
            {
                acceleBonus: true,
                mirrors: false,
                discSlot: 2,
                discType: DISC_TYPE.BLAST,
                charType: 'magia',
                mpUp: 0.5,
                acceleMpUp: 0.5,
                chargeCount: 0
            },
            {
                acceleBonus: false,
                mirrors: false,
                discSlot: 3,
                discType: DISC_TYPE.ACCELE,
                charType: 'magia',
                mpUp: 0.2,
                acceleMpUp: 0,
                chargeCount: 10
            },
            {
                acceleBonus: true,
                mirrors: false,
                discSlot: 3,
                discType: DISC_TYPE.ACCELE,
                charType: 'balance',
                mpUp: 0,
                acceleMpUp: 0.2,
                chargeCount: 10
            },
            {
                acceleBonus: true,
                mirrors: false,
                discSlot: 3,
                discType: DISC_TYPE.CHARGE,
                charType: 'balance',
                mpUp: 0,
                acceleMpUp: 0.2,
                chargeCount: 10
            },
            {
                acceleBonus: false,
                mirrors: false,
                discSlot: 1,
                discType: DISC_TYPE.BLAST,
                charType: 'attack',
                mpUp: 1,
                acceleMpUp: 1,
                chargeCount: 10
            },
            {
                acceleBonus: true,
                mirrors: true,
                discSlot: 1,
                discType: DISC_TYPE.ACCELE,
                charType: 'magia',
                mpUp: 1,
                acceleMpUp: 0.5,
                chargeCount: 0
            }
        ];

        const expectedOutputs = [
            10 * 1.2,
            3 * 1.2,
            14 * 1.2 * 3.5,
            7 * 0.9,
            0,
            18.75 * 1.2,
            10 * 1.2 * 1.5,
            3 * 1.2 * 1.5 * 1.5,
            14 * 1.2 * 1.2 * 3.5,
            17 * 0.9 * 1.2 * 3.5,
            7 * 0.9 * 1.2,
            0,
            13.5 * 1.2 * 2 * 1.5
        ];

        const outputs = inputs.map((input) => targetFuncCaller(input));

        expectToBeCloseToArray(outputs, expectedOutputs);
    });

    it('correctly calculates the MP on defense', function () {
        const targetFuncCaller = ({ charType, mpUp, mpUpDefWeak, questType }) => {
            return mpCalcs.mpCalcOnDef(charType, mpUp, mpUpDefWeak, questType);
        };

        const inputs = [
            { charType: 'magia', mpUp: 0, mpUpDefWeak: 0, questType: QUEST_TYPE.QUEST },
            { charType: 'attack', mpUp: 0.5, mpUpDefWeak: 0.9, questType: QUEST_TYPE.QUEST },
            { charType: 'balance', mpUp: 0, mpUpDefWeak: 0, questType: QUEST_TYPE.MIRRORS },
            { charType: 'defense', mpUp: 0, mpUpDefWeak: 0.5, questType: QUEST_TYPE.QUEST },
            { charType: 'heal', mpUp: 0.6, mpUpDefWeak: 0, questType: QUEST_TYPE.QUEST }
        ];

        const expectedOutputs = [4 * 1.2, 4 * 0.8 * 1.5 * 1.9, 6 * 0.9, 4 * 1 * 1.5, 4 * 1.2 * 1.6];

        const outputs = inputs.map((input) => targetFuncCaller(input));

        expectToBeCloseToArray(outputs, expectedOutputs);
    });
});
