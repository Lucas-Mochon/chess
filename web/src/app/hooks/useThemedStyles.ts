import { useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const useThemedStyles = () => {
    const { colors } = useTheme();

    const themedStyles = useMemo(() => {
        return {
            textClass: colors.text === '#FFFFFF' ? 'text-light' : 'text-dark',
            backgroundClass: colors.background === '#302E2B' ? '#302E2B' : '#F0F0F0',
            inlineStyles: {
                color: colors.text,
                backgroundColor: colors.background,
            },
        };
    }, [colors]);

    return themedStyles;
};