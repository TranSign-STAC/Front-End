import React from 'react';
import styled, { css } from 'styled-components';

import * as color from '../../style/variables';

type styleProps = {
    status: String;
};

const Container = styled.div`
    width: 448px;
    height: 56px;
    border: none;
`;

const Button = styled.button<styleProps>`
    border-radius: 4px;
    border: none;
    width: 100%;
    height: 100%;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    ${(props) =>
        props.status === 'enable'
            ? css`
                  background: ${color.RED};
                  color: ${color.WHITE};
              `
            : css`
                  background-color: rgba(0, 0, 0, 0.2);
                  color: rgba(0, 0, 0, 0.4);
              `};
`;

type Props = {
    status: String;
};

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
