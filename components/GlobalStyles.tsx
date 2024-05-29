"use client";

import { createGlobalStyle, css } from "styled-components";

import { COLORS, WEIGHTS } from "@/constants/styles";

const styled = { createGlobalStyle };

const GlobalStyles = styled.createGlobalStyle`
  ${resetCSS()}

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font: inherit;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  :root {
    --color-white: ${COLORS.white};
    --color-primary: ${COLORS.primary};
    --color-primary-light: ${COLORS.primaryLight};
    --color-secondary: ${COLORS.secondary};
    --color-gray-100: ${COLORS.gray[100]};
    --color-gray-300: ${COLORS.gray[300]};
    --color-gray-500: ${COLORS.gray[500]};
    --color-gray-600: ${COLORS.gray[600]};
    --color-gray-700: ${COLORS.gray[700]};
    --color-gray-900: ${COLORS.gray[900]};
    --box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    --weight-normal: ${WEIGHTS.normal};
    --weight-medium: ${WEIGHTS.medium};
    --weight-bold: ${WEIGHTS.bold};
  }
`;

function resetCSS() {
  return css`
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
      display: block;
    }
    body {
      line-height: 1;
    }
    ol,
    ul {
      list-style: none;
    }
    blockquote,
    q {
      quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
      content: "";
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
  `;
}

export default GlobalStyles;
