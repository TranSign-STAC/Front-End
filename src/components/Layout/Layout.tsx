import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Navbar from '../Navbar/Navbar';

type Props = {
    children: ReactNode;
};

const Container = styled.div`
    width: 100%;
    height: 100vh;
`;

const Header = styled.div`
    width: 100%;
    height: 64px;
`;

const Main = styled.div`
    width: 100%;
    height: calc(100% - 64px);
`;

const Layout = ({ children }: Props) => (
    <Container>
        <Header>
            <Navbar />
        </Header>
        <Main>{children}</Main>
    </Container>
);

export default Layout;
