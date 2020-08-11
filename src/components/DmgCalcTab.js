import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import * as damageCalcs from '../utils/damageCalcs';
import * as memoriaCalcs from '../utils/memoriaCalcs';
import ReactDOM from 'react-dom';

//import './../styles.css';

let renderCount = 0;

const DamageCalcTab = () => {
    const { register, control, handleSubmit, reset, getValues } = useForm({
        defaultValues: {
            atk: 0,
            atkKakusei: 0,
            atkMemoria: 0,
            atkEnhance: 0,
            def: 0,
            defKakusei: 0,
            defMemoria: 0,
            defEnhance: 0,
            zokuseiHosei: '0',
            kimochiSen: false,
            jinkeiAtk: '0',
            magiaDoppel: 'magia',
            magiaDmg: 0,
            magiaLvl: '1',
            magiaCombo: '1',
            zokuseiKyoukaMagia: false,
            atkUpPa: 0,
            defDownPa: 0,
            dmgUpPa: 0,
            dmgUpJoutaiPa: 0,
            joutaiIjouDmgUpPa: 0,
            magiaDmgUpPa: 0,
            doppelDmgUpPa: 0,
            taiseiBairitsuPa: 0
        }
    });
    const atkHoseiMemoria = useFieldArray({
        control,
        name: 'atkHoseiMemoria'
    });
    const dmgUpMemoria = useFieldArray({
        control,
        name: 'dmgUpMemoria'
    });
    const dmgUpJoutaiMemoria = useFieldArray({
        control,
        name: 'dmgUpJoutaiMemoria'
    });
    const joutaiIjouDmgUpMemoria = useFieldArray({
        control,
        name: 'joutaiIjouDmgUpMemoria'
    });
    const magiaDmgUpMemoria = useFieldArray({
        control,
        name: 'magiaDmgUpMemoria'
    });
    const defHoseiMemoria = useFieldArray({
        control,
        name: 'defHoseiMemoria'
    });
    const doppelDmgUp = useFieldArray({
        control,
        name: 'doppelDmgUp'
    });

    const magiaComboMap = {
        '1': 1,
        '2': 1.1,
        '3': 1.2
    };
    const jinkeiMap = {
        '0': 1,
        '1': 1.1,
        '2': 1.15
    };
    const zokuseiMap = {
        default: {
            '0': 1,
            '1': 1.5,
            '2': 1.8,
            '3': 0.5
        },
        kimochisen: {
            '0': 0.75,
            '1': 1.65,
            '2': 1.94,
            '3': 0.5
        }
    };
    const zokuseiKyoukaMagiaMap = {
        default: {
            '1': 3,
            '2': 3
        },
        kimochisen: {
            '1': 3.1,
            '2': 3.72
        }
    };

    const reduceIfExists = (array, operation) => {
        return array == null
            ? 0
            : array.reduce((sum, entry) => {
                  return sum + operation(Number(entry.amount));
              }, 0);
    };

    const [state, setState] = React.useState({
        atkHosei: 1,
        defHosei: 1,
        jinkeiHosei: 1,
        magiaDmgHosei: 1,
        doppelDmgHosei: 0,
        dmgDealtHosei: 0,
        dmgHosei: 1,
        finalDamage: {
            min: 0,
            max: 0
        }
    });

    const onSubmit = (data) => {
        const atkHosei = damageCalcs.atkHosei(
            reduceIfExists(data.atkHoseiMemoria, memoriaCalcs.atkUp) + Number(data.atkUpPa) * 0.01
        );
        const jinkeiHosei = jinkeiMap[data.jinkeiAtk];
        const defHosei = damageCalcs.defHosei(
            reduceIfExists(data.defHoseiMemoria, memoriaCalcs.defDown) + Number(data.defDownPa) * 0.01
        );
        const dmgDealt = damageCalcs.dmgUpHosei(
            reduceIfExists(data.dmgUpMemoria, memoriaCalcs.dealtDmgUp) + Number(data.dmgUpPa) * 0.01
        );
        const magiaDmgHosei = damageCalcs.magiaHosei(
            reduceIfExists(data.magiaDmgUpMemoria, memoriaCalcs.magiaDmgUp) + Number(data.magiaDmgUpPa) * 0.01
        );
        const doppelDmgHosei = damageCalcs.doppelHosei(
            reduceIfExists(data.doppelDmgUp, memoriaCalcs.magiaDmgUp) + Number(data.doppelDmgUpPa) * 0.01
        );
        const dmgUpJoutai =
            reduceIfExists(data.dmgUpJoutaiMemoria, memoriaCalcs.damageUp) + Number(data.dmgUpJoutaiPa) * 0.01;
        const joutaiIjouDmgUp =
            reduceIfExists(data.joutaiIjouDmgUpMemoria, memoriaCalcs.joutaiIjouDmgUp) +
            Number(data.joutaiIjouDmgUpPa) * 0.01;

        const dmgHosei = damageCalcs.dmgHoseiTotal(
            dmgDealt,
            dmgUpJoutai,
            joutaiIjouDmgUp,
            doppelDmgHosei,
            data.magiaDoppel === 'doppel',
            true
        );
        const magiaBaseDmg = damageCalcs.magiaBaseDmg(
            Number(data.magiaDmg),
            Number(data.magiaLvl),
            data.magiaDoppel === 'doppel'
        );

        const jikkouAtk = damageCalcs.jikkouAtk(
            atkHosei,
            Number(data.atk),
            Number(data.atkMemoria),
            Number(data.atkEnhance),
            Number(data.atkKakusei),
            jinkeiHosei
        );
        const jikkouDef = damageCalcs.jikkouDef(defHosei, Number(data.def));

        const baseDamage = damageCalcs.baseDmg(jikkouAtk, jikkouDef);

        const totalDamage = damageCalcs.totalDmg(
            baseDamage,
            magiaBaseDmg,
            magiaComboMap[data.magiaCombo],
            magiaDmgHosei,
            3.72,
            0,
            dmgHosei
        );

        const finalDamage = {
            min: totalDamage * 0.95,
            max: totalDamage * 1.05
        };

        setState({
            atkHosei: atkHosei,
            defHosei: defHosei,
            jinkeiHosei: jinkeiHosei,
            magiaDmgHosei: magiaDmgHosei,
            doppelDmgHosei: doppelDmgHosei,
            dmgDealtHosei: dmgDealt,
            dmgHosei: dmgHosei,
            finalDamage: finalDamage
        });
    };

    renderCount++;

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>MagiReco Damage Calculator</h1>
                {/* <span className='counter'>Render Count: {renderCount}</span> */}
                <section>
                    <div>
                        <p>基礎ATK</p>
                        <input type='number' name='atk' ref={register()} />
                    </div>
                    <div>
                        <p>ATKの覚醒％</p>
                        <input type='number' name='atkKakusei' ref={register()} />
                    </div>
                    <div>
                        <p>メモリアATK</p>
                        <input type='number' name='atkMemoria' ref={register()} />
                    </div>
                    <div>
                        <p>精神強化ATK</p>
                        <input type='number' name='atkEnhance' ref={register()} />
                    </div>
                    <div>
                        <p>基礎DEF</p>
                        <input type='number' name='def' ref={register()} />
                    </div>
                    <div>
                        <p>DEFの覚醒％</p>
                        <input type='number' name='defKakusei' ref={register()} />
                    </div>
                    <div>
                        <p>メモリアDEF</p>
                        <input type='number' name='defMemoria' ref={register()} />
                    </div>
                    <div>
                        <p>精神強化DEF</p>
                        <input type='number' name='defEnhance' ref={register()} />
                    </div>
                </section>

                <p>属性倍率</p>
                <section>
                    <select name='zokuseiHosei' ref={register()}>
                        <option value='0'>有利不利なし</option>
                        <option value='1'>有利</option>
                        <option value='2'>有利＋特定状態異常</option>
                        <option value='3'>不利</option>
                    </select>
                    <div>
                        <p>キモチ戦</p>
                        <input name='kimochiSen' type='checkbox' ref={register()} />
                    </div>
                </section>
                <p>陣形補正</p>
                <section>
                    <select name='jinkeiAtk' ref={register()}>
                        <option value='0'>なし</option>
                        <option value='1'>攻撃力上昇[Ⅰ]</option>
                        <option value='2'>攻撃力上昇[II]</option>
                    </select>
                </section>

                <h1>マギア／ドッペル</h1>
                <div>
                    <p>マギア／ドッペル</p>
                    <input type='radio' id='magia' name='magiaDoppel' value='magia' ref={register()} />
                    <label htmlFor='magia'>マギア</label>
                    <input type='radio' id='doppel' name='magiaDoppel' value='doppel' ref={register()} />
                    <label htmlFor='doppel'>ドッペル</label>
                </div>
                <section>
                    <div>
                        <p>ダメージ%</p>
                        <input type='number' name='magiaDmg' ref={register()} />
                    </div>
                    <div>
                        <p>マギアレベル</p>
                        <select name='magiaLvl' ref={register()}>
                            <option value='1'>マギアLv1</option>
                            <option value='2'>マギアLv2</option>
                            <option value='3'>マギアLv3</option>
                            <option value='4'>マギアLv4</option>
                            <option value='5'>マギアLv5</option>
                        </select>
                    </div>
                    <div>
                        <p>属性強化</p>
                        <input name='zokuseiKyoukaMagia' type='checkbox' ref={register()} />
                    </div>
                    <div>
                        <p>マギアコンボ</p>
                        <select name='magiaCombo' ref={register()}>
                            <option value='1'>1つ目</option>
                            <option value='2'>2つ目</option>
                            <option value='3'>3つ目</option>
                        </select>
                    </div>
                </section>

                <h1>攻撃力UP</h1>
                <section>
                    <ul>
                        {atkHoseiMemoria.fields.map((item, index) => {
                            return (
                                <li key={item.id}>
                                    <Controller
                                        as={
                                            <select>
                                                <option value='1'>攻撃力UP[I]</option>
                                                <option value='2'>攻撃力UP[II]</option>
                                                <option value='3'>攻撃力UP[III]</option>
                                                <option value='4'>攻撃力UP[IV]</option>
                                                <option value='5'>攻撃力UP[V]</option>
                                                <option value='6'>攻撃力UP[VI]</option>
                                                <option value='7'>攻撃力UP[VII]</option>
                                                <option value='8'>攻撃力UP[VIII]</option>
                                                <option value='9'>攻撃力UP[IX]</option>
                                                <option value='10'>攻撃力UP[X]</option>
                                            </select>
                                        }
                                        name={`atkHoseiMemoria[${index}].amount`}
                                        control={control}
                                        defaultValue={'1'}
                                    />
                                    <Controller
                                        as={
                                            <select>
                                                <option value='0'>UP</option>
                                                <option value='1'>DOWN</option>
                                            </select>
                                        }
                                        name={`atkHoseiMemoria[${index}].type`}
                                        control={control}
                                        defaultValue={'0'}
                                    />
                                    <button type='button' onClick={() => atkHoseiMemoria.remove(index)}>
                                        remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <button
                        type='button'
                        onClick={() => {
                            atkHoseiMemoria.append({ amount: '1', type: '0' });
                        }}
                    >
                        add
                    </button>
                </section>

                <h1>与えるダメージUP</h1>
                <section>
                    <ul>
                        {dmgUpMemoria.fields.map((item, index) => {
                            return (
                                <li key={item.id}>
                                    <Controller
                                        as={
                                            <select>
                                                <option value='1'>与えるダメージUP[I]</option>
                                                <option value='2'>与えるダメージUP[II]</option>
                                                <option value='3'>与えるダメージUP[III]</option>
                                                <option value='4'>与えるダメージUP[IV]</option>
                                                <option value='5'>与えるダメージUP[V]</option>
                                                <option value='6'>与えるダメージUP[VI]</option>
                                            </select>
                                        }
                                        name={`dmgUpMemoria[${index}].amount`}
                                        control={control}
                                        defaultValue={'1'}
                                    />
                                    <Controller
                                        as={
                                            <select>
                                                <option value='0'>UP</option>
                                                <option value='1'>DOWN</option>
                                            </select>
                                        }
                                        name={`dmgUpMemoria[${index}].type`}
                                        control={control}
                                        defaultValue={'0'}
                                    />
                                    <button type='button' onClick={() => dmgUpMemoria.remove(index)}>
                                        remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <button
                        type='button'
                        onClick={() => {
                            dmgUpMemoria.append({ amount: '1', type: '0' });
                        }}
                    >
                        add
                    </button>
                </section>

                <h1>ダメージアップ状態</h1>
                <section>
                    <ul>
                        {dmgUpJoutaiMemoria.fields.map((item, index) => {
                            return (
                                <li key={item.id}>
                                    <Controller
                                        as={
                                            <select>
                                                <option value='1'>ダメージアップ状態[I]</option>
                                                <option value='2'>ダメージアップ状態[II]</option>
                                                <option value='3'>ダメージアップ状態[III]</option>
                                                <option value='4'>ダメージアップ状態[IV]</option>
                                                <option value='5'>ダメージアップ状態[V]</option>
                                                <option value='6'>ダメージアップ状態[VI]</option>
                                                <option value='7'>ダメージアップ状態[VII]</option>
                                                <option value='8'>ダメージアップ状態[VIII]</option>
                                            </select>
                                        }
                                        name={`dmgUpJoutaiMemoria[${index}].amount`}
                                        control={control}
                                        defaultValue={'1'}
                                    />
                                    <Controller
                                        as={
                                            <select>
                                                <option value='0'>UP</option>
                                                <option value='1'>DOWN</option>
                                            </select>
                                        }
                                        name={`dmgUpJoutaiMemoria[${index}].type`}
                                        control={control}
                                        defaultValue={'0'}
                                    />
                                    <button type='button' onClick={() => dmgUpJoutaiMemoria.remove(index)}>
                                        remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <button
                        type='button'
                        onClick={() => {
                            dmgUpJoutaiMemoria.append({ amount: '1', type: '0' });
                        }}
                    >
                        add
                    </button>
                </section>

                <h1>敵状態異常時ダメージUP</h1>
                <section>
                    <ul>
                        {joutaiIjouDmgUpMemoria.fields.map((item, index) => {
                            return (
                                <li key={item.id}>
                                    <Controller
                                        as={
                                            <select>
                                                <option value='1'>敵状態異常時ダメージUP[I]</option>
                                                <option value='2'>敵状態異常時ダメージUP[II]</option>
                                                <option value='3'>敵状態異常時ダメージUP[III]</option>
                                                <option value='4'>敵状態異常時ダメージUP[IV]</option>
                                                <option value='5'>敵状態異常時ダメージUP[V]</option>
                                                <option value='6'>敵状態異常時ダメージUP[VI]</option>
                                            </select>
                                        }
                                        name={`joutaiIjouDmgUpMemoria[${index}].amount`}
                                        control={control}
                                        defaultValue={'1'}
                                    />
                                    <Controller
                                        as={
                                            <select>
                                                <option value='0'>UP</option>
                                                <option value='1'>DOWN</option>
                                            </select>
                                        }
                                        name={`joutaiIjouDmgUpMemoria[${index}].type`}
                                        control={control}
                                        defaultValue={'0'}
                                    />
                                    <button type='button' onClick={() => joutaiIjouDmgUpMemoria.remove(index)}>
                                        remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <button
                        type='button'
                        onClick={() => {
                            joutaiIjouDmgUpMemoria.append({ amount: '1', type: '0' });
                        }}
                    >
                        add
                    </button>
                </section>

                <h1>マギアダメージUP</h1>
                <section>
                    <ul>
                        {magiaDmgUpMemoria.fields.map((item, index) => {
                            return (
                                <li key={item.id}>
                                    <Controller
                                        as={
                                            <select>
                                                <option value='1'>マギアダメージUP[I]</option>
                                                <option value='2'>マギアダメージUP[II]</option>
                                                <option value='3'>マギアダメージUP[III]</option>
                                                <option value='4'>マギアダメージUP[IV]</option>
                                                <option value='5'>マギアダメージUP[V]</option>
                                                <option value='6'>マギアダメージUP[VI]</option>
                                                <option value='7'>マギアダメージUP[VII]</option>
                                                <option value='8'>マギアダメージUP[VIII]</option>
                                                <option value='9'>マギアダメージUP[IX]</option>
                                                <option value='10'>マギアダメージUP[X]</option>
                                            </select>
                                        }
                                        name={`magiaDmgUpMemoria[${index}].amount`}
                                        control={control}
                                        defaultValue={'1'}
                                    />
                                    <Controller
                                        as={
                                            <select>
                                                <option value='0'>UP</option>
                                                <option value='1'>DOWN</option>
                                            </select>
                                        }
                                        name={`magiaDmgUpMemoria[${index}].type`}
                                        control={control}
                                        defaultValue={'0'}
                                    />
                                    <button type='button' onClick={() => magiaDmgUpMemoria.remove(index)}>
                                        remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <button
                        type='button'
                        onClick={() => {
                            magiaDmgUpMemoria.append({ amount: '1', type: '0' });
                        }}
                    >
                        add
                    </button>
                </section>

                <h1>防御力DOWN</h1>
                <section>
                    <ul>
                        {defHoseiMemoria.fields.map((item, index) => {
                            return (
                                <li key={item.id}>
                                    <Controller
                                        as={
                                            <select>
                                                <option value='1'>防御力DOWN[I]</option>
                                                <option value='2'>防御力DOWN[II]</option>
                                                <option value='3'>防御力DOWN[III]</option>
                                                <option value='4'>防御力DOWN[IV]</option>
                                                <option value='5'>防御力DOWN[V]</option>
                                                <option value='6'>防御力DOWN[VI]</option>
                                                <option value='7'>防御力DOWN[VII]</option>
                                                <option value='8'>防御力DOWN[VIII]</option>
                                                <option value='9'>防御力DOWN[IX]</option>
                                                <option value='10'>防御力DOWN[X]</option>
                                            </select>
                                        }
                                        name={`defHoseiMemoria[${index}].amount`}
                                        control={control}
                                        defaultValue={'1'}
                                    />
                                    <Controller
                                        as={
                                            <select>
                                                <option value='0'>UP</option>
                                                <option value='1'>DOWN</option>
                                            </select>
                                        }
                                        name={`defHoseiMemoria[${index}].type`}
                                        control={control}
                                        defaultValue={'1'}
                                    />
                                    <button type='button' onClick={() => defHoseiMemoria.remove(index)}>
                                        remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <button
                        type='button'
                        onClick={() => {
                            defHoseiMemoria.append({ amount: '1', type: '0' });
                        }}
                    >
                        add
                    </button>
                </section>

                <h1>ドッペルダメージUP</h1>
                <section>
                    <ul>
                        {doppelDmgUp.fields.map((item, index) => {
                            return (
                                <li key={item.id}>
                                    <Controller
                                        as={
                                            <select>
                                                <option value='1'>ドッペルダメージUP[I]</option>
                                                <option value='2'>ドッペルダメージUP[II]</option>
                                                <option value='3'>ドッペルダメージUP[III]</option>
                                                <option value='4'>ドッペルダメージUP[IV]</option>
                                                <option value='5'>ドッペルダメージUP[V]</option>
                                            </select>
                                        }
                                        name={`doppelDmgUp[${index}].amount`}
                                        control={control}
                                        defaultValue={'1'}
                                    />
                                    <Controller
                                        as={
                                            <select>
                                                <option value='0'>UP</option>
                                                <option value='1'>DOWN</option>
                                            </select>
                                        }
                                        name={`doppelDmgUp[${index}].type`}
                                        control={control}
                                        defaultValue={'0'}
                                    />
                                    <button type='button' onClick={() => doppelDmgUp.remove(index)}>
                                        remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <button
                        type='button'
                        onClick={() => {
                            doppelDmgUp.append({ amount: '1', type: '0' });
                        }}
                    >
                        add
                    </button>
                </section>

                <h1>カスタムパーセント補正</h1>
                <section>
                    <div>
                        <p>攻撃力UP%</p>
                        <input type='number' name='atkUpPa' ref={register()} />
                    </div>
                    <div>
                        <p>与えるダメージUP％</p>
                        <input type='number' name='dmgUpPa' ref={register()} />
                    </div>
                    <div>
                        <p>ダメージアップ状態%</p>
                        <input type='number' name='dmgUpJoutaiPa' ref={register()} />
                    </div>
                    <div>
                        <p>敵状態異常時ダメージUP%</p>
                        <input type='number' name='joutaiIjouDmgUpPa' ref={register()} />
                    </div>
                    <div>
                        <p>マギアダメージUP%</p>
                        <input type='number' name='magiaDmgUpPa' ref={register()} />
                    </div>
                    <div>
                        <p>防御力DOWN%</p>
                        <input type='number' name='defDownPa' ref={register()} />
                    </div>
                    <div>
                        <p>ドッペルダメージUP％</p>
                        <input type='number' name='doppelDmgUpPa' ref={register()} />
                    </div>
                    <div>
                        <p>耐性倍率％</p>
                        <input type='number' name='taiseiBairitsuPa' ref={register()} />
                    </div>
                </section>

                <input type='submit' />
            </form>

            <p
            // className={
            //     state.atkHosei < kyoukaLimits.atkHosei.min
            //         ? 'outside-limit'
            //         : state.atkHosei == kyoukaLimits.atkHosei.min || state.atkHosei == kyoukaLimits.atkHosei.max
            //         ? 'on-limit'
            //         : state.atkHosei > kyoukaLimits.atkHosei.max
            //         ? 'outside-limit'
            //         : ''
            // }
            >
                攻撃力補正: {Math.round(state.atkHosei * 100)}%
            </p>
            <p
            // className={
            //     state.defHosei < kyoukaLimits.defHosei.min
            //         ? 'outside-limit'
            //         : state.defHosei == kyoukaLimits.defHosei.min || state.defHosei == kyoukaLimits.defHosei.max
            //         ? 'on-limit'
            //         : state.defHosei > kyoukaLimits.defHosei.max
            //         ? 'outside-limit'
            //         : ''
            // }
            >
                防御力補正: {Math.round(state.defHosei * 100)}%
            </p>
            <p
            // className={
            //     state.magiaDmgHosei < kyoukaLimits.magiaDmgHosei.min
            //         ? 'outside-limit'
            //         : state.magiaDmgHosei == kyoukaLimits.magiaDmgHosei.min ||
            //           state.magiaDmgHosei == kyoukaLimits.magiaDmgHosei.max
            //         ? 'on-limit'
            //         : state.magiaDmgHosei > kyoukaLimits.magiaDmgHosei.max
            //         ? 'outside-limit'
            //         : ''
            // }
            >
                マギアダメージ補正: {Math.round(state.magiaDmgHosei * 100)}%
            </p>
            <p
            // className={
            //     state.doppelDmgHosei < kyoukaLimits.doppelDmgHosei.min
            //         ? 'outside-limit'
            //         : state.doppelDmgHosei == kyoukaLimits.doppelDmgHosei.min ||
            //           state.doppelDmgHosei == kyoukaLimits.doppelDmgHosei.max
            //         ? 'on-limit'
            //         : state.doppelDmgHosei > kyoukaLimits.doppelDmgHosei.max
            //         ? 'outside-limit'
            //         : ''
            // }
            >
                ドッペルダメージ補正: {Math.round(state.doppelDmgHosei * 100)}%
            </p>
            <p
            // className={
            //     state.dmgDealtHosei < kyoukaLimits.dmgDealtHosei.min
            //         ? 'outside-limit'
            //         : state.dmgDealtHosei == kyoukaLimits.dmgDealtHosei.min ||
            //           state.dmgDealtHosei == kyoukaLimits.dmgDealtHosei.max
            //         ? 'on-limit'
            //         : state.dmgDealtHosei > kyoukaLimits.dmgDealtHosei.max
            //         ? 'outside-limit'
            //         : ''
            // }
            >
                与えるダメージ補正: {Math.round(state.dmgDealtHosei * 100)}%
            </p>
            <p
            // className={
            //     state.dmgHosei < kyoukaLimits.dmgHosei.min
            //         ? 'outside-limit'
            //         : state.dmgHosei == kyoukaLimits.dmgHosei.min || state.dmgHosei == kyoukaLimits.dmgHosei.max
            //         ? 'on-limit'
            //         : state.dmgHosei > kyoukaLimits.dmgHosei.max
            //         ? 'outside-limit'
            //         : ''
            // }
            >
                補正係数: {Math.round(state.dmgHosei * 100)}%
            </p>
            <h1>最終ダメージ</h1>
            <p>Min: {state.finalDamage.min}</p>
            <p>Max: {state.finalDamage.max}</p>
        </>
    );
};

export default DamageCalcTab;
