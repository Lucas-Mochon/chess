import React, { createContext, useState, ReactNode, useContext } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
    colors: {
        background: string;
        text: string;
    };
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('dark');

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const colors = {
        background: theme === 'dark' ? '#302E2B' : '#F5F5F5',
        text: theme === 'dark' ? '#FFFFFF' : '#000000',
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
            <div
                className={theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}
                style={{ minHeight: '100vh' }}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};