import React from 'react';
import styled, { css } from 'styled-components';

import * as theme from '../../style/theme';

type styleProps = {
    status: String;
};

const Container = styled.div`
    width: 100%;
    max-width: 448px;
    min-width: 282px;
    height: 56px;
    border: none;
    margin: 0 auto;
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
                  background: ${theme.PURPLE};
                  color: ${theme.WHITE};
              `
            : css`
                  background-color: rgba(0, 0, 0, 0.2);
                  color: rgba(0, 0, 0, 0.4);
              `};
`;

type Props = {
    status: String;
};

const TranslateBtn = ({ status }: Props) => (
    <Container>
        {status === 'enable' ? (
            <Button status={status}>번역하기</Button>
        ) : (
            <Button status={status} disabled>
                {status === 'disable' ? '번역하기' : '...'}
            </Button>
        )}
    </Container>
);

export default TranslateBtn;
