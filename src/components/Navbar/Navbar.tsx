import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import Translation from '../../../public/images/outline/translation.svg';
import BackArrow from '../../../public/images/outline/backArrow.svg';
import Menu from '../../../public/images/outline/menu.svg';
import LogoRegular from '../../../public/images/logo/Logo_small.svg';
import LogoSmall from '../../../public/images/logo/logoSmall.svg';

type StyleProps = {
    active: boolean;
};

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 64px;
    background: #fff;
    display:flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
        width: 100%;
        height: 128px;
        padding: 0;
        flex-direction: column;
    }
`;

const Logo = styled.div`
    position: relative;
    left: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 768px) {
        width: 100%;
        height: 64px;
        left: 0;
        justify-content: center;
        align-items: center;
    }
`

const MenuWrapper = styled.button`
    position: absolute;
    left: 20px;
    display: flex;
    align-items: center;
    border: none;
    background: #fff;
    cursor: pointer;
`

const List = styled.div`
    position: relative;
    right: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 768px) {
        width: 100%;
        height: 64px;
        left: 0;
        justify-content: center;
        align-items: center;
    }
`

const Content = styled.div`
    flex: 1;
    height: 28px;
    font-weight: bold;
    text-align: center;
`

const Item = styled.span<StyleProps>`
    margin-left: 16px;
    cursor: pointer;
    font-weight:${(props) => (props.active ? 'normal' : 'bold')};
`

const Navbar: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        window.addEventListener('resize',()=>{
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        })
    },[])
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const handleClick = () => setIsClicked(!isClicked);

    const [isActive, setIsActive] = useState<boolean>(false);
    const handleActive = () => setIsActive(!isActive);

    const router = useRouter()
    return (
        <Container>
            <Logo>
                {isMobile ? (
                    <>
                        <MenuWrapper onClick={handleClick}>
                            {isClicked ? (
                                <>
                                    <BackArrow/>
                                </>
                            ) : (
                                <>
                                    <Menu />                                   
                                </>
                            )}
                        </MenuWrapper>
                        <LogoSmall />
                    </>
                ) : (
                    <>
                        <LogoRegular />
                    </>
                )}
            </Logo>
            <List>
                {isMobile ? (
                    <>
                        <Content>한국어</Content>
                        <Translation />
                        <Content>수어</Content>
                    </>
                ) : (
                    <>
                        <Item onClick={handleActive} active={isActive}>홈</Item>
                        <Item onClick={handleActive} active={!isActive}>번역기록</Item>
                    </>
                )}
            </List>
        </Container>
    );
};

export default Navbar;
