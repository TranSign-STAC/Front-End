import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import TranslateBtn from '../Button/TranslateBtn';

import Close from '../../../public/images/outline/close.svg';
import VideoCam from '../../../public/images/fill/videocam.svg';
import Play from '../../../public/images/white/play.svg';

import * as theme from '../../style/theme';

const constraints = {
    video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 720, ideal: 776, max: 1080 },
    },
};

const recordVideo = (setShowRecordModal: (value: boolean) => void): Promise<PromiseResultType> =>
    new Promise(async (resolve) => {
        if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
            let stream: any = null;
            try {
                stream = await navigator.mediaDevices.getUserMedia(constraints);
            } catch (err) {
                alert('카메라 접근 권한을 허용해주세요.');
                setShowRecordModal(false);
            }
            const mediaRecorder = new MediaRecorder(stream);
            const videoChunks: Blob[] = [];

            mediaRecorder.addEventListener('dataavailable', (event: any) => {
                videoChunks.push(event.data);
            });

            const start = () => mediaRecorder.start();

            const stop = () =>
                new Promise((resolve) => {
                    mediaRecorder.addEventListener('stop', () => {
                        const videoBlob = new Blob(videoChunks, { type: 'video/webm' });
                        const videoUrl = URL.createObjectURL(videoBlob);
                        resolve({ videoBlob, videoUrl });
                    });
                    if (mediaRecorder.state !== 'inactive') mediaRecorder.stop();
                });

            const close = () => stream.getTracks().forEach((track: any) => track.stop());

            resolve({ stream, start, stop, close });
        } else {
            alert('카메라를 찾을 수 없습니다.');
            setShowRecordModal(false);
        }
    });

type HandleTextToSignParamsType = {
    payload: {
        uuid: string;
        text: string;
    };
};

type StyleProps = {
    active: Boolean;
};

type Props = {
    isMobileTablet: boolean;
    setShowRecordModal: (value: boolean) => void;
    handleTranslate: (payload: HandleTextToSignParamsType) => void;
};

type PromiseResultType = {
    stream: MediaStream;
    start: () => void;
    stop: () => void;
    close: () => void;
};

const Container = styled.div`
    position: relative;
    background: ${theme.WHITE};
    width: 1124px;
    height: 494px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #e2e2e6;
`;

const CloseButton = styled.button`
    all: unset;
    position: absolute;
    top: 10px;
    right: 10px;
`;

const Video = styled.video`
    width: 100%;
    height: 100%;
`;

const VideoPreview = styled.div`
    width: 740px;
    height: 416px;
    background: #000000 10%;
`;

const ClickInterface = styled.div`
    width: 285px;
    height: 416px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

const TimeView = styled.h2`
    font-weight: bold;
    font-size: ${theme.title1};
    line-height: 52px;
`;

const VideoCamButton = styled.button<StyleProps>`
    width: 128px;
    height: 128px;
    border-radius: 100%;
    border: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.active ? theme.PURPLE : theme.WHITE)};
    outline: none;
`;

const PlayButton = styled.button`
    width: 128px;
    height: 128px;
    border-radius: 100%;
    border: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.PURPLE};
    outline: none;
`;

const VideoRecordingModal = ({ setShowRecordModal, isMobileTablet, handleTranslate }: Props) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isRecorded, setIsRecorded] = useState<boolean>(false);
    const [blob, setBlob] = useState<Blob | null>(null);
    const [blobUrl, setBlobUrl] = useState<string>('');
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    let recorder: any = null;

    const startRecording = useCallback(() => recorder.start(), [recorder]);
    const stopRecording = useCallback(async () => await recorder.stop(), [recorder]);
    const closeRecording = useCallback(async () => recorder.close(), [recorder]);

    const handleStart = () => {
        setIsRecording(true);
        startRecording();
    };

    const handleStop = async () => {
        const result = await stopRecording();
        setBlob(result.videoBlob);
        setBlobUrl(result.videoUrl);
        setIsRecorded(true);
        setIsRecording(false);
    };

    const handleClose = () => {
        closeRecording();
        setShowRecordModal(false);
    };

    const handlePlay = () => {
        if (videoRef.current) videoRef.current.play();
    };

    useEffect(() => {
        if (isMobileTablet) {
            alert('해당 기능은 앱을 통해서 사용할 수 있습니다.');
            setShowRecordModal(false);
            return;
        }
        recordVideo(setShowRecordModal).then((result): void => {
            setLocalStream(result.stream);
            recorder = result;
        });
    }, []);
    return (
        <Container>
            <CloseButton onClick={handleClose}>
                <Close />
            </CloseButton>
            {isRecorded ? (
                <VideoPreview>{<Video ref={videoRef} src={blobUrl} />}</VideoPreview>
            ) : (
                <VideoPreview>
                    <RTCVideo mediaStream={localStream} />
                </VideoPreview>
            )}
            <ClickInterface>
                <TimeView>0:00</TimeView>
                {!isRecording && !isRecorded && (
                    <VideoCamButton onClick={handleStart} active={isClicked}>
                        <VideoCam />
                    </VideoCamButton>
                )}
                {isRecording && (
                    <VideoCamButton onClick={handleStop} active={isClicked}>
                        <VideoCam />
                    </VideoCamButton>
                )}
                {isRecorded && (
                    <PlayButton onClick={handlePlay}>
                        <Play />
                    </PlayButton>
                )}
                <TranslateBtn
                    data={blob}
                    status={isRecorded}
                    loading={false}
                    handleTranslate={handleTranslate}
                />
            </ClickInterface>
        </Container>
    );
};

type RTCVideoProps = {
    mediaStream: MediaStream | null;
};

const RTCVideo = ({ mediaStream }: RTCVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) videoRef.current.srcObject = mediaStream ? mediaStream : null;
    }, [mediaStream]);

    return <Video ref={videoRef} autoPlay />;
};

export default VideoRecordingModal;
