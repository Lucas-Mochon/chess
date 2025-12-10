import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { GameState, Move, Color, PieceType, EndGameReason } from '../types/chess';

type GameStatus =
    | 'searching'
    | 'playing'
    | 'nullProposed'
    | 'draw'
    | 'checkmate'
    | 'stalemate'
    | 'resigned'
    | 'timeout';

interface GameContextType {
    gameState: GameState;
    handleSquareClick: (position: string | null) => void;
    handleMove: (from: string, to: string, promotedTo?: PieceType) => void;
    handleCheckChange: (isCheck: boolean, checkColor?: Color) => void;
    handleGameEnd: (status: 'checkmate' | 'stalemate', winner?: Color) => void;
    handleResign: (resigner?: Color) => void;
    handleDraw: (reason?: EndGameReason) => void;
    setStatus: (status: GameStatus) => void;
    setEndGame: (endGame: boolean) => void;
    getEndReason: () => string;
    getColorOfConnectedPlayer: () => Color;
    getNameOfWinner: () => string | null;
    getOpenModalEndGameState: () => boolean;
    openModalEndGame: () => void;
    closeModalEndGame: () => void;
    getOpenModalNullState: () => boolean;
    openModalNull: () => void;
    closeModalNull: () => void;
    getOpenModalSearchState: () => boolean;
    openModalSearch: () => void;
    closeModalSearch: () => void;
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
        status: 'searching' as GameStatus,
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
            },
        },
    });

    const [isModalEndGameOpen, setIsModalEndGameOpen] = useState<boolean>(false);
    const [isModalNullOpen, setIsModalNullOpen] = useState<boolean>(false);
    const [isModalSearchOpen, setIsModalSearchOpen] = useState<boolean>(false);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (gameState.status !== 'playing' && gameState.status !== 'nullProposed') {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }
            return;
        }

        if (timerRef.current) return;

        timerRef.current = window.setInterval(() => {
            setGameState((prev) => {
                if (prev.status !== 'playing') return prev;

                const timeKey = prev.currentTurn === 'white' ? 'timeWhite' : 'timeBlack';
                const remaining = (prev.time as any)[timeKey] - 1;

                if (remaining <= 0) {
                    const winner: Color = prev.currentTurn === 'white' ? 'black' : 'white';
                    return {
                        ...prev,
                        status: 'timeout' as GameStatus,
                        endGame: true,
                        endGameReason: 'timeout',
                        winner,
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
                        [timeKey]: remaining,
                    },
                };
            });
        }, 1000);

        return () => {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [gameState.status, gameState.currentTurn]);

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
                status: status === 'checkmate' ? 'checkmate' : 'stalemate',
                endGame: true,
                endGameReason: status,
                winner: winner,
            }));
            setIsModalEndGameOpen(true);
        },
        []
    );

    const handleResign = useCallback((resigner?: Color) => {
        setGameState((prev) => {
            const winner = resigner === 'white' ? 'black' : 'white';
            return {
                ...prev,
                status: 'resigned' as GameStatus,
                endGame: true,
                endGameReason: 'resignation',
                winner,
            };
        });
        setIsModalEndGameOpen(true);
    }, []);

    const handleDraw = useCallback((reason: EndGameReason = 'draw') => {
        setGameState((prev) => ({
            ...prev,
            status: 'draw' as GameStatus,
            endGame: true,
            endGameReason: reason,
        }));
        setIsModalEndGameOpen(true);
    }, []);

    const setStatus = useCallback((status: GameStatus) => {
        setGameState(prev => ({
            ...prev,
            status,
        }));
    }, [setGameState]);

    const setEndGame = useCallback((value: boolean) => {
        setGameState(prev => ({
            ...prev,
            endGame: value
        }));
    }, []);

    function getEndReason() {
        switch (gameState.endGameReason) {
            case 'checkmate': return 'par échec et mat';
            case 'stalemate': return 'par pat';
            case 'resignation': return 'par démission';
            case 'draw': return 'par partie nulle';
            case 'timeout': return 'par dépassement de temps';
            default:
                if (typeof gameState.endGameReason === 'string' && gameState.endGameReason === 'draw') {
                    return 'par partie nulle';
                }
                return '';
        }
    }

    function getColorOfConnectedPlayer(): Color {
        return 'white';
    }

    function getNameOfWinner() {
        return gameState.winner ? gameState[gameState.winner].username : null;
    }

    function getOpenModalEndGameState() {
        return isModalEndGameOpen;
    }
    function openModalEndGame() {
        setIsModalEndGameOpen(true);
    }
    function closeModalEndGame() {
        setIsModalEndGameOpen(false);
    }

    function getOpenModalNullState() {
        return isModalNullOpen;
    }
    function openModalNull() {
        setIsModalNullOpen(true);
    }
    function closeModalNull() {
        setIsModalNullOpen(false);
    }

    function getOpenModalSearchState() {
        return isModalSearchOpen;
    }
    function openModalSearch() {
        setIsModalSearchOpen(true);
    }
    function closeModalSearch() {
        setIsModalSearchOpen(false);
    }

    const value: GameContextType = {
        gameState,
        handleSquareClick,
        handleMove,
        handleCheckChange,
        handleGameEnd,
        handleResign,
        handleDraw,
        setStatus,
        setEndGame,
        getEndReason,
        getColorOfConnectedPlayer,
        getNameOfWinner,
        getOpenModalEndGameState,
        openModalEndGame,
        closeModalEndGame,
        getOpenModalNullState,
        openModalNull,
        closeModalNull,
        getOpenModalSearchState,
        openModalSearch,
        closeModalSearch,
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
