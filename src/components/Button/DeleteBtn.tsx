import React from 'react';
import styled, { css } from 'styled-components';

import Loading from '../../../public/images/white/Loading.svg';

import * as theme from '../../style/theme';
import * as mixin from '../../style/mixin';

type styleProps = {
    status: String;
};

type Props = {
    status: String;
};

const Container = styled.div`
    border: none;
    ${mixin.mobile(css`
        width: 311px;
        height: 48px;
    `)}
    ${mixin.tablet(css`
        width: 448px;
        height: 56px;
        margin-bottom: 16px;
    `)}
    ${mixin.desktop(css`
        width: 448px;
        height: 56px;
        margin-bottom: 16px;
    `)}
`;

const Button = styled.button<styleProps>`
    border: none;
    width: 100%;
    height: 100%;
    ${(props) =>
        props.status === 'enable'
            ? css`
                  background: ${theme.RED};
                  color: ${theme.WHITE};
              `
            : css`
                  background-color: rgba(0, 0, 0, 0.2);
                  color: rgba(0, 0, 0, 0.4);
              `};
    ${mixin.mobile(css`
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    `)}
    ${mixin.tablet(css`
        border-radius: 4px;
        font-size: 16px;
        line-height: 24px;
    `)}
    ${mixin.desktop(css`
        border-radius: 4px;
        font-size: 16px;
        line-height: 24px;
    `)}
`;

const DeleteBtn = ({ status }: Props) => (
    <Container>
        {status === 'enable' ? (
            <Button status={status}>삭제하기</Button>
        ) : (
            <Button status={status} disabled>
                {status === 'disable' ? '삭제하기' : <Loading />}
            </Button>
        )}
    </Container>
);

export default DeleteBtn;
