import React, { useState, useEffect } from 'react';
import { GameState, Move, Color, PieceType } from '../../types/chess';
import Board from '../../components/game/Board';
import PlayerCard from '../../components/game/PlayerCard';
import MoveHistory from '../../components/game/MoveHistory';
import GameControls from '../../components/game/GameControls';
import './css/index.css';

const GameScreen: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>({
        white: {
            id: '1',
            username: 'Magnus Carlsen',
            rating: 2880,
            avatar: '',
            country: 'NO',
        },
        black: {
            id: '2',
            username: 'Fabiano Caruana',
            rating: 2795,
            avatar: '',
            country: 'US',
        },
        moves: [],
        currentTurn: 'white',
        status: 'playing',
        time: {
            timeWhite: 600,
            timeBlack: 600,
        },
        selectedSquare: null,
        validMoves: [],
        inCheck: false,
    });

    useEffect(() => {
        if (gameState.status !== 'playing') return;

        const interval = setInterval(() => {
            setGameState((prev) => {
                if (prev.status !== 'playing') return prev;

                const timeKey = prev.currentTurn === 'white' ? 'timeWhite' : 'timeBlack';
                const newTime = prev.time[timeKey] - 1;

                if (newTime <= 0) {
                    return {
                        ...prev,
                        status: 'timeout',
                        time: {
                            ...prev.time,
                            [timeKey]: 0,
                        },
                    };
                }

                return {
                    ...prev,
                    time: {
                        ...prev.time,
                        [timeKey]: newTime,
                    },
                };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [gameState.status]);

    const handleSquareClick = (position: string | null) => {
        setGameState((prev) => ({
            ...prev,
            selectedSquare: position,
        }));
    };

    const handleMove = (from: string, to: string, promotedTo?: PieceType) => {
        const newMove: Move = {
            from,
            to,
            timestamp: Date.now(),
            notation: `${from}${to}${promotedTo ? `=${promotedTo.charAt(0).toUpperCase()}` : ''}`,
            promotedTo,
        };

        setGameState((prev) => ({
            ...prev,
            moves: [...prev.moves, newMove],
            currentTurn: prev.currentTurn === 'white' ? 'black' : 'white',
            selectedSquare: null,
            validMoves: [],
        }));
    };

    const handleCheckChange = (isCheck: boolean, checkColor?: Color) => {
        setGameState((prev) => ({
            ...prev,
            inCheck: isCheck,
            checkColor: checkColor,
        }));
    };

    const handleGameEnd = (
        status: 'checkmate' | 'stalemate',
        winner?: Color
    ) => {
        setGameState((prev) => ({
            ...prev,
            status: status,
        }));
    };

    const handleResign = () => {
        setGameState((prev) => ({
            ...prev,
            status: 'resigned',
        }));
    };

    const handleDraw = () => {
        setGameState((prev) => ({
            ...prev,
            status: 'draw',
        }));
    };

    return (
        <div className="d-flex flex-row p-3">
            <div>
                <div>
                    <PlayerCard
                        player={gameState.black}
                        gameState={gameState.time}
                        playerColor='black'
                    />
                </div>

                <div>
                    {gameState.status === 'checkmate' && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                backgroundColor: '#ff4444',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                fontWeight: 'bold',
                                zIndex: 100,
                                animation: 'slideDown 0.3s ease',
                            }}
                        >
                            ♔ ÉCHEC ET MAT! ♔
                        </div>
                    )}

                    {gameState.inCheck &&
                        gameState.status !== 'checkmate' && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: '#ff9900',
                                    color: 'white',
                                    padding: '8px 16px',
                                    borderRadius: '5px',
                                    fontWeight: 'bold',
                                    zIndex: 100,
                                    animation: 'slideDown 0.3s ease',
                                }}
                            >
                                ⚠ ÉCHEC ⚠
                            </div>
                        )}

                    {gameState.status === 'stalemate' && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                backgroundColor: '#4444ff',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                fontWeight: 'bold',
                                zIndex: 100,
                                animation: 'slideDown 0.3s ease',
                            }}
                        >
                            PAT - PARTIE NULLE
                        </div>
                    )}

                    <Board
                        selectedSquare={gameState.selectedSquare}
                        onSquareClick={handleSquareClick}
                        onMove={handleMove}
                        currentTurn={gameState.currentTurn}
                        onCheckChange={handleCheckChange}
                        onGameEnd={handleGameEnd}
                    />
                </div>

                <div>
                    <PlayerCard
                        player={gameState.white}
                        gameState={gameState.time}
                        playerColor='white'
                    />
                </div>

                <div>
                    <GameControls
                        status={gameState.status}
                        onResign={handleResign}
                        onDraw={handleDraw}
                    />
                </div>
            </div>

            <div>
                <MoveHistory moves={gameState.moves} />
            </div>
        </div>
    );
};

export default GameScreen;

