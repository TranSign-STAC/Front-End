import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import styled, { css } from 'styled-components';
import { END } from 'redux-saga';
import nookies from 'nookies';

import History from '../../components/History/History';
import Layout from '../../components/Layout/Layout';
import DeleteModal from '../../components/Modal/DeleteModal';

import wrapper from '../../store/configureStore';
import { FETCH_HISTORY_LOADING } from '../../store/modules/history';

import * as mixin from '../../style/mixin';

type Props = {
    histories: {
        text: string;
        uuid: string;
    }[];
};

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const HistoryWrap = styled.div`
    ${mixin.mobile(css`
        width: calc(100% - 32px);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin: 24px 16px 0 16px;
    `)}
    ${mixin.tablet(css`
        display: grid;
        grid-template-rows: repeat(auto-fill, 128px);
        padding: 24px 0;
        margin: 0 auto;
    `)}
    ${mixin.tabletM(css`
        width: 736px;
        grid-template-columns: repeat(auto-fill, 359px);
        column-gap: 18px;
        row-gap: 16px;
    `)}
    ${mixin.tabletL(css`
        width: 760px;
        grid-template-columns: repeat(auto-fill, 368px);
        column-gap: 24px;
        row-gap: 24px;
    `)}
    ${mixin.desktop(css`
        width: 864px;
        display: grid;
        grid-template-columns: 416px 416px;
        grid-template-rows: repeat(auto-fill, 128px);
        column-gap: 32px;
        row-gap: 24px;
        margin: 53px auto 0 auto;
    `)}
    ${mixin.desktopL(css`
        width: 1328px;
        grid-template-columns: 416px 416px 416px;
        column-gap: 40px;
        row-gap: 40px;
        margin: 64px auto 0 auto;
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

const HistoryPage = ({ histories }: Props) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const handleClick = () => {
        document.body.style.overflow = showDeleteModal ? '' : 'hidden';
        setShowDeleteModal(!showDeleteModal);
    };
    useEffect(() => {
        setIsMobile(screen.width <= 425);
    }, []);
    return (
        <Layout>
            <Container>
                <HistoryWrap>
                    {histories.length < 1
                        ? '번역 기록이 없습니다.'
                        : histories.map((history, idx: number) => (
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    const uuid = nookies.get(ctx).uuid;
    ctx.store.dispatch({
        type: FETCH_HISTORY_LOADING,
        payload: { uuid },
    });
    ctx.store.dispatch(END);
    await (ctx.store as any).sagaTask.toPromise();
    const histories = ctx.store.getState().history.fetchHistoryStatus.data;
    return { props: { histories } };
});

export default HistoryPage;
