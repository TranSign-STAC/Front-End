import React from 'react';
import styled, { css } from 'styled-components';

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
    ${mixin.mobile(`
        width: 311px;
        height: 48px;
    `)}
    ${mixin.tablet(`
        width: 448px;
        height: 56px;
        margin-bottom: 16px;
    `)}
    ${mixin.desktop(`
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
    ${mixin.mobile(`
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    `)}
    ${mixin.tablet(`
        border-radius: 4px;
        font-size: 16px;
        line-height: 24px;
    `)}
    ${mixin.desktop(`
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
                {status === 'disable' ? '삭제하기' : '...'}
            </Button>
        )}
    </Container>
);

export default DeleteBtn;
