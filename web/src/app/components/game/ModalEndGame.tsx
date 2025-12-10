import React from 'react';
import { useGame } from "../../contexts/GameContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/ModalEndGame.css';
import { statsOrder } from '../../contexts/GameContext';
import CButton from '../CButton';

const ModalEndGame: React.FC = () => {
    const { gameState, getColorOfConnectedPlayer, getEndReason, getNameOfWinner, getOpenModalEndGameState, closeModalEndGame } = useGame();

    if (!gameState.endGame || !getOpenModalEndGameState()) return null;

    let winnerName = getNameOfWinner();
    winnerName = winnerName ? winnerName + "a gagné" : 'Partie nulle';

    function getStatsCount() {
        const color = getColorOfConnectedPlayer();
        const stats = gameState.stats[color];
        const topStats = statsOrder
            .filter((stat) => stats[stat.key as keyof typeof stats] > 0)
            .slice(0, 3)
            .map((stat) => ({
                label: stat.label,
                count: stats[stat.key as keyof typeof stats],
                key: stat.key,
            }));

        return topStats;
    }

    return (
        <div className="modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-opacity-75">
            <div className="card shadow border-0 rounded-4 overflow-hidden" style={{ maxWidth: "350px" }}>
                <div className="card-header border-0 py-3 px-4 position-relative" style={{ backgroundColor: "#3C3A38" }}>
                    <button
                        onClick={closeModalEndGame}
                        className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                        aria-label="Close"
                        style={{ width: '20px', height: '20px' }}
                    ></button>

                    <div className="pe-4">
                        <h2 className="mb-2 fw-bold text-white" style={{ fontSize: '1.25rem' }}>
                            {winnerName}
                        </h2>
                        <div className="text-white-50" style={{ fontSize: '0.875rem' }}>
                            {getEndReason()}
                        </div>
                    </div>
                </div>

                <div className="card-body p-3" style={{ backgroundColor: "#262321" }}>
                    <div className="row g-2 mb-3">
                        {getStatsCount().length > 0 ? (
                            getStatsCount().map((item) => (
                                <div key={item.key} className="col-4">
                                    <div className="p-2 rounded-3 text-center">
                                        <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                                            <img
                                                src={`assets/images/game/${item.key}.png`}
                                                alt={item.key}
                                                style={{ height: '20px', width: '20px' }}
                                            />
                                            <div className="fw-bold text-white" style={{ fontSize: '1.1rem' }}>
                                                {item.count}
                                            </div>
                                        </div>
                                        <div className="text-white-50" style={{ fontSize: '0.75rem' }}>
                                            {item.label}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center text-muted py-2" style={{ fontSize: '0.875rem' }}>
                                Aucune statistique disponible
                            </div>
                        )}
                    </div>

                    <div className="d-grid gap-2">
                        <CButton text='Bilan de la partie' color='green' size='large' textCenter={true} />

                        <div className="row g-2">
                            <div className="col-6">
                                <button className="btn w-100 rounded-3 py-2 text-white" style={{ backgroundColor: "#44423F", fontSize: '0.875rem' }}>
                                    Nouveau robot
                                </button>
                            </div>
                            <div className="col-6">
                                <button className="btn w-100 rounded-3 py-2 text-white" style={{ backgroundColor: "#44423F", fontSize: '0.875rem' }}>
                                    Revanche
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalEndGame;
