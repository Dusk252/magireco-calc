import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

const TabAddDialog = ({ onAddTab }) => {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        setTitle('');
    };

    const handleAdd = () => {
        setOpen(false);
        onAddTab(title);
        setTitle('');
    };

    return (
        <div>
            <Button variant='outlined' color='primary' onClick={handleClickOpen}>
                +
            </Button>
            <Dialog open={open} onClose={handleCancel} aria-labelledby='form-dialog-title'>
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
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} color='primary'>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

TabAddDialog.propTypes = {
    onAddTab: PropTypes.func.isRequired
};

export default TabAddDialog;
