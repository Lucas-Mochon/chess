import React, { useEffect, useState, useRef } from 'react';
import { matchmakingService } from '../../service/matchmaking';
import { useGame } from '../../contexts/GameContext';

interface Game {
    id: number;
    result: string;
    game_mode_name: string;
    game_mode_id: number;
    white_player_id: number;
    white_player_name: string;
    white_player_picture: string | null;
    white_player_country: string | null;
    white_player_rating: number;
    black_player_id: number;
    black_player_name: string;
    black_player_picture: string | null;
    black_player_country: string | null;
    black_player_rating: number;
}

const ModalSearchPlayer: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const { gameState, getOpenModalSearchState, closeModalSearch, setStatus } = useGame();
    const shouldSearch = gameState.status === 'searching' && getOpenModalSearchState();

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;

        if (!shouldSearch) return;

        const stopPolling = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        const finishSearch = (game: Game) => {
            localStorage.setItem('currentGame', JSON.stringify(game));
            stopPolling();
            closeModalSearch();
            setStatus('playing');
        };

        const searchGame = async () => {
            try {
                var userID = localStorage.getItem("user");
                if (!mountedRef.current || !userID) return;

                let userId = parseInt(userID, 10);

                const response = await matchmakingService.joinQueue(userId, 1);

                if (!mountedRef.current) return;

                if (!response) {
                    setError("Impossible de rejoindre la file d'attente");
                    return;
                }

                if (response.status === 'matched' && response.game) {
                    finishSearch(response.game);
                    return;
                }

                if (response.status === 'waiting') {
                    if (!intervalRef.current) {
                        intervalRef.current = setInterval(async () => {
                            try {
                                const poll = await matchmakingService.checkQueueStatus(userId);
                                console.log(poll)

                                if (!poll) return;

                                if (poll.status === 'matched' && poll.game) {
                                    finishSearch(poll.game);
                                    return;
                                }
                            } catch (err) {
                                console.error("Erreur polling:", err);
                            }
                        }, 200);
                    }
                }
            } catch (err) {
                console.error("Erreur matchmaking:", err);
                if (mountedRef.current) setError('Erreur lors de la recherche de partie');
            }
        };

        searchGame();

        return () => {
            mountedRef.current = false;
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [shouldSearch, closeModalSearch, setStatus]);

    if (!shouldSearch) return null;

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
             style={{ backgroundColor: "rgba(0,0,0,0.75)", zIndex: 9999 }}>

            <div className="card shadow border-0 rounded-4 text-center p-4"
                 style={{ width: "340px", backgroundColor: "#262321" }}>

                <div className="d-flex justify-content-center mb-3">
                    <div className="spinner-border text-light" style={{ width: "3rem", height: "3rem" }}></div>
                </div>

                <h2 className="text-white fw-bold mb-2" style={{ fontSize: "1.2rem" }}>
                    Recherche d'adversaire…
                </h2>

                <div className="text-white-50 mb-3" style={{ fontSize: "0.9rem" }}>
                    Patientez pendant que nous cherchons un joueur de votre niveau
                </div>

                <div className="progress mt-2" style={{ height: "6px", backgroundColor: "#3C3A38" }}>
                    <div className="progress-bar progress-bar-striped progress-bar-animated"
                         style={{ width: "100%", backgroundColor: "#6fbb6f" }}></div>
                </div>

                {error && (
                    <div className="text-danger mt-2" style={{ fontSize: "0.85rem" }}>
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalSearchPlayer;
