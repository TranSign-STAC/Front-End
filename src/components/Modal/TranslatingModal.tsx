import React from 'react';
import styled from 'styled-components';

import Close from '../../assets/outline/close.svg';
import Translation from '../../assets/white/translation.svg';

import * as color from '../../style/variables';

const Container = styled.div`
    position: relative;
    width: 480px;
    height: 325px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    border-radius: 4px;
    border: 1px solid black;
`;

const CloseWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;

const TranslationWrapper = styled.div`
    margin: 35px auto;
    width: 192px;
    height: 192px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${color.PURPLE};
    border-radius: 100%;
`;

const Describe = styled.p`
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 40px;
    letter-spacing: 0.5px;
`;

const TranslatingModal: React.FC = () => {
    return (
        <Container>
            <CloseWrapper>
                <Close />
            </CloseWrapper>
            <TranslationWrapper>
                <Translation />
            </TranslationWrapper>
            <Describe>번역중입니다...</Describe>
        </Container>
    );
};

export default TranslatingModal;
