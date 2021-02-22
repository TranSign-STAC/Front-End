import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Layout from '../../components/Layout/Layout';
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
    isMobile: Boolean;
};

type StoreType = {
    translate: { translateStatus: { data: object | null; loading: boolean; error: object | null } };
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
    ${mixin.mobileTablet(`height: 75%;`)};
`;

const TranslateBtnsWrap = styled.div<StyleProps>`
    width: 100%;
    display: flex;
    ${mixin.mobile(`
        height: 25%;
        min-height: 160px;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
    `)};
    ${mixin.tablet(`
        width: 100%;
        height: 25%;
        align-items: center;
        justify-content: center;
    `)}
    ${mixin.desktop(`
        justify-content: center;
        margin-top: 40px;
    `)}
`;

const TranslateBtnWrap = styled.div<StyleProps>`
    ${mixin.mobile(`
        width: 100%;
    `)}
    ${mixin.tablet(`
        width: 60%;
    `)}
    ${mixin.desktop(`
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
    const uuid = useSelector((state: StoreType) => state.user.uuid);
    const dispatch = useDispatch();

    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [isTranslating, setIsTranslating] = useState<boolean>(translateStatus.loading);
    const [showRecordModal, setShowRecordModal] = useState<boolean>(false);
    const [isTarSorChanged, setIsTarSorChanged] = useState<boolean>(false);

    const handleTranslate = (payload: HandleTextToSignParamsType) => {
        setIsTranslating(true);
        if (isTarSorChanged)
            dispatch({
                type: TRANSLATE_SIGN_TO_TEXT_LOADING,
                payload: {
                    ...payload,
                    uuid,
                },
            });
        else
            dispatch({
                type: TRANSLATE_TEXT_TO_SIGN_LOADING,
                payload: {
                    ...payload,
                    uuid: localStorage.getItem('uuid'),
                },
            });
    };
    useEffect(() => {
        if (!localStorage.getItem('uuid')) localStorage.setItem('uuid', uuidv4());
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }, []);
    return (
        <Layout>
            <Container>
                <TranslationAreaWrap isMobile={isMobile}>
                    <TranslationArea
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        isMobile={isMobile}
                        isTarSorChanged={isTarSorChanged}
                        setIsTarSorChanged={setIsTarSorChanged}
                        setShowRecordModal={setShowRecordModal}
                    />
                </TranslationAreaWrap>
                {!isTarSorChanged && (
                    <TranslateBtnsWrap isMobile={isMobile}>
                        {isMobile && <VoiceRecBtn isMobile={isMobile} />}
                        <TranslateBtnWrap isMobile={isMobile}>
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
                        <VideoRecordingModal isMobile={isMobile} setShowRecordModal={setShowRecordModal} />
                    </RecordingModalWrap>
                )}
                {translateStatus.loading && isTranslating && (
                    <TranslatingModalWrap>
                        <TranslatingModalBackground />
                        <TranslatingModal isMobile={isMobile} setIsTranslating={setIsTranslating} />
                    </TranslatingModalWrap>
                )}
            </Container>
        </Layout>
    );
};

export default TranslatePage;
