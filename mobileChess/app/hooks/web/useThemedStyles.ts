import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../context/web/ThemeContext';

export const useThemedStyles = () => {
    const { colors } = useTheme();
    const themedStyles = useMemo(
        () =>
            StyleSheet.create({
                text: {
                    color: colors.text,
                },
                background: {
                    backgroundColor: colors.background,
                },
            }),
        [colors]
    );

    return themedStyles;
};