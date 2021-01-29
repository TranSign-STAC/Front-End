import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Noto Sans CJK KR';
        font-weight: 300;
        src: url('/fonts/NotoSansKR-Light.woff2') format('woff2'),
        url('/fonts/NotoSansKR-Light.woff') format('woff'),
        url('/fonts/NotoSansKR-Light.otf') format('embedded-opentype');
    }

    @font-face {
        font-family: 'Noto Sans CJK KR';
        font-weight: 400;
        src: url('/fonts/NotoSansKr-Regular.woff2') format('woff2'),
        url('/fonts/NotoSansKR-Regular.woff') format('woff'),
        url('/fonts/NotoSansKR-Regular.otf') format('embedded-opentype');
    }

    @font-face {
        font-family: 'Noto Sans CJK KR';
        font-weight: 500;
        src: url('/fonts/NotoSansKR-Medium.woff2') format('woff2'),
        url('/fonts/NotoSansKR-Medium.woff') format('woff'),
        url('/fonts/NotoSansKR-Medium.otf') format('embedded-opentype');
    }

    @font-face {
        font-family: 'Noto Sans CJK KR';
        font-weight: 700;
        src: url('/fonts/NotoSansKR-Bold.woff2') format('woff2'),
        url('/fonts/NotoSansKR-Bold.woff') format('woff'),
        url('/fonts/NotoSansKR-Bold.otf') format('embedded-opentype');
    }
    body, html {
        background: #fbfbff;
    }
    body, textarea, button {
        font-family: 'Noto Sans CJK KR', sans-serif;
    }
    body, h2, p {
        margin: 0;
    }
    input, button {
        outline: none;
    }
`;
