import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

interface NavItemProps {
    icon: string;
    title: string;
    onPress: () => void;
    isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, title, onPress, isActive = false }) => {
    return (
        <TouchableOpacity style={styles.navItem} onPress={onPress}>
            <Icon
                name={icon}
                type="material"
                color={isActive ? '#FFFFFF' : '#AAAAAA'}
                size={24}
            />
            <Text style={[
                styles.navItemText,
                isActive && styles.activeNavItemText
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const BotomNavbar: React.FC = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    let currentRoute = '';
    try {
        const state = navigation.getState();
        if (state && state.routes && state.routes.length > 0) {
            currentRoute = state.routes[state.index].name;
        }
    } catch (error) {
        console.log('Navigation state not available yet: ', error);
    }

    return (
        <View style={styles.container}>
            <NavItem
                icon="home"
                title="Accueil"
                onPress={() => navigation.navigate('Home')}
                isActive={currentRoute === 'Home'}
            />
            <NavItem
                icon="play-arrow"
                title="Problèmes"
                onPress={() => { console.log('press') }}
                isActive={currentRoute === 'Problems'}
            />
            <NavItem
                icon="school"
                title="Apprendre"
                onPress={() => { console.log('press') }}
                isActive={currentRoute === 'Learn'}
            />
            <NavItem
                icon="visibility"
                title="Observer"
                onPress={() => { console.log('press') }}
                isActive={currentRoute === 'Observe'}
            />
            <NavItem
                icon="list"
                title="Plus"
                onPress={() => { console.log('press') }}
                isActive={currentRoute === 'More'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: '#1A1A1A',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        borderTopWidth: 1,
        borderTopColor: '#333333',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: 8,
    },
    navItemText: {
        color: '#AAAAAA',
        marginTop: 2,
        fontSize: 10,
    },
    activeNavItemText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    }
});

export default BotomNavbar;