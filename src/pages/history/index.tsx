import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { END } from 'redux-saga';

import History from '../../components/History/History';
import Layout from '../../components/Layout/Layout';
import DeleteModal from '../../components/Modal/DeleteModal';

import wrapper from '../../store/configureStore';
import { FETCH_HISTORY_LOADING } from '../../store/modules/history';

import * as mixin from '../../style/mixin';

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const HistoryWrap = styled.div`
    ${mixin.mobile(`
        width: calc(100% - 32px);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin: 24px 16px 0 16px;
    `)}
    ${mixin.tablet(`
        width: 736px;
        display: grid;
        grid-template-columns: repeat(auto-fill, 359px);
        grid-template-rows: repeat(auto-fill, 128px);
        column-gap: 18px;
        row-gap: 16px;
        padding: 24px 0;
        margin: 0 auto;
    `)}
    ${mixin.desktop(`
        width: 864px;
        display: grid;
        grid-template-columns: 416px 416px;
        grid-template-rows: repeat(auto-fill, 144px);
        column-gap: 32px;
        row-gap: 24px;
        padding: 53px 0;
        margin: 0 auto;
    `)}
`;

const DeleteModalWrap = styled.div`
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const DeleteModalBackground = styled.div`
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
`;

type Props = {
    histories: object[];
    uuid: string;
};

type History = {
    text: string;
    uuid: string;
};

const HistoryPage = ({ histories, uuid }: Props) => {
    const [isMobile, setIsMobile] = useState<Boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<Boolean>(false);

    const handleClick = () => {
        document.body.style.overflow = showDeleteModal ? '' : 'hidden';
        setShowDeleteModal(!showDeleteModal);
    };
    useEffect(() => {
        if (!localStorage.getItem('uuid')) localStorage.setItem('uuid', uuidv4());
        setIsMobile(/iPhone|iPod|Android/i.test(navigator.userAgent));
    }, []);
    return (
        <Layout>
            <Container>
                <HistoryWrap>
                    {histories.map((history: object, idx: number) => (
                        <History translationText={history.text} handleClick={handleClick} key={idx} />
                    ))}
                </HistoryWrap>
                {showDeleteModal && (
                    <DeleteModalWrap>
                        <DeleteModalBackground onClick={handleClick} />
                        <DeleteModal handleClick={handleClick} isMobile={isMobile} />
                    </DeleteModalWrap>
                )}
            </Container>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(async ({ store }) => {
    store.dispatch({
        type: FETCH_HISTORY_LOADING,
        payload: {
            uuid: '0c5c1a75-0126-4fb5-8a3b-3284667c0337',
        },
    });
    store.dispatch(END);
    await (store as any).sagaTask.toPromise();
    const histories = store.getState().history.fetchHistoryStatus.data;
    const uuid = store.getState().user.uuid;

    return { props: { histories: histories, uuid } };
});

export default HistoryPage;
