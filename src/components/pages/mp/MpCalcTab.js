import React from 'react';
import PropTypes from 'prop-types';
import { Container, Box, Typography } from '@material-ui/core';
import { mpUp as mpUpMemoriaCalc, acceleMpUp as acceleMpUpMemoriaCalc } from '../../../utils/memoriaCalcs';
import { mpUp as mpUpConnectCalc, acceleMpUp as acceleMpUpConnectCalc } from '../../../utils/connectCalcs';
import { mpCalc } from '../../../utils/mpCalcs';
import ResultsDisplay from '../../forms/ResultsDisplay';
import MpCalcForm from './MpCalcForm';

const MpCalcTab = ({ index, tabInfo, onFormChange, onFormSubmit }) => {
    const onSubmit = (data) => {
        calculateResults(data);
    };

    const reduceIfExists = (array, operation) => {
        return array == null
            ? 0
            : array.reduce((sum, entry) => {
                  return sum + operation(Number(entry.amount));
              }, 0);
    };

    const calculateResults = (data) => {
        const acceleMpUpPa =
            Number(data.acceleMpUpPa) * 0.01 +
            reduceIfExists(data.acceleMpUpMemoria, acceleMpUpMemoriaCalc) +
            reduceIfExists(data.acceleMpUpConnects, acceleMpUpConnectCalc);
        const mpUpPa =
            Number(data.mpUpPa) * 0.01 +
            reduceIfExists(data.mpUpMemoria, mpUpMemoriaCalc) +
            reduceIfExists(data.mpUpConnects, mpUpConnectCalc);
        const mpTotal = mpCalc(
            data.acceleBonus,
            data.mirrors,
            data.discSlot,
            data.discType,
            data.charType,
            mpUpPa,
            acceleMpUpPa,
            Number(data.chargeCount)
        );
        onFormSubmit(
            {
                interimResults: [
                    {
                        label: 'Accel MPUP倍率',
                        value: acceleMpUpPa * 100,
                        postfix: '%'
                    },
                    {
                        label: 'MP獲得量UP倍率',
                        value: mpUpPa * 100,
                        postfix: '%'
                    }
                ],
                finalResults: [
                    {
                        label: '合計獲得MP',
                        value: mpTotal,
                        precision: 1
                    }
                ]
            },
            index
        );
    };

    return (
        <Container maxWidth='md'>
            <Box mt={3} mb={-1} mx={'auto'} pb={2} borderBottom='1px solid rgba(255, 255, 255, 0.3)'>
                <Box display='inline-block' borderRight='1px solid rgba(255, 255, 255, 0.3)' pr={3} mr={3}>
                    <Typography variant='h4' component='span'>
                        MP計算
                    </Typography>
                </Box>
                <Typography variant='h5' component='span'>
                    {tabInfo.title}
                </Typography>
            </Box>

            <MpCalcForm index={index} formState={tabInfo.formState} onFormChange={onFormChange} onSubmit={onSubmit} />
            {tabInfo.results && <ResultsDisplay {...tabInfo.results} />}
        </Container>
    );
};

MpCalcTab.propTypes = {
    index: PropTypes.any.isRequired,
    tabInfo: PropTypes.object.isRequired,
    onFormChange: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired
};

export default MpCalcTab;
