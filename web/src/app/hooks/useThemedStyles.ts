import { useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const useThemedStyles = () => {
    const { colors } = useTheme();

    const themedStyles = useMemo(() => {
        return {
            textClass: colors.text === '#FFFFFF' ? 'text-light' : 'text-dark',
            backgroundClass: colors.background === '#2B2B2B' ? 'bg-dark' : 'bg-light',
            inlineStyles: {
                color: colors.text,
                backgroundColor: colors.background,
            },
        };
    }, [colors]);

    return themedStyles;
};