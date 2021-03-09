import React, { useState, useCallback, memo } from 'react';
import styled, { css } from 'styled-components';

import Mic from '../../../public/images/fill/mic.svg';
import MicWhite from '../../../public/images/white/mic.svg';

import * as theme from '../../style/theme';
import * as mixin from '../../style/mixin';

const recordAudio = () =>
    new Promise(async (resolve) => {
        if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
            const stream: any = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks: Blob[] = [];

            mediaRecorder.addEventListener('dataavailable', (event: any) => {
                audioChunks.push(event.data);
            });

            const start = () => {
                console.log(mediaRecorder.state);
                mediaRecorder.start();
                console.log(mediaRecorder.state);
            };

            const stop = () =>
                new Promise((resolve) => {
                    mediaRecorder.addEventListener('stop', () => {
                        const audioBlob = new Blob(audioChunks, { type: 'audio/wav; codecs=0' });
                        resolve({ audioBlob });
                    });
                    console.log(mediaRecorder.state);
                    if (mediaRecorder.state !== 'inactive') mediaRecorder.stop();
                    console.log(mediaRecorder.state);
                });

            resolve({ start, stop });
        } else {
            alert('마이크를 찾을 수 없습니다.');
        }
    });

type StyleProps = {
    active: boolean;
};

type Props = {
    isMobileTablet: boolean;
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
    ${mixin.mobile(`
        margin-bottom: 24px;
    `)}
    ${mixin.tablet(`
        margin-right: 32px;
    `)}
`;

const ButtonWrap = styled.div<StyleProps>`
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

const Button = styled.button`
    all: unset;
    width: 100%;
    height: 100%;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Span = styled.span`
    width: 96px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
`;

const VoiceRecBtn = ({ isMobileTablet }: Props) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    let recorder: any = null;

    const handleStart = useCallback(async () => {
        if (isMobileTablet) {
            alert('해당 기능은 앱을 통해서 사용할 수 있습니다.');
            return;
        }
        setIsClicked(true);
        recorder = await recordAudio();
        recorder.start();
    }, [recorder]);
    const handleStop = useCallback(async () => {
        setIsClicked(false);
        const recordedBlob = await recorder.stop();
        console.log(recordedBlob);
    }, [recorder]);

    return (
        <Container active={isClicked}>
            <ButtonWrap active={isClicked}>
                {isClicked ? (
                    <Button onClick={handleStop}>
                        <MicWhite />
                        <Span>음성 번역 중..</Span>
                    </Button>
                ) : (
                    <Button onClick={handleStart}>
                        <Mic />
                        <Span>음성 번역</Span>
                    </Button>
                )}
            </ButtonWrap>
        </Container>
    );
};

export default memo(VoiceRecBtn);
