import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import Mic from '../../../public/images/fill/mic.svg';
import MicWhite from '../../../public/images/white/mic.svg';

import * as theme from '../../style/theme';

type StyleProps = {
    active: boolean;
};

const Container = styled.div<StyleProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 192px;
    height: 56px;
    border-radius: 40px;
    ${(props) =>
        props.active
            ? css`
                  background: ${theme.PURPLE};
                  box-shadow: 0px 0px 10px rgba(84, 70, 246, 0.5);
              `
            : css`
                  background: ${theme.WHITE};
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              `};
`;

const Button = styled.button<StyleProps>`
    all: unset;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => (props.active ? theme.WHITE : theme.PURPLE)};
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    & > svg {
        margin-right: 10px;
    }
`;

const Span = styled.span`
    width: 96px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const VoiceRecBtn: React.FC = () => {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleClick = () => setIsClicked(true);

    return (
        <Container active={isClicked}>
            <Button onClick={handleClick} active={isClicked}>
                {isClicked ? (
                    <>
                        <MicWhite />
                        <Span>음성 번역 중..</Span>
                    </>
                ) : (
                    <>
                        <Mic />
                        <Span>음성 번역</Span>
                    </>
                )}
            </Button>
        </Container>
    );
};

export default VoiceRecBtn;
