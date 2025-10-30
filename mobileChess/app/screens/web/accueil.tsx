
import React from 'react';
import { Text } from 'react-native';
import { useThemedStyles } from '../../hooks/web/useThemedStyles';
console.log('accueil')
const HomeScreen = () => {

    const styles = useThemedStyles();
    return <Text style={styles.text}>Bienvenue sur l'accueil !</Text>;

};

export default HomeScreen;
