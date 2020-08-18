import React from 'react';
import { Container, Box, Typography, Link } from '@material-ui/core';

const AboutPage = () => {
    return (
        <Container maxWidth='md' style={{ paddingTop: '48px' }}>
            <Box my={3} mx={'auto'} pb={2} borderBottom='1px solid rgba(255, 255, 255, 0.3)'>
                <Typography variant='h4' component='div' align='center'>
                    About
                </Typography>
            </Box>
            <Typography variant='body1' component='div' align='left'>
                <p>
                    マギレコ検証派の皆様が苦労して明らかにさせた情報を使って計算機を作ってみました。このウェブサイトができたのはその皆様のおかげだと言うべきと思います。
                </p>
                <p>
                    間違いがあった場合、私の解釈違いか力不足ゆえのバーグが原因である可能性は高いので是非教えてください。（誤字とかもお願いします。）
                </p>
            </Typography>

            <Box mt={4} mb={2}>
                <Typography variant='h5' component='div' align='left' style={{ textDecoration: 'underline' }}>
                    情報元
                </Typography>
            </Box>
            <Typography variant='body1' component='div' align='left'>
                <p>
                    通常クエストとミラーズでのダメージ計算式、MP計算式、そしてメモリアとコネクトの効果量に関しては概ね
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
                    <li>チャージディスクダメージUP - これは実は数字が全然見つからなくて外しました</li>
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
