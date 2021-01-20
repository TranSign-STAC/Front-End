import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 282px;
    height: 56px;
    border: none;
`;

const Button = styled.button`
    border-radius: 4px;
    border: none;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #5446f6;
`;

const TranslateBtn: React.FC = () => (
    <Container>
        <Button>번역하기</Button>
    </Container>
);

export default TranslateBtn;
