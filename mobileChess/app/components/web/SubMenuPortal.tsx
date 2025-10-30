import React from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, View } from 'react-native';

interface SubMenuPortalProps {
    children: React.ReactNode;
}

const SubMenuPortal: React.FC<SubMenuPortalProps> = ({ children }) => {
    const portalRoot = document.getElementById('submenu-root');
    return portalRoot ? ReactDOM.createPortal(
        <View style={styles.portal}>{children}</View>,
        portalRoot
    ) : null;
};

const styles = StyleSheet.create({
    portal: {
        position: 'absolute',
        top: 0,
        left: 250,
        height: '100vh',
        zIndex: 9999,
        backgroundColor: '#2a2a2a',
        paddingVertical: 10,
        paddingHorizontal: 15,
        minWidth: 200,
        borderLeftWidth: 2,
        borderLeftColor: '#444',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});

export default SubMenuPortal;