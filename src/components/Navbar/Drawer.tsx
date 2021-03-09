import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

import * as theme from '../../style/theme';

import Logo from '../../../public/images/logo/Logo_Big.svg';

type StyleProps = {
    isActivated: Boolean;
};

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 250px;
    height: 100%;
    background: ${theme.WHITE};
`;

const LogoWrap = styled.div`
    width: 100%;
    margin: 64px 0 35px 16px;
`;

const LinkList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const StyledLink = styled.a<StyleProps>`
    width: calc(100%-16px);
    height: 48px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 16px;
    font-size: ${theme.paragraph}px;
    font-weight: ${(props) => (props.isActivated ? 'bold' : 'normal')};
    &:hover {
        background: #eeedfe;
    }
`;

const Footer = styled.div`
    position: absolute;
    bottom: 32px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const FooterItem = styled.a`
    width: calc(100%-16px);
    padding-left: 16px;
    margin-bottom: 8px;
    font-size: ${theme.smallText}px;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.6);
`;

type Props = {
    handleShowMenu: Function;
};

const Drawer = ({ handleShowMenu }: Props) => {
    const router = useRouter();

    return (
        <Container>
            <LogoWrap>
                <Logo />
            </LogoWrap>
            <LinkList>
                <Link href="/translate">
                    <StyledLink
                        isActivated={router.pathname === '/translate'}
                        onClick={() => handleShowMenu()}>
                        홈
                    </StyledLink>
                </Link>
                <Link href="/history">
                    <StyledLink isActivated={router.pathname === '/history'} onClick={() => handleShowMenu()}>
                        번역기록
                    </StyledLink>
                </Link>
            </LinkList>
            <Footer>
                <Link href="#">
                    <FooterItem>서비스약관</FooterItem>
                </Link>
                <Link href="#">
                    <FooterItem>개인정보처리방침</FooterItem>
                </Link>
            </Footer>
        </Container>
    );
};

export default Drawer;
