import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import MainLayout from '../../components/phone/MainLayout';
import PremiumBanner from '../../components/phone/PremiumBanner';
import BasicCard from '../../components/phone/BasicCard';

const HomeScreen = () => {
    return (
        <MainLayout hideNavbar={true}>
            <ScrollView contentContainerStyle={styles.container}>
                <PremiumBanner />
                <BasicCard
                    title="Jouer en ligne"
                    subTitle="3 min contre Aléatoire"
                    source={require('../assets/images/diamond.jpg')}
                />
                <BasicCard
                    title="Résoudre des problèmes"
                    subTitle="27 952 points - Niveau 5"
                    source={require('../assets/images/diamond.jpg')}
                />
            </ScrollView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
    },
});

export default HomeScreen;