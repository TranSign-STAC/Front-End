import * as theme from '../style/theme';
import { css, FlattenSimpleInterpolation } from 'styled-components';

export const mobileTablet = (content: FlattenSimpleInterpolation) =>
    css`
        @media only screen and (max-width: ${theme.breakpointTabletL}px) {
            ${content}
        }
    `;

export const mobile = (content: FlattenSimpleInterpolation) =>
    css`
        @media only screen and (max-width: ${theme.breakpointMobile}px) {
            ${content}
        }
    `;

export const tablet = (content: FlattenSimpleInterpolation) =>
    css`
        @media only screen and (min-width: ${theme.breakpointMobile +
            1}px) and (max-width: ${theme.breakpointTabletL}px) {
            ${content}
        }
    `;

export const tabletM = (content: FlattenSimpleInterpolation) =>
    css`
        @media only screen and (min-width: ${theme.breakpointMobile +
            1}px) and (max-width: ${theme.breakpointTabletM}px) {
            ${content}
        }
    `;

export const tabletL = (content: FlattenSimpleInterpolation) =>
    css`
        @media only screen and (min-width: ${theme.breakpointTabletM +
            1}px) and (max-width: ${theme.breakpointTabletL}px) {
            ${content}
        }
    `;

export const desktop = (content: FlattenSimpleInterpolation) =>
    css`
        @media only screen and (min-width: ${theme.breakpointTabletL + 1}px) {
            ${content}
        }
    `;

export const desktopS = (content: FlattenSimpleInterpolation) =>
    css`
        @media only screen and (min-width: ${theme.breakpointTabletL +
            1}px) and (max-width: ${theme.breakpointDesktopS}px) {
            ${content}
        }
    `;

export const desktopM = (content: FlattenSimpleInterpolation) =>
    css`
        @media only screen and (min-width: ${theme.breakpointDesktopS +
            1}px) and (max-width: ${theme.breakpointDesktopM}px) {
            ${content}
        }
    `;

export const desktopL = (content: FlattenSimpleInterpolation) =>
    css`
        @media only screen and (min-width: ${theme.breakpointDesktopM + 1}px) {
            ${content}
        }
    `;
