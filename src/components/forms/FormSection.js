import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Box, IconButton, Collapse, Typography, makeStyles } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        margin: theme.spacing(3, 0)
    }
}));

const FormSection = ({ label, children, collapse = false, open = false }) => {
    const classes = useStyles();
    const [isOpen, setOpen] = useState(open);
    return (
        <Paper className={classes.root} variant='outlined'>
            <Box display='flex' flexDirection='row' flexWrap='nowrap' justifyContent='space-between' alignItems='center'>
                {label && (
                    <Typography id={name + '-label'} variant='subtitle1'>
                        {label}
                    </Typography>
                )}
                {collapse && (
                    <IconButton
                        onClick={() => {
                            setOpen(!isOpen);
                        }}
                    >
                        {isOpen ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
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
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
    collapse: PropTypes.bool,
    open: PropTypes.bool
};

export default FormSection;
