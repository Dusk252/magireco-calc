import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateMpFormTab, addMpFormTab, removeMpFormTab } from '../../../redux/actions/mpFormActions';
import { Tabs, AppBar } from '@material-ui/core';
import TabItem from '../../tabs/TabItem';
import TabPanel from '../../tabs/TabPanel';
import TabAddDialog from '../../tabs/TabAddDialog';
import MpCalcTab from './MpCalcTab';

let renderCount = 0;

const MpCalcPage = ({ updateFormTab, addFormTab, removeFormTab, formTabsState }) => {
    const [currentTab, setCurrentTab] = useState(0);
    const [removingTab, setRemovingTab] = useState(false);

    useEffect(() => {
        setRemovingTab(false);
    }, [removingTab]);

    useEffect(() => {
        localStorage.setItem('mpFormTabsState', JSON.stringify(formTabsState));
    }, [formTabsState]);

    const handleChange = (event, newValue) => {
        setCurrentTab(newValue);
    };
    const handleRemove = (index) => {
        setRemovingTab(true);
        removeFormTab(index);
        setCurrentTab((currentTab) => {
            return currentTab === index
                ? index === formTabsState.length - 1
                    ? index - 1
                    : index
                : currentTab < index
                ? currentTab
                : currentTab - 1;
        });
    };
    const handleFormChanges = useCallback(
        (formState, index) => {
            updateFormTab(formState, index);
        },
        [updateFormTab]
    );

    renderCount++;

    return (
        <>
            <span className='counter' style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
                Render Count: {renderCount}
            </span>
            <AppBar position='static'>
                <Tabs
                    value={currentTab}
                    onChange={handleChange}
                    aria-label='mp tabs'
                    indicatorColor='secondary'
                    variant='scrollable'
                    scrollButtons='auto'
                >
                    {formTabsState.map((tab, index) => {
                        return <TabItem label={tab.title} index={index} key={index} handleRemove={handleRemove} />;
                    })}
                </Tabs>
                <TabAddDialog onAddTab={addFormTab} />
            </AppBar>
            {!removingTab &&
                formTabsState.map((tab, index) => {
                    return (
                        <TabPanel value={currentTab} index={index} key={index}>
                            <MpCalcTab index={index} tabInfo={formTabsState[index]} onFormChange={handleFormChanges} />
                        </TabPanel>
                    );
                })}
        </>
    );
};

MpCalcPage.propTypes = {
    updateFormTab: PropTypes.func.isRequired,
    addFormTab: PropTypes.func.isRequired,
    removeFormTab: PropTypes.func.isRequired,
    formTabsState: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    formTabsState: state.mpFormTabs
});

const mapDispatchToProps = {
    updateFormTab: updateMpFormTab,
    addFormTab: addMpFormTab,
    removeFormTab: removeMpFormTab
};

export default connect(mapStateToProps, mapDispatchToProps)(MpCalcPage);
