import React from 'react';
import styled from 'styled-components';

import * as theme from '../../style/theme';

type StyleProps = {
    active: Boolean;
};

const Container = styled.div`
    z-index: 3;
    top: 56px;
    position: absolute;
    width: 96px;
    height: 72px;
    background: ${theme.WHITE};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    padding: 4px 0;
    border: 1px solid #f6f6f6;
`;

const Item = styled.button<StyleProps>`
    flex: 1;
    font-weight: bold;
    font-size: ${theme.paragraph}px;
    border-radius: 0;
    border: none;
    background: ${theme.WHITE};
    color: ${(props) => (props.active ? theme.PURPLE : theme.BLACK)};
    cursor: pointer;
    &:hover {
        background: rgba(84, 70, 246, 0.1);
    }
`;

type Props = {
    languageList: string[];
    language: number;
    changeLanguage: Function;
    setIsDropdown: Function;
};

const Dropdown = ({ language, changeLanguage, setIsDropdown }: Props) => {
    return (
        <Container>
            <Item
                onClick={() => {
                    if (language !== 0) changeLanguage();
                    setIsDropdown(false);
                }}
                active={language === 0}>
                한국어
            </Item>
            <Item
                onClick={() => {
                    if (language !== 1) changeLanguage();
                    setIsDropdown(false);
                }}
                active={language === 1}>
                수어
            </Item>
        </Container>
    );
};

export default React.memo(Dropdown);
