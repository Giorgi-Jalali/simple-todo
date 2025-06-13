import * as Emotion from '@emotion/react';
import type {Theme} from './types';

export const GlobalStyles = () => {
    const theme = Emotion.useTheme() as Theme;

    return Emotion.jsx(Emotion.Global, {
        styles: Emotion.css`
            :root {
              font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
              line-height: 1.5;
              font-weight: 400;
            
              font-synthesis: none;
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }

            body {
                margin: 0;
                background-color: ${theme.background};
                color: ${theme.text};
                transition: all 0.3s ease;
            }

            a {
              font-weight: 500;
              color:${theme.link};
              text-decoration: inherit;
            }
            a:hover {
              color: ${theme.linkHover};
            }
            
            input {
              background-color: ${theme.background};
              color: ${theme.text};
              border: 1px solid #ccc;
              border-radius: 4px;
              padding: 0.5em;
              transition: all 0.2s ease;
            }
            
            h1 {
              font-size: 2.5em;
              line-height: 1.1;
            }
            
            button {
              border-radius: 8px;
              border: 1px solid transparent;
              padding: 0.4em 1em;
              margin-left: 0.5em;
              font-size: 1em;
              font-weight: 500;
              font-family: inherit;
              background-color: ${theme.buttonBackground};
              color: ${theme.text};
              cursor: pointer;
              transition: border-color 0.25s;
            }
            button:hover {
              border-color: ${theme.buttonHoverBorder};
            }
            button:focus,
            button:focus-visible {
              outline: 4px auto -webkit-focus-ring-color;
            }
        `
    });
};
