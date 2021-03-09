import React from 'react';
import styled from 'styled-components';

import Close from '../../../public/images/outline/close.svg';
import Translation from '../../../public/images/white/translation.svg';

import * as theme from '../../style/theme';
import * as mixin from '../../style/mixin';

type Props = {
    isMobile: boolean;
    setIsTranslating: Function;
};

const Container = styled.div`
    position: relative;
    z-index: 9999;
    width: 480px;
    height: 325px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    border-radius: 4px;
    background: ${theme.WHITE};
    ${mixin.mobile(`
        width: 311px;
        height: 280px;
        border-radius: 8px;
    `)}
`;

const CloseWrap = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;

const TranslationWrap = styled.div`
    margin: 35px auto;
    width: 192px;
    height: 192px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${theme.PURPLE};
    border-radius: 100%;
    ${mixin.mobile(`
        width: 128px;
        height: 128px;
    `)}
`;

const Describe = styled.p`
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 40px;
    ${mixin.mobile(`
        margin-bottom: 16px;
    `)}
`;

const CancelButton = styled.button`
    width: 100%;
    height: 48px;
    border: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background: ${theme.PURPLE};
    color: ${theme.WHITE};
    text-align: center;
`;

const TranslatingModal = ({ isMobile, setIsTranslating }: Props) => {
    const handleClick = () => setIsTranslating(false);
    return (
        <Container>
            {!isMobile && (
                <CloseWrap onClick={handleClick}>
                    <Close />
                </CloseWrap>
            )}
            <TranslationWrap>
                <Translation />
            </TranslationWrap>
            <Describe>번역중...</Describe>
            {isMobile && <CancelButton onClick={handleClick}>취소</CancelButton>}
        </Container>
    );
};

export default TranslatingModal;
