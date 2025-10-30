import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import Sidebar from './SideNavbar';
import { useThemedStyles } from '../../hooks/web/useThemedStyles';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const themedStyles = useThemedStyles();

    return (
        <View style={styles.container}>
            <Sidebar />
            <View style={styles.separator} />
            <View style={[styles.content, themedStyles.background]}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        flex: 1,
    },
    separator: {
        width: 8,
        backgroundColor: '#2a2a2a',
    },
    content: {
        flex: 1,
        padding: 15,
        position: 'relative',
        zIndex: 1,
    },
});

export default MainLayout;