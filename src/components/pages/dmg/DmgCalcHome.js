import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Container, Box, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TabAddDialog from '../../tabs/TabAddDialog';
import mainPicture from '../../../img/dmgPageExplanation.png';

const DmgCalcHome = ({ handleAdd }) => {
    return (
        <>
            <AppBar>
                <Tabs aria-label='mp tabs' indicatorColor='secondary'></Tabs>
                <TabAddDialog
                    onAddTab={handleAdd}
                    render={(style, handleClick) => (
                        <Button className={style} color='secondary' onClick={handleClick}>
                            <AddIcon />
                        </Button>
                    )}
                />
            </AppBar>
            <Container maxWidth='md' style={{ paddingTop: '48px' }}>
                <Box my={3} mx={'auto'} pb={2} borderBottom='1px solid rgba(255, 255, 255, 0.3)'>
                    <Typography variant='h4' component='div' align='center'>
                        マギレコダメージ計算機
                    </Typography>
                </Box>
                <Typography variant='body1' component='div' align='center'>
                    <img src={mainPicture} style={{ maxWidth: '100%', border: '1px solid rgba(255, 255, 255, 0.3)' }}></img>
                    <p>「+」ボタンをクリークすると、ダメージ計算フォームのタッブが開きます。</p>
                    <p>複数のタッブを開くことでほかのキャラと比べたりすることもできます。</p>
                    <p>
                        このページから移動しても、ウェブブラウザーを閉じても全タッブとそこに入力していた情報が保存されますので安心して自由に使ってください。
                    </p>
                </Typography>
            </Container>
        </>
    );
};

DmgCalcHome.propTypes = {
    handleAdd: PropTypes.func.isRequired
};

export default DmgCalcHome;
