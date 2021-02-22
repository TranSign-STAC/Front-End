import * as theme from '../style/theme';

export const mobileTablet = (content: string) =>
    `@media only screen and (max-width:${theme.breakpointTablet}px){
        ${content}
    }`;

export const mobile = (content: string) =>
    `@media only screen and (max-width: ${theme.breakpointMobile}px) {
        ${content}
    }`;

export const tablet = (content: string) =>
    `@media only screen and (min-width: ${theme.breakpointMobile + 1}px) and (max-width:${
        theme.breakpointTablet
    }px) {
        ${content}
    }`;

export const desktop = (content: string) =>
    `@media only screen and (min-width:${theme.breakpointTablet + 1}px) {
        ${content}
    }`;

export const desktopM = (content: string) =>
    `@media only screen and (min-width:${theme.breakpointTablet + 1}px) and (max-width: ${
        theme.breakpointDesktopM
    }px) {
        ${content}
    }`;

export const desktopL = (content: string) =>
    `@media only screen and (min-width:${theme.breakpointDesktopM + 1}px) {
        ${content}
    }`;
