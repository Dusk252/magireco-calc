import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Box, IconButton, Collapse, Typography, makeStyles } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        margin: theme.spacing(3, 0)
    },
    items: {
        marginBottom: theme.spacing(0),
        color: theme.palette.primary.main
    }
}));

const FormSection = ({ title, subtitle, children, collapse = false, open = false, numItems = 0 }) => {
    const classes = useStyles();
    const [isOpen, setOpen] = useState(open);
    return (
        <Paper className={classes.root} variant='outlined'>
            <Box display='flex' flexDirection='row' flexWrap='nowrap' justifyContent='space-between' alignItems='center'>
                {title && (
                    <Box {...(collapse ? {} : { mb: 4 })}>
                        <Typography id={name + '-label'} variant='subtitle1'>
                            {title}
                        </Typography>
                        {subtitle && <Typography variant='body2'>{subtitle}</Typography>}
                    </Box>
                )}
                {collapse && (
                    <Box display='flex' alignItems='center'>
                        <Box pr={2}>
                            <Typography className={classes.items} variant='body2' component='div'>
                                {numItems} アイテム
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={() => {
                                setOpen(!isOpen);
                            }}
                        >
                            {isOpen ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </Box>
                )}
            </Box>
            {collapse ? (
                <Collapse in={isOpen} timeout='auto'>
                    {children}
                </Collapse>
            ) : (
                children
            )}
        </Paper>
    );
};

FormSection.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    children: PropTypes.node.isRequired,
    collapse: PropTypes.bool,
    open: PropTypes.bool,
    numItems: PropTypes.number
};

export default FormSection;
