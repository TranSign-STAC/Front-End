import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 448px;
    height: 56px;
    border: none;
`;

const Button = styled.button`
    border-radius: 4px;
    border: none;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #f16565;
    font-weight: bold;
`;

const TranslateBtn: React.FC = () => (
    <Container>
        <Button>삭제하기</Button>
    </Container>
);

export default TranslateBtn;
