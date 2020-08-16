import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(3, 0)
    }
}));

const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
};

const defaultPrecision = 2;

const ResultsDisplay = ({ interimResults, finalResults }) => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper} variant='outlined'>
            <Typography variant='h4' component='div'>
                結果
            </Typography>
            <hr />
            {interimResults != null ? (
                <>
                    <Box py={2}>
                        {interimResults.map((res, index) => {
                            let roundedRes = round(res.value, res.precision ?? defaultPrecision);
                            let resColor = 'white';
                            if (res.limits != null) {
                                resColor =
                                    roundedRes === res.limits.min || roundedRes === res.limits.max
                                        ? 'orange'
                                        : roundedRes > res.limits.max || roundedRes < res.limits.min
                                        ? 'red'
                                        : resColor;
                            }
                            return (
                                <Grid key={index} container>
                                    <Grid item xs={6}>
                                        <Typography variant='subtitle1' component='div'>
                                            {res.label}{' '}
                                            {res.limits != null ? (
                                                <Typography variant='body2' component='span'>
                                                    {'(' +
                                                        res.limits.min +
                                                        res.postfix +
                                                        ' - ' +
                                                        res.limits.max +
                                                        res.postfix +
                                                        ')'}
                                                </Typography>
                                            ) : (
                                                ''
                                            )}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box color={resColor}>
                                            <Typography variant='body1' component='div' align='right'>
                                                {roundedRes}
                                                {res.postfix}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Box>
                    <Divider component='div' />
                </>
            ) : (
                ''
            )}
            {finalResults != null ? (
                <Box pt={2}>
                    {finalResults.map((res, index) => (
                        <Grid key={index} container>
                            <Grid item xs={6}>
                                <Typography id='final-result-label' variant='subtitle1' component='div'>
                                    {res.label}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography id='final-result-label' variant='subtitle1' component='div' align='right'>
                                    {round(res.value, res.precision ?? defaultPrecision)}
                                    {res.postfix}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Box>
            ) : (
                ''
            )}
        </Paper>
    );
};

ResultsDisplay.propTypes = {
    interimResults: PropTypes.array,
    finalResults: PropTypes.array.isRequired
};

export default ResultsDisplay;
