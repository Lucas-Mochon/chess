// components/game/Board.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { Piece, Color, PieceType } from '../../types/chess';
import { ChessRules } from '../../utils/chessRules';
import Square from './Square';
import PromotionModal from './PromotionModal';

interface BoardProps {
    selectedSquare: string | null;
    onSquareClick: (position: string | null) => void;
    onMove: (from: string, to: string, promotedTo?: PieceType) => void;
    currentTurn: Color;
    onCheckChange?: (isCheck: boolean, checkColor?: Color) => void;
    onGameEnd?: (status: 'checkmate' | 'stalemate', winner?: Color) => void;
}

const Board: React.FC<BoardProps> = ({
    selectedSquare,
    onSquareClick,
    onMove,
    currentTurn,
    onCheckChange,
    onGameEnd,
}) => {
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

    // Calculer les coups légaux pour la case sélectionnée
    const legalMoves = useMemo(() => {
        if (!selectedSquare) return [];
        const piece = pieces[selectedSquare];
        if (!piece) return [];
        return ChessRules.getLegalMoves(
            selectedSquare,
            piece,
            pieces,
            currentTurn
        );
    }, [selectedSquare, pieces, currentTurn]);

    // Vérifier check et checkmate après chaque mouvement
    useEffect(() => {
        const isCheck = ChessRules.isKingInCheck(currentTurn, pieces);
        const isCheckmate = ChessRules.isCheckmate(currentTurn, pieces);
        const isStalemate = ChessRules.isStalemate(currentTurn, pieces);

        if (onCheckChange) {
            onCheckChange(isCheck, isCheck ? currentTurn : undefined);
        }

        if (onGameEnd) {
            if (isCheckmate) {
                const winner = currentTurn === 'white' ? 'black' : 'white';
                onGameEnd('checkmate', winner);
            } else if (isStalemate) {
                onGameEnd('stalemate');
            }
        }
    }, [pieces, currentTurn, onCheckChange, onGameEnd]);

    const handleSquareClick = (position: string) => {
        if (promotionPending) return;

        // Si on clique sur la même case, on désélectionne
        if (selectedSquare === position) {
            onSquareClick(null);
            return;
        }

        // Si une case est déjà sélectionnée, on essaie de faire le mouvement
        if (selectedSquare) {
            if (legalMoves.includes(position)) {
                handleMove(selectedSquare, position);
            } else {
                // Sinon, on sélectionne la nouvelle case si elle contient une pièce du joueur actuel
                const piece = pieces[position];
                if (piece && piece.color === currentTurn) {
                    onSquareClick(position);
                } else {
                    onSquareClick(null);
                }
            }
            return;
        }

        // Sinon, on sélectionne la case (si elle contient une pièce du joueur actuel)
        const piece = pieces[position];
        if (piece && piece.color === currentTurn) {
            onSquareClick(position);
        }
    };

    const handleMove = (from: string, to: string) => {
        const piece = pieces[from];

        if (!piece) {
            onSquareClick(null);
            return;
        }

        // Vérifier que le coup est légal
        if (!legalMoves.includes(to)) {
            onSquareClick(null);
            return;
        }

        // Vérifier si c'est une promotion
        if (ChessRules.shouldPromote(to, piece)) {
            setPromotionPending({ from, to });
            return;
        }

        // Effectuer le mouvement
        performMove(from, to);
    };

    const performMove = (from: string, to: string, promotedTo?: PieceType) => {
        const piece = pieces[from];

        if (!piece) {
            onSquareClick(null);
            return;
        }

        // Créer une copie de l'état des pièces
        const newPieces = { ...pieces };

        // Si c'est une promotion, remplacer le pion par la pièce promue
        if (promotedTo) {
            newPieces[to] = { type: promotedTo, color: piece.color };
        } else {
            newPieces[to] = piece;
        }

        newPieces[from] = null;

        // Mettre à jour l'état
        setPieces(newPieces);

        // Appeler le callback du parent
        onMove(from, to, promotedTo);

        // Désélectionner et fermer la modal
        onSquareClick(null);
        setPromotionPending(null);
    };

    const handlePromotionSelect = (pieceType: PieceType) => {
        if (!promotionPending) return;
        performMove(promotionPending.from, promotionPending.to, pieceType);
    };

    const kingPosition = ChessRules.findKing(currentTurn, pieces);
    const isKingInCheck = ChessRules.isKingInCheck(currentTurn, pieces);

    return (
        <>
            {promotionPending && (
                <PromotionModal
                    color={currentTurn}
                    onSelect={handlePromotionSelect}
                />
            )}

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(8, 1fr)',
                    gridTemplateRows: 'repeat(8, 1fr)',
                    gap: 0,
                    width: '100%',
                    maxWidth: '600px',
                    aspectRatio: '1 / 1',
                    border: '3px solid #444c56',
                    boxShadow: isKingInCheck
                        ? '0 0 30px rgba(255, 0, 0, 0.8)'
                        : '0 0 20px rgba(0, 0, 0, 0.5)',
                    margin: '0 auto',
                    transition: 'box-shadow 0.3s ease',
                    opacity: promotionPending ? 0.5 : 1,
                }}
            >
                {ranks.map((rank) =>
                    files.map((file) => {
                        const position = `${file}${rank}`;
                        const isLight = (file.charCodeAt(0) + rank) % 2 === 0;
                        const isSelected = selectedSquare === position;
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
                                onClick={() => handleSquareClick(position)}
                                disabled={!!promotionPending}
                            />
                        );
                    })
                )}
            </div>
        </>
    );
};

export default Board;
