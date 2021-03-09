import React from 'react';
import styled from 'styled-components';

import DeleteBtn from '../Button/DeleteBtn';

import Close from '../../../public/images/outline/close.svg';
import TrashWhite from '../../../public/images/white/trash.svg';
import Trash from '../../../public/images/fill/trash.svg';

import * as theme from '../../style/theme';
import * as mixin from '../../style/mixin';

const Container = styled.div`
    position: relative;
    z-index: 9999;
    width: 480px;
    height: 332px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    background: ${theme.WHITE};
    ${mixin.mobile(`
        width: 311px;
        height: 191px;
        border-radius: 8px;
    `)}
`;

const CloseWrap = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;

const TrashWrap = styled.div`
    ${mixin.mobile(`
        margin: 25.5px 0 9.5px 0;
    `)}
    ${mixin.tablet(`
        margin: 24px auto;
        width: 72px;
        height: 72px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${theme.RED};
        border-radius: 100%;
    `)}
    ${mixin.desktop(`
        margin: 25px auto;
        width: 72px;
        height: 72px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${theme.RED};
        border-radius: 100%;
    `)}
`;

const Title = styled.h2`
    color: ${theme.RED};
    font-weight: 700;
    text-align: center;
    ${mixin.mobile(`
        font-size: 18px;
        line-height: 27px;
        margin-bottom: 6px;
    `)}
    ${mixin.tablet(`
        font-size: 24px;
        line-height: 36px;
        margin-bottom: 16px;
    `)}
    ${mixin.desktop(`
        font-size: 24px;
        line-height: 35.5px;
        margin-bottom: 16px;
    `)}
`;

const Describe = styled.p`
    font-weight: 300;
    text-align: center;
    ${mixin.mobile(`
        font-size: 12px;
        line-height: 18px;
        margin-bottom: 16px;
    `)}
    ${mixin.tablet(`
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 40px;
    `)}
    ${mixin.desktop(`font-size: 16px;
        line-height: 24px;
        margin-bottom: 40px;
    `)}
`;

type Props = {
    isMobile: Boolean;
    handleClick: Function;
};

const DeleteModal = ({ isMobile, handleClick }: Props) => {
    return (
        <Container>
            {!isMobile && (
                <CloseWrap onClick={handleClick}>
                    <Close />
                </CloseWrap>
            )}
            <TrashWrap>{isMobile ? <Trash /> : <TrashWhite />}</TrashWrap>
            <Title>번역 기록 삭제</Title>
            <Describe>
                삭제한 번역 기록은 복구할 수 없습니다. <br />
                번역 기록을 삭제하시겠습니까?
            </Describe>
            <DeleteBtn status="enable" />
        </Container>
    );
};

export default DeleteModal;
