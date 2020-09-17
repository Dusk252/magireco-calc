import React from 'react';
import PropTypes from 'prop-types';
import {
    makeStyles,
    Button,
    TextField,
    Box,
    FormControl,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 'auto',
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        },
        borderRadius: 0,
        height: '40px'
    }
}));

const TabAddDialog = ({ onAddTab, tabsList, render }) => {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [duplicate, setDuplicate] = React.useState(false);
    const [tabToDup, setTabToDup] = React.useState('0');

    const classes = useStyles();

    const resetTabState = () => {
        setTitle('');
        setDuplicate(false);
        setTabToDup('0');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        resetTabState();
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setOpen(false);
        onAddTab(title, duplicate ? tabToDup : null);
        resetTabState();
    };

    return (
        <>
            {render(classes.root, handleClickOpen)}
            <Dialog open={open} onClose={handleCancel} aria-labelledby='form-dialog-title'>
                <form onSubmit={handleAdd} autoComplete='off'>
                    <DialogTitle id='form-dialog-title'>Add Tab</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                            <TextField
                                autoFocus
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                                value={title}
                                margin='dense'
                                id='name'
                                label='Title'
                                type='text'
                                fullWidth
                                inputProps={{ maxLength: 50 }}
                            />
                        </FormControl>
                        {tabsList != null && tabsList.length > 0 && (
                            <Box mt='16px' minWidth='300px'>
                                <FormControl fullWidth>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color='primary'
                                                id='duplicate'
                                                type='checkbox'
                                                onChange={(e) => {
                                                    setDuplicate(e.target.checked);
                                                }}
                                                checked={duplicate}
                                            />
                                        }
                                        label='タブを複製'
                                    />
                                </FormControl>
                                {duplicate && (
                                    <FormControl fullWidth>
                                        <Select
                                            labelId={'tabToDup-label'}
                                            id={'tabToDup-select'}
                                            onChange={(e) => {
                                                setTabToDup(e.target.value);
                                            }}
                                            value={tabToDup}
                                        >
                                            {tabsList.map((opt, index) => {
                                                return (
                                                    <MenuItem key={index} value={opt.value}>
                                                        {opt.text}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                )}
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} color='primary'>
                            Cancel
                        </Button>
                        <Button type='submit' color='primary'>
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

TabAddDialog.propTypes = {
    onAddTab: PropTypes.func.isRequired,
    tabsList: PropTypes.array,
    render: PropTypes.func.isRequired
};

export default TabAddDialog;
