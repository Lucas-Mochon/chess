import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import HomeScreen from '../screens/home';

const withLayout = (Component: React.ComponentType<any>) => {
    return (props: any) => (
        <MainLayout>
            <Component {...props} />
        </MainLayout>
    );
};

const AppNavigator: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={withLayout(HomeScreen)({})} />
                {/* Ajoute d'autres routes ici si nécessaire */}
            </Routes>
        </Router>
    );
};

export default AppNavigator;
