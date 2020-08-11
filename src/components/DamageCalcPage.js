import React from 'react';
import { makeStyles, Tabs, Tab, AppBar } from '@material-ui/core';
import ReactDOM from 'react-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && 'hello'}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

let renderCount = 0;

const useStyles = makeStyles((theme) => ({
    flexContainer: {
        flexWrap: 'wrap'
    }
}));

const DamageCalcPage = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    renderCount++;
    return (
        <>
            <span className='counter'>Render Count: {renderCount}</span>
            <AppBar position='static'>
                <Tabs value={value} classes={classes} onChange={handleChange} aria-label='simple tabs example'>
                    <Tab label='Item One' {...a11yProps(0)} />
                    <Tab label='Item Two' {...a11yProps(1)} />
                    <Tab label='Item Three' {...a11yProps(2)} />
                    <Tab label='Item One' {...a11yProps(0)} />
                    <Tab label='Item Two' {...a11yProps(1)} />
                    <Tab label='Item Three' {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </>
    );
};

export default DamageCalcPage;
