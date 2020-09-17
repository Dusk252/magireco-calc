import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateMpFormTab, addMpFormTab, removeMpFormTab, updateMpFormResults } from '../../../redux/actions/mpFormActions';
import { Tabs, AppBar, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TabItem from '../../tabs/TabItem';
import TabPanel from '../../tabs/TabPanel';
import TabAddDialog from '../../tabs/TabAddDialog';
import MpCalcTab from './MpCalcTab';
import { LOCAL_STORAGE_MP } from '../../../constants/const';
import MpCalcHome from './MpCalcHome';

const MpCalcPage = ({ updateFormTab, addFormTab, removeFormTab, updateFormResults, formTabsState }) => {
    const [currentTab, setCurrentTab] = useState(0);
    const [removingTab, setRemovingTab] = useState(false);
    const tabsList = formTabsState.map((val, index) => {
        return { text: val.title, value: index };
    });

    useEffect(() => {
        setRemovingTab(false);
    }, [removingTab]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_MP, JSON.stringify(formTabsState));
    }, [formTabsState]);

    const handleAdd = (title, tabToDup) => {
        if (formTabsState.length === 0) setCurrentTab(0);
        addFormTab(title, formTabsState[tabToDup] == null ? null : formTabsState[tabToDup].formState);
    };
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

    return !removingTab && formTabsState.length === 0 ? (
        <MpCalcHome handleAdd={handleAdd} />
    ) : (
        <>
            <AppBar>
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
                <TabAddDialog
                    onAddTab={handleAdd}
                    tabsList={tabsList}
                    render={(style, handleClick) => (
                        <Button className={style} color='secondary' onClick={handleClick}>
                            <AddIcon />
                        </Button>
                    )}
                />
            </AppBar>
            {!removingTab &&
                formTabsState.map((tab, index) => {
                    return (
                        <TabPanel value={currentTab} index={index} key={index}>
                            <MpCalcTab
                                index={index}
                                tabInfo={formTabsState[index]}
                                onFormChange={handleFormChanges}
                                onFormSubmit={updateFormResults}
                            />
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
    updateFormResults: PropTypes.func.isRequired,
    formTabsState: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    formTabsState: state.mpFormTabs
});

const mapDispatchToProps = {
    updateFormTab: updateMpFormTab,
    addFormTab: addMpFormTab,
    removeFormTab: removeMpFormTab,
    updateFormResults: updateMpFormResults
};

export default connect(mapStateToProps, mapDispatchToProps)(MpCalcPage);
