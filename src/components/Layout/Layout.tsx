import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Navbar from '../Navbar/Navbar';

type LayoutProps = {
    children: ReactNode;
};

const Container = styled.div`
    width: 100%;
    height: 100vh;
`;

const Header = styled.div`
    width: 100%;
`;

const Layout = ({ children }: LayoutProps) => (
    <Container>
        <Header>
            <Navbar />
        </Header>
        {children}
    </Container>
);

export default Layout;
