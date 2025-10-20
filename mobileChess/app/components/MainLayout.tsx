import React, { ReactNode } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import BotomNavbar from './BotomNavbar';
import HeaderBar from './HeaderBar';

interface MainLayoutProps {
    children: ReactNode;
    hideHeader?: boolean;
    hideNavbar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    hideHeader = false,
    hideNavbar = false
}) => {
    return (
        <SafeAreaView style={styles.container}>
            {!hideHeader && <HeaderBar />}
            <View style={styles.content}>
                {children}
            </View>
            {!hideNavbar && <BotomNavbar />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#121212',
    },
    content: {
        flex: 1,
        padding: 15,
    },
});

export default MainLayout;