import withReduxSaga from 'next-redux-saga';

import { GlobalStyle } from '../style/globalStyle';

import wrapper from '../store/configureStore';

const TranSign = ({ Component, pageProps }: any) => {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
};

export default wrapper.withRedux(withReduxSaga(TranSign));
