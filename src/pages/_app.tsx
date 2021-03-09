import { AppProps, AppContext } from 'next/app';
import withReduxSaga from 'next-redux-saga';
import { v4 as uuidv4 } from 'uuid';
import nookies from 'nookies';

import { GlobalStyle } from '../style/globalStyle';
import wrapper from '../store/configureStore';

const TranSign = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
};

TranSign.getInitialProps = async ({ ctx }: AppContext) => {
    const uuid = nookies.get(ctx).uuid;
    if (!uuid) nookies.set(ctx, 'uuid', uuidv4());
};

export default wrapper.withRedux(withReduxSaga(TranSign));
