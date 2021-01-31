import React,{ useState } from 'react';
import styled from 'styled-components';
import History from '../components/History/History';
import Layout from '../components/Layout/Layout';
import DeleteModal from '../components/Modal/DeleteModal';

const Container = styled.div`
    width: 864px;
    display: grid;
    grid-template-columns: 416px 416px;
    grid-template-rows: repeat(auto-fill,auto);
    column-gap: 32px;
    row-gap: 24px;
    margin: 53px auto;
`

const HistoryPage = () => {
    const [isActive, setIsActive] = useState<boolean>('');

    return (
        <>
            <Layout>
                <Container>
                    <History setActive={setIsActive}/>
                    <History setActive={setIsActive}/>
                </Container>
            </Layout>
            {isActive === 'Active' ? (
                    <DeleteModal setActive={setIsActive}/>
            ):(null)
            }
        </>
    );
};

export default HistoryPage;