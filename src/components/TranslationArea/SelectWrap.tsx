import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import Dropdown from './Dropdown';

import Translation from '../../../public/images/outline/translation.svg';
import DownArrow from '../../../public/images/outline/downArrow.svg';

import * as theme from '../../style/theme';
import * as mixin from '../../style/mixin';

type StyleProps = {
    active?: Boolean;
    isMobileTablet: Boolean;
};

const Container = styled.div<StyleProps>`
    width: 100%;
    ${mixin.mobile(`
        height: 25px;
        display: flex;
        align-items: center;
        padding: 10px 0 15px 0;
        background: ${theme.WHITE};
    `)};
    ${mixin.tablet(`
        height: 25px;
        display: flex;
        align-items: center;
        padding: 10px 0 15px 0;
        background: #ffffff;
    `)};
    ${mixin.desktop(`
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #e2e2e6;
    `)};
`;

const LanguageWrap = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Language = styled.span`
    margin-right: 10.7px;
    font-weight: bold;
    font-size: ${theme.paragraph};
    line-height: 24px;
`;

const TranslationWrap = styled.div``;

type Props = {
    isMobileTablet: Boolean;
    isTarSorChanged: Boolean;
    setIsTarSorChanged: Function;
    setShowRecordModal: Function;
};

const SelectWrap = ({ isMobileTablet, isTarSorChanged, setIsTarSorChanged, setShowRecordModal }: Props) => {
    const [sourceLanguage, setSourceLanguage] = useState<number>(0);
    const [targetLanguage, setTargetLanguage] = useState<number>(1);
    const [isSourceDrdwOpened, setIsSourceDrdwOpened] = useState<boolean>(false);
    const [isTargetDrdwOpened, setIsTargetDrdwOpened] = useState<boolean>(false);

    const router = useRouter();

    const languageList: string[] = ['한국어', '수어'];

    const handleSourceDrdw = () => {
        setIsSourceDrdwOpened(!isSourceDrdwOpened);
        setIsTargetDrdwOpened(false);
    };
    const handleTargetDrdw = () => {
        setIsTargetDrdwOpened(!isTargetDrdwOpened);
        setIsSourceDrdwOpened(false);
    };
    const handleTarSorChange = () => {
        if (!isTarSorChanged && isMobileTablet) {
            router.push('/');
            return;
        }
        let temp: number = targetLanguage;
        setTargetLanguage(sourceLanguage);
        setSourceLanguage(temp);
        setIsTarSorChanged(!isTarSorChanged);
    };

    return (
        <Container isMobileTablet={isMobileTablet}>
            <LanguageWrap onClick={handleSourceDrdw}>
                {isTarSorChanged ? <Language>수어</Language> : <Language>한국어</Language>}
                {!isMobileTablet && <DownArrow />}
                {isSourceDrdwOpened && (
                    <Dropdown
                        languageList={languageList}
                        language={sourceLanguage}
                        changeLanguage={handleTarSorChange}
                        setIsDropdown={handleSourceDrdw}
                    />
                )}
            </LanguageWrap>
            <TranslationWrap onClick={handleTarSorChange}>
                <Translation />
            </TranslationWrap>
            <LanguageWrap onClick={handleTargetDrdw}>
                {isTarSorChanged ? <Language>한국어</Language> : <Language>수어</Language>}
                {!isMobileTablet && <DownArrow />}
                {isTargetDrdwOpened && (
                    <Dropdown
                        languageList={languageList}
                        language={targetLanguage}
                        changeLanguage={handleTarSorChange}
                        setIsDropdown={handleTargetDrdw}
                    />
                )}
            </LanguageWrap>
        </Container>
    );
};

export default React.memo(SelectWrap);
