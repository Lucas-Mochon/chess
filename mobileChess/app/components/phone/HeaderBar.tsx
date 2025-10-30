import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';

interface HeaderBarProps {
    onProfilePress?: () => void;
    onSocialPress?: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ onProfilePress, onSocialPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.profileContainer} onPress={onProfilePress}>
                <Image
                    style={styles.profileImage}
                    source={require('../assets/images/default-profile.jpg')}
                />
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.trophyBadge}>
                    <Icon name="emoji-events" type="material" color="#FFD700" size={14} />
                </View>
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Chess</Text>
            </View>

            <TouchableOpacity style={styles.socialButton} onPress={onSocialPress}>
                <Icon name="people" type="material" color="white" size={24} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: '#1A1A1A',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
    },
    profileContainer: {
        position: 'relative',
        width: 40,
        height: 40,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#333333',
    },
    trophyBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        backgroundColor: '#1A1A1A',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333333',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    socialButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HeaderBar;