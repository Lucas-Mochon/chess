import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
// import HomeScreen from '../screens/home';
import GetStarted from '../screens/home/getStarted';
import Connection from '../screens/user/connection';
import LoginPage from '../screens/user/connection/login';
import Register from '../screens/user/connection/register';


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
                {/* Ajoute d'autres routes ici si nécessaire */}
                {/* <Route path="/" element={withLayout(HomeScreen)({})} /> */}
                <Route path="/" element={withLayout(GetStarted)({})} />
                <Route path="/connect" element={withLayout(Connection)({})} />
                <Route path="/login" element={withLayout(LoginPage)({})} />
                <Route path="/register" element={withLayout(Register)({})} />
            </Routes>
        </Router>
    );
};

export default AppNavigator;
