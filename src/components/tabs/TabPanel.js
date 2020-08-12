import React from 'react';
import PropTypes from 'prop-types';

const TabPanel = ({ index, value, children, ...other }) => {
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index ? <>{children}</> : <></>}
        </div>
    );
};

TabPanel.propTypes = {
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    children: PropTypes.node
};

export default TabPanel;
