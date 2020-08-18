import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

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

const TabAddDialog = ({ onAddTab, render }) => {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');

    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        setTitle('');
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setOpen(false);
        onAddTab(title);
        setTitle('');
    };

    return (
        <>
            {render(classes.root, handleClickOpen)}
            <Dialog open={open} onClose={handleCancel} aria-labelledby='form-dialog-title'>
                <form onSubmit={handleAdd} autoComplete='off'>
                    <DialogTitle id='form-dialog-title'>Add Tab</DialogTitle>
                    <DialogContent>
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
    render: PropTypes.func.isRequired
};

export default TabAddDialog;
