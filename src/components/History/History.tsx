import React from 'react';
import styled from 'styled-components';

import Close from '../../assets/outline/close.svg';

type Props = {
    SourceLanguage: string;
    TargetLanguage: string;
    TranslationText: string;
};

const Container = styled.div`
    position: relative;
    width: 377px;
    height: 128px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 20px;
    border-radius: 4px;
    border: 1px solid black;
    &:hover {
        & > div {
            display: inline;
        }
    }
`;

const CloseWrapper = styled.div`
    display: none;
    position: absolute;
    top: 10px;
    right: 10px;
`;

const Title = styled.h2`
    margin: 15px 0;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
`;

const TranslatedText = styled.p`
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
`;

const History: React.FC = () => {
    return (
        <Container>
            <CloseWrapper>
                <Close />
            </CloseWrapper>
            <Title>한국어 → 수어</Title>
            <TranslatedText>
                TranSign이란, 한국 수어 번역 및 웹 페이지 수어 번역 솔루션입니다. TranSign이란, 한국 수어 번역
                및 웹 페...
            </TranslatedText>
        </Container>
    );
};

export default History;
