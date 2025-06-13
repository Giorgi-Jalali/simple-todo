import {ThemeProvider as EmotionThemeProvider} from '@emotion/react';
import {useTodoStore} from '../store/todoStore';
import {lightTheme, darkTheme} from '../styles/theme';
import type {ReactNode} from "react";

export const ThemeProvider = ({children}: { children: ReactNode }) => {
    const theme = useTodoStore(state => state.theme);
    const selectedTheme = theme === 'dark' ? darkTheme : lightTheme;

    return (
        <EmotionThemeProvider theme={selectedTheme}>
            {children}
        </EmotionThemeProvider>
    );
};
