import React from 'react';
import styled from 'styled-components';

import DeleteBtn from '../Button/DeleteBtn';

import Close from '../../assets/outline/close.svg';
import Trash from '../../assets/white/trash.svg';

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

const TrashWrapper = styled.div`
    margin: 25px auto;
    width: 72px;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${color.RED};
    border-radius: 100%;
`;

const Title = styled.h2`
    color: ${color.RED};
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
    margin-bottom: 30px;
`;

const Describe = styled.p`
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    margin-bottom: 40px;
`;

const DeleteModal: React.FC = () => {
    return (
        <Container>
            <CloseWrapper>
                <Close />
            </CloseWrapper>
            <TrashWrapper>
                <Trash />
            </TrashWrapper>
            <Title>번역 기록 삭제</Title>
            <Describe>
                삭제한 번역 기록은 복구할 수 없습니다. <br />
                번역 기록을 삭제하시겠습니까?
            </Describe>
            <DeleteBtn />
        </Container>
    );
};

export default DeleteModal;
