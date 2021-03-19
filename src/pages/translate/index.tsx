import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import Layout from '../../components/Layout/Layout';
import Result from '../../components/Result/Result';
import VoiceRecBtn from '../../components/Button/VoiceRecBtn';
import TranslateBtn from '../../components/Button/TranslateBtn';
import TranslatingModal from '../../components/Modal/TranslatingModal';
import VideoRecordingModal from '../../components/Modal/VideoRecordingModal';
import TranslationArea from '../../components/TranslationArea/TranslationArea';

import {
    TRANSLATE_TEXT_TO_SIGN_LOADING,
    TRANSLATE_SIGN_TO_TEXT_LOADING,
} from '../../store/modules/translate';

import * as mixin from '../../style/mixin';

type StyleProps = {
    isMobileTablet: Boolean;
};

type StoreType = {
    translate: {
        translateStatus: { data: { renderUrl: string } | null; loading: boolean; error: object | null };
    };
    user: { uuid: string };
};

type HandleTextToSignParamsType = {
    payload: {
        uuid: string;
        text: string;
    };
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TranslationAreaWrap = styled.div<StyleProps>`
    width: 100%;
    ${mixin.mobileTablet(css`
        height: 75%;
    `)};
`;

const TranslateBtnsWrap = styled.div<StyleProps>`
    width: 100%;
    display: flex;
    ${mixin.mobile(css`
        height: 25%;
        min-height: 160px;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
    `)};
    ${mixin.tablet(css`
        width: 100%;
        height: 25%;
        align-items: center;
        justify-content: center;
    `)}
    ${mixin.desktop(css`
        justify-content: center;
        margin-top: 40px;
    `)}
`;

const TranslateBtnWrap = styled.div<StyleProps>`
    ${mixin.mobile(css`
        width: 100%;
    `)}
    ${mixin.tabletM(css`
        width: 448px;
    `)}
    ${mixin.tabletL(css`
        width: 464px;
    `)}
    ${mixin.desktop(css`
        width: 448px;
    `)}
`;

const RecordingModalWrap = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
`;

const TranslatingModalWrap = styled.div`
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const TranslatingModalBackground = styled.div`
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
`;

const TranslatePage = () => {
    const translateStatus = useSelector((state: StoreType) => state.translate.translateStatus);
    const dispatch = useDispatch();

    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isMobileTablet, setIsMobileTablet] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [isTranslating, setIsTranslating] = useState<boolean>(translateStatus.loading);
    const [showRecordModal, setShowRecordModal] = useState<boolean>(false);
    const [isTarSorChanged, setIsTarSorChanged] = useState<boolean>(false);

    const handleTranslate = (payload: HandleTextToSignParamsType): void => {
        setIsTranslating(true);
        if (isTarSorChanged)
            dispatch({
                type: TRANSLATE_SIGN_TO_TEXT_LOADING,
                payload: {
                    ...payload,
                },
            });
        else
            dispatch({
                type: TRANSLATE_TEXT_TO_SIGN_LOADING,
                payload: {
                    ...payload,
                },
            });
    };
    useEffect(() => {
        setIsMobile(screen.width <= 425);
        setIsMobileTablet(screen.width <= 1024);
    }, []);
    return (
        <Layout>
            {translateStatus.data ? (
                <Result isMobile={isMobile} videoUrl={translateStatus.data.renderUrl} text={inputValue} />
            ) : (
                <Container>
                    <TranslationAreaWrap isMobileTablet={isMobileTablet}>
                        <TranslationArea
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            isMobileTablet={isMobileTablet}
                            isTarSorChanged={isTarSorChanged}
                            setIsTarSorChanged={setIsTarSorChanged}
                            setShowRecordModal={setShowRecordModal}
                        />
                    </TranslationAreaWrap>
                    {!isTarSorChanged && (
                        <TranslateBtnsWrap isMobileTablet={isMobileTablet}>
                            {isMobileTablet && <VoiceRecBtn isMobileTablet={isMobileTablet} />}
                            <TranslateBtnWrap isMobileTablet={isMobileTablet}>
                                <TranslateBtn
                                    data={inputValue}
                                    status={inputValue.length > 0}
                                    loading={translateStatus.loading && isTranslating}
                                    handleTranslate={handleTranslate}
                                />
                            </TranslateBtnWrap>
                        </TranslateBtnsWrap>
                    )}
                    {showRecordModal && (
                        <RecordingModalWrap>
                            <VideoRecordingModal
                                isMobileTablet={isMobileTablet}
                                setShowRecordModal={setShowRecordModal}
                                handleTranslate={handleTranslate}
                            />
                        </RecordingModalWrap>
                    )}
                    {translateStatus.loading && isTranslating && (
                        <TranslatingModalWrap>
                            <TranslatingModalBackground />
                            <TranslatingModal isMobile={isMobile} setIsTranslating={setIsTranslating} />
                        </TranslatingModalWrap>
                    )}
                </Container>
            )}
        </Layout>
    );
};

export default TranslatePage;
