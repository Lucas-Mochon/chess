import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
// import HomeScreen from '../screens/home';
import GetStarted from '../screens/home/getStarted';
import Connection from '../screens/user/connection';
import LoginPage from '../screens/user/connection/login';
import Register from '../screens/user/connection/register';
import Dashboard from '../screens/home/dashboard';
import { authService } from '../service/auth';


const withLayout = (Component: React.ComponentType<any>) => {
    return (props: any) => (
        <MainLayout>
            <Component {...props} />
        </MainLayout>
    );
};

const LogoutHandler: React.FC = () => {
    useEffect(() => {
        authService.logout();
    }, []);

    return <Navigate to="/" replace />;
};

const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
    const isAuthenticated = authService.isConnected();

    return isAuthenticated ? (
        <>{element}</>
    ) : (
        <Navigate to="/login" replace />
    );
};

const PublicRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
    const isAuthenticated = authService.isConnected();

    return !isAuthenticated ? (
        <>{element}</>
    ) : (
        <Navigate to="/" replace />
    );
};

const AppNavigator: React.FC = () => {
    const [isConnected, setIsConnected] = useState(authService.isConnected());

    const checkAuthStatus = () => {
        setIsConnected(authService.isConnected());
    };

    useEffect(() => {
        checkAuthStatus();
        window.addEventListener('storage', checkAuthStatus);
        window.addEventListener('authChange', checkAuthStatus);

        return () => {
            window.removeEventListener('storage', checkAuthStatus);
            window.removeEventListener('authChange', checkAuthStatus);
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={isConnected ? withLayout(Dashboard)({}) : withLayout(GetStarted)({})} />
                <Route path="/connect" element={<PublicRoute element={withLayout(Connection)({})} />} />
                <Route path="/login" element={<PublicRoute element={withLayout(LoginPage)({})} />} />
                <Route path="/register" element={<PublicRoute element={withLayout(Register)({})} />} />
                <Route path="/logout" element={<LogoutHandler />} />
            </Routes>
        </Router>
    );
};

export default AppNavigator;