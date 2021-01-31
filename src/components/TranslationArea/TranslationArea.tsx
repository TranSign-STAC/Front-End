import React,{useState} from 'react';
import styled from 'styled-components';
import VoiceRecBtn from '../Button/VoiceRecBtn';
import * as theme from '../../style/variables';

import Translation from '../../../public/images/outline/translation.svg';
import Close from '../../../public/images/outline/close.svg';
import Videocam from '../../../public/images/fill/videocam.svg';
import DownArrow from '../../../public/images/outline/downArrow.svg';

type StyleProps = {
    active: boolean;
};

const Container = styled.div`
    position: relative;
    max-width: 1046px;
    height: 424px;
    border: 1px solid #E2E2E6;
`

const SelectWrapper = styled.div`
    position: relative;
    display: flex;
    height: 56px;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #E2E2E6;
`

const Content = styled.div`
    height: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    & > button {
        border: none;
        background: ${theme.WHITE};
        cursor: pointer;
        font-weight: bold;
    }
    & > button > span {
        display: flex;
        align-items: center;
        font-size: ${theme.paragraph}px;
    }
`

const InputBoxWrapper = styled.div`
    position: relative;
    display:flex;
    padding: 24px;
`

const BtnWrapper = styled.div`
    position: absolute;
    z-index: 2;
    bottom: 24px;
    left: 24px;
`

const Input = styled.textarea`
    width: 100%;
    height: 240px;
    border: none;
    font-size: 16px;
    padding: none;
    outline: none;
    resize: none;
`

const CloseWrapper = styled.div`
    margin: 8px 8px 0 24px;
    cursor:pointer;
`

const SignLanguage = styled.div`
    height: 368px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const CircleBtn = styled.button`
    width: 128px;
    height: 128px;
    border: none;
    border-radius: 50%;
    background: ${theme.WHITE};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
`

const Text = styled.span`
    margin-top: 17px;
`
const Dropdown =styled.div`
    z-index: 3;
    top: 56px;
    position: absolute;
    width: 96px;
    height: 72px;
    background: ${theme.WHITE};
    border-radius: 4px;
    display: flex;
    flex-direction:column;
    padding: 4px 0;
    border: 1px solid #f6f6f6;
`

const Item = styled.button<StyleProps>`
    flex: 1;
    font-weight: bold;
    font-size: ${theme.paragraph}px;
    border-radius: 0;
    border: none;
    background: ${theme.WHITE};
    color:${(props) => (props.active ? theme.BLACK : theme.PURPLE )};
    cursor: pointer;
    &:hover {
        background:rgba(84, 70, 246, 0.1);
    }
`

const TranslationArea: React.FC = () => {
    const [isChange, setIsChange] = useState('');
    const [isDropdown, setIsDropdown] = useState<boolean>(false);
    const handleDropdown = () => setIsDropdown(!isDropdown);
    const [isInputValue, setIsInputValue] = useState('');
    const handleInputValue = (e) => setIsInputValue(e.target.value);
    const deleteInputValue = () => setIsInputValue('');

    return (
        <Container>
            <SelectWrapper>
                    <Content>
                        <button onClick={handleDropdown}>
                            {isChange ? (
                                    <span>수어 <DownArrow/></span>
                                ):(
                                    <span>한국어 <DownArrow/></span>
                                )
                            }
                        </button>
                    </Content>
                    {isDropdown ? (
                                <Dropdown>
                                    <Item onClick={()=>{setIsChange('kor');setIsDropdown(false);}} active={isChange}>한국어</Item>
                                    <Item onClick={()=>{setIsChange('sign');setIsDropdown(false);}} active={!isChange}>수어</Item>
                                </Dropdown>
                            ):(
                                null
                            )
                    }
                    <Translation />
                <Content>
                    <button onClick={handleDropdown}>
                        {isChange === 'kor' ? (
                                <span>한국어 <DownArrow/></span>
                            ):(
                                <span>수어 <DownArrow/></span>
                            )
                        }
                    </button>
                </Content>
            </SelectWrapper>
            {isChange ? (
                    <SignLanguage>
                        <CircleBtn>
                            <Videocam/>
                        </CircleBtn>
                        <Text>버튼을 눌러 수어 녹화</Text>
                    </SignLanguage>
                ) : (
                    <>
                        <InputBoxWrapper>
                            <Input placeholder="번역할 내용을 입력하세요." value={isInputValue} onChange={handleInputValue}/>
                            {isInputValue.length>0 ? (
                                    <CloseWrapper>
                                        <Close onClick={deleteInputValue} />
                                    </CloseWrapper>
                                ):(
                                    null
                                )
                            }
                        </InputBoxWrapper>
                        <BtnWrapper>
                                <VoiceRecBtn/>
                        </BtnWrapper>
                    </>
                )}
        </Container>
    );
};

export default TranslationArea;
