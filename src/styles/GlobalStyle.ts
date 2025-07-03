'use client';

import { createGlobalStyle } from 'styled-components';
import '@fontsource/montserrat/600.css';
import '@fontsource/hind-madurai/400.css';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html, body {
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    font-family: 'Hind Madurai', sans-serif;
    color: ${({ theme }) => theme.colors.text};
  }

  h1, h2, h3, h4 {
    font-family: 'Montserrat', sans-serif;
  }

  button {
    font-family: 'Hind Madurai', sans-serif;
  }
`;

export default GlobalStyle;
