import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

import Drawer from './Drawer';

import BackArrow from '../../../public/images/outline/backArrow.svg';
import Menu from '../../../public/images/outline/menu.svg';
import LogoRegular from '../../../public/images/logo/Logo_small.svg';
import LogoSmall from '../../../public/images/logo/logoSmall.svg';

import * as mixin from '../../style/mixin';

type StyleProps = {
    isActivated: boolean;
};

type StoreType = {
    translate: { translateStatus: { data: object | null; loading: boolean; error: object | null } };
    user: { uuid: string };
};

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mixin.mobileTablet(css`
        justify-content: center;
    `)}
`;

const Logo = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 40px;
    cursor: pointer;
    ${mixin.mobileTablet(css`
        margin: 0;
    `)}
`;

const LeftTopSvgWrap = styled.div`
    position: absolute;
    left: 20px;
    display: flex;
    align-items: center;
    border: none;
    background: #fff;
    cursor: pointer;
`;

const DrawerWrap = styled.div`
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const DrawerBackground = styled.div`
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
`;

const List = styled.div`
    position: relative;
    right: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Item = styled.a<StyleProps>`
    margin-left: 16px;
    cursor: pointer;
    font-weight: ${(props) => (props.isActivated ? 'bold' : 'normal')};
`;

const Navbar: React.FC = () => {
    const translateStatus = useSelector((state: StoreType) => state.translate.translateStatus);

    const [isMobileTablet, setIsMobileTablet] = useState<boolean>(false);
    const [isDrawerOpned, setIsDrawerOpned] = useState<boolean>(false);

    const handleShowMenu = () => {
        document.body.style.overflow = isDrawerOpned ? '' : 'hidden';
        setIsDrawerOpned(!isDrawerOpned);
    };

    const handleBack = () => document.location.reload();

    const router = useRouter();

    useEffect(() => {
        setIsMobileTablet(screen.width <= 1024);
    }, []);
    return (
        <Container>
            {isMobileTablet ? (
                <>
                    {translateStatus.data ? (
                        <LeftTopSvgWrap onClick={handleBack}>
                            <BackArrow />
                        </LeftTopSvgWrap>
                    ) : (
                        <LeftTopSvgWrap onClick={handleShowMenu}>
                            <Menu />
                        </LeftTopSvgWrap>
                    )}
                    <Logo onClick={() => router.push('/')}>
                        <LogoSmall />
                    </Logo>
                    {isDrawerOpned && (
                        <DrawerWrap>
                            <DrawerBackground onClick={handleShowMenu} />
                            <Drawer handleShowMenu={handleShowMenu} />
                        </DrawerWrap>
                    )}
                </>
            ) : (
                <>
                    <Logo onClick={() => router.push('/')}>
                        <LogoRegular />
                    </Logo>
                    <List>
                        <Item
                            onClick={() => {
                                router.push('/translate');
                            }}
                            isActivated={router.pathname === '/translate'}>
                            홈
                        </Item>
                        <Item
                            onClick={() => {
                                router.push('/history');
                            }}
                            isActivated={router.pathname === '/history'}>
                            번역기록
                        </Item>
                    </List>
                </>
            )}
        </Container>
    );
};

export default React.memo(Navbar);
