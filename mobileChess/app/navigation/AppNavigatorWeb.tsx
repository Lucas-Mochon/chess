import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/web/accueil';
import MainLayout from '../components/web/MainLayout';

const Stack = createNativeStackNavigator();

const withLayout = (Component: React.ComponentType<any>) => {
    return (props: any) => (
        <MainLayout hideHeader={false} hideNavbar={true} hideSidebar={false}>
            <Component {...props} />
        </MainLayout>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={withLayout(HomeScreen)} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;