import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Button } from '@material-ui/core';

const TabItem = ({ label, index, handleRemove, ...a11yProps }) => {
    return (
        <div>
            <Tab label={label} {...a11yProps} />
            <Button
                color='primary'
                onClick={() => {
                    handleRemove(index);
                }}
            >
                X
            </Button>
        </div>
    );
};

export default TabItem;

TabItem.propTypes = {
    label: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    handleRemove: PropTypes.func
};
