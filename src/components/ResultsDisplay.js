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

const ResultsDisplay = ({ interimResults, finalResult }) => {
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
                        {interimResults.map((res, index) => (
                            <Grid key={index} container>
                                <Grid item xs={6}>
                                    <Typography variant='subtitle1' component='div'>
                                        {res.label}:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant='body1' component='div' align='right'>
                                        {Math.round(res.res.value)}
                                        {res.res.postfix}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                    <Divider component='div' />
                </>
            ) : (
                ''
            )}
            <Box pt={2}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography id='final-result-label' variant='subtitle1' component='div'>
                            {finalResult.label}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography id='final-result-label' variant='subtitle1' component='div' align='right'>
                            {round(finalResult.res.value, 1)}
                            {finalResult.res.postfix}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

ResultsDisplay.propTypes = {
    interimResults: PropTypes.array,
    finalResult: PropTypes.object.isRequired
};

export default ResultsDisplay;
