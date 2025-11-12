import React, { useState, useMemo, useEffect } from 'react';
import { Piece, Color, PieceType } from '../../types/chess';
import { ChessRules } from '../../utils/chessRules';
import Square from './Square';
import PromotionModal from './PromotionModal';
import { useGame } from '../../contexts/GameContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Board.css';

interface BoardProps {
    onCheckChange?: (isCheck: boolean, checkColor?: Color) => void;
    onGameEnd?: (status: 'checkmate' | 'stalemate', winner?: Color) => void;
}

const Board: React.FC<BoardProps> = ({ onCheckChange, onGameEnd }) => {
    const { gameState, handleSquareClick, handleMove, handleCheckChange, handleGameEnd } = useGame();

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

    const [pieces, setPieces] = useState<Record<string, Piece | null>>({
        a8: { type: 'rook', color: 'black' },
        b8: { type: 'knight', color: 'black' },
        c8: { type: 'bishop', color: 'black' },
        d8: { type: 'queen', color: 'black' },
        e8: { type: 'king', color: 'black' },
        f8: { type: 'bishop', color: 'black' },
        g8: { type: 'knight', color: 'black' },
        h8: { type: 'rook', color: 'black' },
        a7: { type: 'pawn', color: 'black' },
        b7: { type: 'pawn', color: 'black' },
        c7: { type: 'pawn', color: 'black' },
        d7: { type: 'pawn', color: 'black' },
        e7: { type: 'pawn', color: 'black' },
        f7: { type: 'pawn', color: 'black' },
        g7: { type: 'pawn', color: 'black' },
        h7: { type: 'pawn', color: 'black' },
        a2: { type: 'pawn', color: 'white' },
        b2: { type: 'pawn', color: 'white' },
        c2: { type: 'pawn', color: 'white' },
        d2: { type: 'pawn', color: 'white' },
        e2: { type: 'pawn', color: 'white' },
        f2: { type: 'pawn', color: 'white' },
        g2: { type: 'pawn', color: 'white' },
        h2: { type: 'pawn', color: 'white' },
        a1: { type: 'rook', color: 'white' },
        b1: { type: 'knight', color: 'white' },
        c1: { type: 'bishop', color: 'white' },
        d1: { type: 'queen', color: 'white' },
        e1: { type: 'king', color: 'white' },
        f1: { type: 'bishop', color: 'white' },
        g1: { type: 'knight', color: 'white' },
        h1: { type: 'rook', color: 'white' },
    });

    const [promotionPending, setPromotionPending] = useState<{
        from: string;
        to: string;
    } | null>(null);

    const legalMoves = useMemo(() => {
        if (!gameState.selectedSquare) return [];
        const piece = pieces[gameState.selectedSquare];
        if (!piece) return [];
        return ChessRules.getLegalMoves(
            gameState.selectedSquare,
            piece,
            pieces,
            gameState.currentTurn
        );
    }, [gameState.selectedSquare, pieces, gameState.currentTurn]);

    useEffect(() => {
        const isCheck = ChessRules.isKingInCheck(gameState.currentTurn, pieces);
        const isCheckmate = ChessRules.isCheckmate(gameState.currentTurn, pieces);
        const isStalemate = ChessRules.isStalemate(gameState.currentTurn, pieces);

        if (onCheckChange) {
            onCheckChange(isCheck, isCheck ? gameState.currentTurn : undefined);
        }

        if (onGameEnd) {
            if (isCheckmate) {
                const winner = gameState.currentTurn === 'white' ? 'black' : 'white';
                onGameEnd('checkmate', winner);
            } else if (isStalemate) {
                onGameEnd('stalemate');
            }
        }

        handleCheckChange(isCheck, isCheck ? gameState.currentTurn : undefined);
        if (isCheckmate) {
            const winner = gameState.currentTurn === 'white' ? 'black' : 'white';
            handleGameEnd('checkmate', winner);
        } else if (isStalemate) {
            handleGameEnd('stalemate');
        }
    }, [pieces, gameState.currentTurn, onCheckChange, onGameEnd, handleCheckChange, handleGameEnd]);

    const performMove = (from: string, to: string, promotedTo?: PieceType) => {
        const piece = pieces[from];

        if (!piece) {
            handleSquareClick(null);
            return;
        }

        if (!promotedTo && ChessRules.shouldPromote(to, piece)) {
            setPromotionPending({ from, to });
            return;
        }

        const newPieces = { ...pieces };

        if (promotedTo) {
            newPieces[to] = { type: promotedTo, color: piece.color };
        } else {
            newPieces[to] = piece;
        }

        newPieces[from] = null;

        setPieces(newPieces);
        handleMove(from, to, promotedTo);

        handleSquareClick(null);
        setPromotionPending(null);
    };

    const onSquareClick = (position: string) => {
        if (promotionPending) return;

        if (gameState.selectedSquare === position) {
            handleSquareClick(null);
            return;
        }

        if (gameState.selectedSquare) {
            if (legalMoves.includes(position)) {
                performMove(gameState.selectedSquare, position);
            } else {
                const piece = pieces[position];
                if (piece && piece.color === gameState.currentTurn) {
                    handleSquareClick(position);
                } else {
                    handleSquareClick(null);
                }
            }
            return;
        }

        const piece = pieces[position];
        if (piece && piece.color === gameState.currentTurn) {
            handleSquareClick(position);
        }
    };

    const handlePromotionSelect = (pieceType: PieceType) => {
        if (!promotionPending) return;
        performMove(promotionPending.from, promotionPending.to, pieceType);
    };

    const kingPosition = ChessRules.findKing(gameState.currentTurn, pieces);
    const isKingInCheck = ChessRules.isKingInCheck(gameState.currentTurn, pieces);

    const boxShadowStyle = isKingInCheck
        ? '0 0 30px rgba(255, 0, 0, 0.8)'
        : '0 0 20px rgba(0, 0, 0, 0.5)';

    return (
        <div className="d-flex justify-content-center align-items-center">
            {promotionPending && (
                <PromotionModal
                    color={gameState.currentTurn}
                    onSelect={handlePromotionSelect}
                />
            )}

            <div
                className="board-container"
                style={{
                    boxShadow: boxShadowStyle,
                    opacity: promotionPending ? 0.5 : 1,
                }}
            >
                {ranks.map((rank) =>
                    files.map((file) => {
                        const position = `${file}${rank}`;
                        const isLight = (file.charCodeAt(0) + rank) % 2 === 0;
                        const isSelected = gameState.selectedSquare === position;
                        const isLegalMove = legalMoves.includes(position);
                        const piece = pieces[position];
                        const isKingChecked =
                            isKingInCheck && position === kingPosition;

                        return (
                            <Square
                                key={position}
                                position={position}
                                piece={piece}
                                isLight={isLight}
                                isSelected={isSelected}
                                isLegalMove={isLegalMove}
                                isKingChecked={isKingChecked}
                                onClick={() => onSquareClick(position)}
                                disabled={!!promotionPending}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Board;
