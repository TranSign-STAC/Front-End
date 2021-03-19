import React from 'react';
import styled, { css } from 'styled-components';

import Close from '../../../public/images/outline/close.svg';

import * as theme from '../../style/theme';
import * as mixin from '../../style/mixin';

type Props = {
    translationText: string;
    handleClick: () => void;
};

const Container = styled.div`
    height: 80px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    border-radius: 4px;
    background: ${theme.WHITE};
    ${mixin.mobile(css`
        width: calc(100% - 48px);
        margin-bottom: 16px;
    `)}
    ${mixin.tabletM(css`
        width: 311px;
    `)}
    ${mixin.tabletL(css`
        width: 320px;
    `)}
    ${mixin.desktop(css`
        width: 368px;
        &:hover {
            & > div {
                display: inline;
            }
        }
    `)}
`;

const CloseWrap = styled.div`
    ${mixin.mobile(css`
        display: inline;
    `)}
    ${mixin.tablet(css`
        display: inline;
    `)}
    ${mixin.desktop(css`
        display: none;
    `)}
    position: absolute;
    top: 28px;
    right: 28px;
`;

const Title = styled.h2`
    margin-bottom: 8px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
`;

const TranslatedText = styled.p`
    width: 100%;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
`;

const History = ({ translationText, handleClick }: Props) => {
    return (
        <Container>
            <CloseWrap onClick={handleClick}>
                <Close />
            </CloseWrap>
            <Title>한국어 → 수어</Title>
            <TranslatedText>{translationText.slice(0, 55)}</TranslatedText>
        </Container>
    );
};

export default React.memo(History);
