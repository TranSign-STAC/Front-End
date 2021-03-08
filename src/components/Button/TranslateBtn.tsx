import React from 'react';
import styled, { css } from 'styled-components';

import Loading from '../../../public/images/white/Loading.svg';

import * as theme from '../../style/theme';
import * as mixin from '../../style/mixin';

type styleProps = {
    status: boolean;
};

type Props = {
    data: string | Blob | null;
    status: boolean;
    loading: boolean;
    handleTranslate: Function;
};

const Container = styled.div`
    width: 100%;
    min-width: 282px;
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
        props.status
            ? css`
                  background: ${theme.PURPLE};
                  color: ${theme.WHITE};
              `
            : css`
                  background-color: rgba(0, 0, 0, 0.2);
                  color: rgba(0, 0, 0, 0.4);
              `};
    ${mixin.mobile(
        `
            border-radius: 0;
        `
    )}
`;

const TranslateBtn = ({ data, status, loading, handleTranslate }: Props) => {
    const handleClick = () => handleTranslate({ text: data });

    return (
        <Container>
            {!loading && status ? (
                <Button status={!loading && status} onClick={handleClick}>
                    번역하기
                </Button>
            ) : (
                <Button status={!loading && status} disabled>
                    {loading ? <Loading /> : '번역하기'}
                </Button>
            )}
        </Container>
    );
};

export default TranslateBtn;
