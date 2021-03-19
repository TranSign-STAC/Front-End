import styled, { css } from 'styled-components';

import * as theme from '../../style/theme';
import * as mixin from '../../style/mixin';

type Props = {
    isMobile: boolean;
    videoUrl: string;
    text: string;
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    ${mixin.tablet(css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `)}
`;

const ResultWrap = styled.div`
    ${mixin.mobileTablet(css`
        width: 100%;
        height: 100%;
    `)}
    ${mixin.desktop(css`
        margin: 40px auto;
        display: flex;
        flex-direction: row;
        align-items: center;
    `)}
    ${mixin.desktopS(css`
        width: 1131px;
        height: 456px;
    `)}
    ${mixin.desktopM(css`
        width: 1206px;
        height: 480px;
    `)}
    ${mixin.desktopL(css`
        width: 1440px;
        height: 573px;
    `)}
`;

const ResultVideo = styled.div`
    background: rgba(0, 0, 0, 0.1);
    ${mixin.mobile(css`
        width: 100%;
        height: 65%;
    `)}
    ${mixin.tablet(css`
        width: 100%;
        height: 432px;
    `)}
    ${mixin.desktop(css`
        width: 70%;
        height: 100%;
    `)}
`;

const ResultText = styled.div`
    ${mixin.mobile(css`
        width: calc(100% - 48px);
        height: calc(35% - 48px);
        padding: 24px;
    `)}
    ${mixin.tablet(css`
        width: calc(100% - 80px);
        height: 160px;
        padding: 40px;
    `)}
    ${mixin.desktop(css`
        width: calc(30% - 48px);
        height: calc(100% - 48px);
        padding: 24px;
        background: ${theme.WHITE};
    `)}
`;

const ResultTitle = styled.h2`
    font-weight: bold;
    font-size: ${theme.subTitle}px;
    margin-bottom: 16px;
`;
const ResultParagraph = styled.p`
    ${mixin.desktop(css`
        font-size: ${theme.paragraph}px;
        line-height: 24px;
    `)}
`;

const RetryButtonWrap = styled.div`
    width: 448px;
    height: 56px;
    border-radius: 4px;
    background: ${theme.PURPLE};
    margin: 0 auto;
    ${mixin.tablet(css`
        margin: 0 auto 80px auto;
    `)}
`;

const RetryButton = styled.button`
    all: unset;
    width: 100%;
    height: 100%;
    color: white;
    font-size: ${theme.paragraph}px;
    text-align: center;
    border-radius: 4px;
`;

const ResultPage = ({ isMobile, videoUrl, text }: Props) => {
    const handleRetry = () => document.location.reload();

    return (
        <Container>
            <ResultWrap>
                <ResultVideo>{videoUrl}</ResultVideo>
                <ResultText>
                    {!isMobile && <ResultTitle>번역 결과</ResultTitle>}
                    <ResultParagraph>{text}</ResultParagraph>
                </ResultText>
            </ResultWrap>
            {!isMobile && (
                <RetryButtonWrap>
                    <RetryButton onClick={handleRetry}>번역 다시하기</RetryButton>
                </RetryButtonWrap>
            )}
        </Container>
    );
};

export default ResultPage;
