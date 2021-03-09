import React from 'react';
import styled from 'styled-components';

import SelectWrap from './SelectWrap';
import VoiceRecBtn from '../Button/VoiceRecBtn';

import Close from '../../../public/images/outline/close.svg';
import Videocam from '../../../public/images/fill/videocam.svg';

import * as theme from '../../style/theme';
import * as mixin from '../../style/mixin';

type StyleProps = {
    active?: Boolean;
    isMobileTablet: Boolean;
};

const Container = styled.div<StyleProps>`
    position: relative;
    ${mixin.mobileTablet(`
        width: 100%;
        height: 100%;
        margin: 0;
        background: #fbfbff;
    `)};
    ${mixin.desktop(`
        height: 424px;
        border: 1px solid #e2e2e6;
        margin: 40px auto 0 auto;
        background: ${theme.WHITE};
    `)}
    ${mixin.desktopM(`
        width: 960px;
    `)};
    ${mixin.desktopL(`
        width: 1046px;
    `)};
`;

const InputBoxWrap = styled.div<StyleProps>`
    position: relative;
    display: flex;
    ${mixin.mobileTablet(`
        background: #fbfbff;
        height: calc(100% - 98px);
    `)};
    ${mixin.mobile(`padding: 24px;`)};
    ${mixin.tablet(`padding: 40px;`)};
    ${mixin.desktop(`
        padding: 24px;
        background: ${theme.WHITE};
    `)};
`;

const BtnWrap = styled.div`
    position: absolute;
    bottom: 24px;
    left: 24px;
`;

const TextArea = styled.textarea<StyleProps>`
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    ${mixin.mobileTablet(`
        position: relative;
        height: 100%;
        background: #fbfbff;
        &::placeholder {
            position: absolute;
            width: 100%;
            text-align: center;
        }
    `)}
    ${mixin.mobile(`
        font-size: ${theme.paragraph}px;
        &::placeholder {
            font-size: ${theme.paragraph}px;
        }
    `)};
    ${mixin.tablet(`
        font-size: ${theme.subTitle}px;
        &::placeholder {
            font-size: ${theme.subTitle}px;
        }
    `)};
    ${mixin.desktop(`
        height: 240px;
        font-size: 16px;
    `)}
`;

const CloseWrap = styled.div<StyleProps>`
    ${mixin.mobileTablet(`
        padding: 4px 4px 0 12px;
    `)}
    ${mixin.desktop(`
        padding: 8px 8px 0 24px;
    `)}
    cursor: pointer;
`;

const SignLanguage = styled.div`
    height: 368px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const CircleBtn = styled.button`
    width: 128px;
    height: 128px;
    border: none;
    border-radius: 50%;
    background: ${theme.WHITE};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
`;

const Text = styled.span`
    margin-top: 17px;
`;

type Props = {
    inputValue: string;
    isMobileTablet: boolean;
    isTarSorChanged: boolean;
    setInputValue: Function;
    setIsTarSorChanged: Function;
    setShowRecordModal: Function;
};

const TranslationArea = ({
    inputValue,
    isMobileTablet,
    isTarSorChanged,
    setInputValue,
    setIsTarSorChanged,
    setShowRecordModal,
}: Props) => {
    const handleInputValue = (e) => setInputValue(e.target.value);
    const deleteInputValue = () => setInputValue('');
    const handleShowModal = () => setShowRecordModal(true);

    return (
        <Container isMobileTablet={isMobileTablet}>
            <SelectWrap
                isMobileTablet={isMobileTablet}
                isTarSorChanged={isTarSorChanged}
                setIsTarSorChanged={setIsTarSorChanged}
                setShowRecordModal={setShowRecordModal}
            />
            {isTarSorChanged ? (
                <SignLanguage>
                    <CircleBtn onClick={handleShowModal}>
                        <Videocam />
                    </CircleBtn>
                    <Text>버튼을 눌러 수어 녹화</Text>
                </SignLanguage>
            ) : (
                <>
                    <InputBoxWrap isMobileTablet={isMobileTablet}>
                        <TextArea
                            isMobileTablet={isMobileTablet}
                            placeholder="번역할 내용을 입력하세요."
                            value={inputValue}
                            onChange={handleInputValue}
                        />
                        {inputValue.length > 0 ? (
                            <CloseWrap isMobileTablet={isMobileTablet} onClick={deleteInputValue}>
                                <Close />
                            </CloseWrap>
                        ) : null}
                    </InputBoxWrap>
                    {!isMobileTablet && (
                        <BtnWrap>
                            <VoiceRecBtn />
                        </BtnWrap>
                    )}
                </>
            )}
        </Container>
    );
};

export default TranslationArea;
