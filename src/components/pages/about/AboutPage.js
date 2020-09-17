import React from 'react';
import { Container, Paper, Box, Typography, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1.5),
        margin: theme.spacing(2, 0)
    },
    item: {
        fontWeight: 400,
        marginBottom: theme.spacing(0),
        color: theme.palette.primary.main
    }
}));

const AboutPage = () => {
    const classes = useStyles();
    return (
        <Container maxWidth='md' style={{ paddingTop: '48px' }}>
            <Box my={3} mx={'auto'} pb={2} borderBottom='1px solid rgba(255, 255, 255, 0.3)'>
                <Typography variant='h4' component='div' align='center'>
                    About
                </Typography>
            </Box>
            <Typography variant='body1' component='div' align='left'>
                <p>マギレコ検証派の皆様が苦労して明らかにさせた情報を私的の情報収集と照り合わせて計算機を作ってみました。</p>
                <p>計算間違いや誤字が見つかったら是非教えてください。</p>
            </Typography>

            <Paper className={classes.root} variant='outlined'>
                <Box my={0} mx={'auto'} pb={0}>
                    <Typography className={classes.item} variant='h6' component='div' align='left'>
                        v0.0.2
                    </Typography>
                    <Typography variant='body1' component='div' align='left'>
                        <ul>
                            <li>タブ複製機能を追加</li>
                        </ul>
                    </Typography>
                </Box>
            </Paper>

            <Box mt={4} mb={2}>
                <Typography variant='h5' component='div' align='left' style={{ textDecoration: 'underline' }}>
                    情報元
                </Typography>
            </Box>
            <Typography variant='body1' component='div' align='left'>
                <p>
                    通常クエストとミラーズでのダメージ計算式、MP計算式、そして一部のメモリアとコネクトの効果量に関しては概ね
                    <Link
                        href='http://aruma160114.com/magireco/?%E3%83%80%E3%83%A1%E3%83%BC%E3%82%B8%E8%A8%88%E7%AE%97%E5%BC%8F%E8%A9%B3%E7%B4%B0'
                        target='_blank'
                        rel='noopener'
                    >
                        wiki
                    </Link>
                    が参考になっています。 キモチ戦に関連している数字は
                    <Link href='https://twitter.com/cat_mgrc/status/1290224271273336832' target='_blank' rel='noopener'>
                        @cat_mgrc
                    </Link>
                    さんと
                    <Link
                        href='https://twitter.com/magireco_alisa/status/1290967352549371907'
                        target='_blank'
                        rel='noopener'
                    >
                        @magireco_alisa
                    </Link>
                    さんの（リンク先の）つぶやきが参考になっています。
                </p>
            </Typography>

            <Box mt={4} mb={2}>
                <Typography variant='h5' component='div' align='left' style={{ textDecoration: 'underline' }}>
                    これから
                </Typography>
            </Box>
            <Typography variant='body1' component='div' align='left'>
                <p>今は使える形になって公開しているのですがまだ実装したい機能があります。</p>
                <ul>
                    <li>逆算昨日 - 個人的には相当便利になる機能で優先したいポイントです</li>
                    <li>防御時のMP獲得量 - 簡単な計算でそんなに必要ないと思いますがあるに越したことはないという感じかな</li>
                    <li>英語版</li>
                </ul>
            </Typography>

            <Box mt={4} mb={2}>
                <Typography variant='h5' component='div' align='left' style={{ textDecoration: 'underline' }}>
                    連絡先
                </Typography>
            </Box>
            <Typography variant='body1' component='div' align='left'>
                <p>
                    提案とかがあったら、
                    <Link href='https://twitter.com/Dusk252' target='_blank' rel='noopener'>
                        @Dusk252
                    </Link>
                    にDMを送ってください。
                </p>
            </Typography>
        </Container>
    );
};

export default AboutPage;
