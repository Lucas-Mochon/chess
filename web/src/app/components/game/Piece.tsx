import React from 'react';
import { Piece } from '../../types/chess';

interface PieceProps {
    piece: Piece;
}

const PieceComponent: React.FC<PieceProps> = ({ piece }) => {
    const getPieceImagePath = (type: string, color: string): string => {
        return `/assets/images/pawn/${color}/${color}-${type}.svg`;
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            <img
                src={getPieceImagePath(piece.type, piece.color)}
                alt={`${piece.color} ${piece.type}`}
                draggable={false}
                style={{
                    width: '80%',
                    height: '80%',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};

export default PieceComponent;
