import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mainMenu, subMenus } from '../../utils/web/sideNavbarElements';
import { useTheme } from '../../context/web/ThemeContext';
import SubMenuPortal from './SubMenuPortal';

const SideNavbar = () => {
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const { theme, toggleTheme } = useTheme();

    return (
        <View
            style={styles.sidebarWrapper}
            onMouseLeave={() => setHoveredMenu(null)}
        >
            <View style={styles.sidebar}>
                {mainMenu.map((item) => (
                    <View
                        key={item.key}
                        onMouseEnter={() => setHoveredMenu(item.key)}
                        style={styles.menuWrapper}
                    >
                        <Pressable
                            style={[
                                styles.menuItem,
                                hoveredMenu === item.key && styles.activeMenuItem,
                            ]}
                        >
                            <Icon name={item.icon} size={24} color="#fff" style={styles.icon} />
                            <Text style={styles.label}>{item.label}</Text>
                        </Pressable>
                    </View>
                ))}

                <View style={styles.themeToggle}>
                    <Pressable onPress={toggleTheme} style={styles.themeButton}>
                        <Icon name="brightness-6" size={20} color="#aaa" style={{ marginRight: 8 }} />
                        <Text style={{ color: '#aaa' }}>
                            {theme === 'dark' ? 'Interface claire' : 'Interface sombre'}
                        </Text>
                    </Pressable>
                </View>
            </View>

            {hoveredMenu && subMenus[hoveredMenu] && (
                <SubMenuPortal>
                    <View
                        onMouseEnter={() => setHoveredMenu(hoveredMenu)}
                        onMouseLeave={() => setHoveredMenu(null)}
                        style={styles.subMenu}
                    >
                        {subMenus[hoveredMenu].map((subItem, index) => (
                            <React.Fragment key={index}>
                                <Pressable style={styles.subMenuItem}>
                                    <Icon name={subItem.icon} size={20} color="#fff" style={styles.icon} />
                                    <Text style={styles.subLabel}>{subItem.label}</Text>
                                </Pressable>
                                {index < subMenus[hoveredMenu].length - 1 && (
                                    <View style={styles.separator} />
                                )}
                            </React.Fragment>
                        ))}
                    </View>
                </SubMenuPortal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    sidebarWrapper: {
        flexDirection: 'row',
        position: 'relative',
        zIndex: 10,
    },
    sidebar: {
        backgroundColor: '#1a1a1a',
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: 250,
    },
    menuWrapper: {
        position: 'relative',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 6,
        marginBottom: 4,
        cursor: 'pointer',
    },
    activeMenuItem: {
        backgroundColor: '#2a2a2a',
    },
    icon: {
        marginRight: 12,
    },
    label: {
        color: '#fff',
        fontSize: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#333',
        marginVertical: 6,
    },
    subMenu: {
        height: '100vh',
        paddingVertical: 10,
        paddingHorizontal: 15,
        minWidth: 220,
        zIndex: 9999,
    },
    subMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        cursor: 'pointer',
    },
    subLabel: {
        color: '#fff',
        fontSize: 15,
        marginLeft: 10,
    },
    themeToggle: {
        marginTop: 'auto',
        padding: 10,
    },
    themeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer',
    },
});

export default SideNavbar;
