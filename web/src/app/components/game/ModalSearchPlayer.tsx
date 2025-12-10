import React, { useEffect, useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import "bootstrap/dist/css/bootstrap.min.css";

export const ModalSearchPlayer: React.FC = () => {
    const [dots, setDots] = useState('');
    const { gameState, getOpenModalSearchState, closeModalSearch, setStatus } = useGame();

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // ❗ timer auto-fermeture
    useEffect(() => {
        const timeout = setTimeout(() => {
            closeModalSearch();
            setStatus('playing')
            
        }, 5000);

        return () => clearTimeout(timeout);
    }, [closeModalSearch, setStatus]);

    if (gameState.status === 'nullProposed' || !getOpenModalSearchState()) return null;

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
             style={{ backgroundColor: "rgba(0,0,0,0.75)", zIndex: 9999 }}>

            <div className="card shadow border-0 rounded-4 text-center p-4"
                 style={{ width: "340px", backgroundColor: "#262321" }}>

                <div className="d-flex justify-content-center mb-3">
                    <div className="spinner-border text-light" style={{ width: "3rem", height: "3rem" }}></div>
                </div>

                <h2 className="text-white fw-bold mb-2" style={{ fontSize: "1.2rem" }}>
                    Recherche d'adversaire{dots}
                </h2>

                <div className="text-white-50 mb-3" style={{ fontSize: "0.9rem" }}>
                    Patientez pendant que nous cherchons un joueur de votre niveau
                </div>

                <div className="progress mt-2" style={{ height: "6px", backgroundColor: "#3C3A38" }}>
                    <div className="progress-bar progress-bar-striped progress-bar-animated"
                         style={{ width: "100%", backgroundColor: "#6fbb6f" }}></div>
                </div>

            </div>
        </div>
    );
};
