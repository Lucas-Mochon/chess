import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { GameState, Move, Color, PieceType } from '../types/chess';

interface GameContextType {
    gameState: GameState;

    handleSquareClick: (position: string | null) => void;
    handleMove: (from: string, to: string, promotedTo?: PieceType) => void;
    handleCheckChange: (isCheck: boolean, checkColor?: Color) => void;
    handleGameEnd: (status: 'checkmate' | 'stalemate', winner?: Color) => void;
    handleResign: () => void;
    handleDraw: () => void;
    getEndReason: () => string;
    getColorOfConnectedPlayer: () => Color;
    getNameOfWinner: () => string;
    getOpenModalState: () => boolean;
    setOpenModalState: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const statsOrder = [
    { key: 'brillant', label: 'coups brillants' },
    { key: 'veryGood', label: 'Très bon coup' },
    { key: 'best', label: 'meilleurs coups' },
    { key: 'excellent', label: 'excellents coups' },
    { key: 'correct', label: 'coups corrects' },
    { key: 'theorically', label: 'coups théoriques' },
    { key: 'inaccurate', label: 'coups imprécis' },
    { key: 'blawlack', label: 'coups manqués' },
    { key: 'mistake', label: 'erreurs' },
    { key: 'blunder', label: 'blunders' },
];

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
        endGame: false,
        endGameReason: undefined,
        winner: undefined,
        stats: {
            white: {
                brillant: 0,
                veryGood: 0,
                best: 3,
                excellent: 0,
                correct: 1,
                theorically: 1,
                inaccurate: 0,
                blawlack: 0,
                mistake: 0,
                blunder: 0,
            },
            black: {
                brillant: 0,
                veryGood: 0,
                best: 0,
                excellent: 0,
                correct: 0,
                theorically: 0,
                inaccurate: 0,
                blawlack: 0,
                mistake: 0,
                blunder: 0,
            }
        }
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

    const handleSquareClick = useCallback((position: string | null) => {
        setGameState((prev) => ({
            ...prev,
            selectedSquare: position,
        }));
    }, []);

    const handleMove = useCallback((from: string, to: string, promotedTo?: PieceType) => {
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
    }, []);

    const handleCheckChange = useCallback((isCheck: boolean, checkColor?: Color) => {
        setGameState((prev) => ({
            ...prev,
            inCheck: isCheck,
            checkColor: checkColor,
        }));
    }, []);

    const handleGameEnd = useCallback(
        (status: 'checkmate' | 'stalemate', winner?: Color) => {
            setGameState((prev) => ({
                ...prev,
                status: status,
                endGame: true,
                endGameReason: status,
                winner: winner,
            }));
        },
        []
    );

    const handleResign = useCallback(() => {
        setGameState((prev) => ({
            ...prev,
            status: 'resigned',
        }));
    }, []);

    const handleDraw = useCallback(() => {
        setGameState((prev) => ({
            ...prev,
            status: 'draw',
        }));
    }, []);

    function getEndReason() {
        switch (gameState.endGameReason) {
            case 'checkmate': return 'par échec et mat';
            case 'stalemate': return 'par pat';
            case 'resignation': return 'par démission';
            case 'draw': return 'par partie nulle';
            case 'timeout': return 'par dépassement de temps';
            default: return '';
        }
    }

    function getColorOfConnectedPlayer(): Color {
        return 'white';
    }

    function getNameOfWinner() {
        return gameState.winner ? gameState[gameState.winner].username : '';
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    function getOpenModalState() {
        return isModalOpen;
    }

    function setOpenModalState() {
        setIsModalOpen(!isModalOpen);
    }


    const value: GameContextType = {
        gameState,
        handleSquareClick,
        handleMove,
        handleCheckChange,
        handleGameEnd,
        handleResign,
        handleDraw,
        getEndReason,
        getColorOfConnectedPlayer,
        getNameOfWinner,
        getOpenModalState,
        setOpenModalState,
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('Erreur lors du chargement du contexte');
    }
    return context;
};
