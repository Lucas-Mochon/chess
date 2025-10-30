import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigator from './app/navigation/AppNavigatorWeb';
import { ThemeProvider } from './app/context/web/ThemeContext';

const App = () => {
    useEffect(() => {
        if (typeof document !== 'undefined' && !document.getElementById('submenu-root')) {
            const div = document.createElement('div');
            div.id = 'submenu-root';
            div.style.position = 'absolute';
            div.style.top = '0';
            div.style.left = '0';
            div.style.zIndex = '9999';
            document.body.appendChild(div);
        }
    }, []);

    return (
        <ThemeProvider>
            <View style={styles.root}>
                <AppNavigator />
            </View>
        </ThemeProvider>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});

export default App;