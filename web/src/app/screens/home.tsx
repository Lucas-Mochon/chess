import React from 'react';
import { useThemedStyles } from '../hooks/useThemedStyles';

const HomeScreen: React.FC = () => {
    const themedStyles = useThemedStyles();

    return (
        <div
            className={`container-fluid ${themedStyles.backgroundClass} ${themedStyles.textClass}`}
            style={themedStyles.inlineStyles}
        >
            <h1 className="mt-4">Bienvenue sur ChessApp</h1>
            <p className="lead">
                Ceci est la page d’accueil. Tu peux commencer à jouer, apprendre ou explorer les fonctionnalités via le menu latéral.
            </p>
        </div>
    );
};

export default HomeScreen;