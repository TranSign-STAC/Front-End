import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import Mic from '../../assets/fill/mic.svg';
import MicWhite from '../../assets/white/mic.svg';

import * as color from '../../style/variables';

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
                  background: ${color.PURPLE};
                  box-shadow: 0px 0px 10px rgba(84, 70, 246, 0.5);
              `
            : css`
                  background: ${color.WHITE};
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
    color: ${(props) => (props.active ? color.WHITE : color.PURPLE)};
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

const VoiceRec: React.FC = () => {
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

export default VoiceRec;
