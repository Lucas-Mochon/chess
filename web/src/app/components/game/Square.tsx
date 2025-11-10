// components/game/Square.tsx
import React from 'react';
import { Piece } from '../../types/chess';
import PieceComponent from './Piece';

interface SquareProps {
    position: string;
    piece: Piece | null;
    isLight: boolean;
    isSelected: boolean;
    isLegalMove: boolean;
    isKingChecked?: boolean;
    disabled?: boolean;
    onClick: () => void;
}

const Square: React.FC<SquareProps> = ({
    position,
    piece,
    isLight,
    isSelected,
    isLegalMove,
    isKingChecked,
    disabled,
    onClick,
}) => {
    const backgroundColor = isLight ? '#f0d9b5' : '#b58863';

    let displayColor = backgroundColor;
    if (isKingChecked) {
        displayColor = '#ff4444';
    } else if (isSelected) {
        displayColor = '#baca44';
    } else if (isLegalMove) {
        displayColor = '#cdd26a';
    }

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: displayColor,
                cursor: disabled ? 'not-allowed' : piece ? 'pointer' : 'default',
                transition: 'background-color 0.2s ease',
                border: isSelected ? '3px solid #7b7d0e' : 'none',
                boxSizing: 'border-box',
                width: '100%',
                height: '100%',
                position: 'relative',
                opacity: disabled ? 0.7 : 1,
            }}
            onClick={() => !disabled && onClick()}
            onMouseEnter={(e) => {
                if (!disabled && !isSelected && piece && !isKingChecked) {
                    e.currentTarget.style.opacity = '0.8';
                }
            }}
            onMouseLeave={(e) => {
                if (!disabled) {
                    e.currentTarget.style.opacity = '1';
                }
            }}
        >
            {piece && <PieceComponent piece={piece} />}

            {/* Indicateur de coup légal */}
            {isLegalMove && !piece && (
                <div
                    style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#7b7d0e',
                        borderRadius: '50%',
                        opacity: 0.6,
                    }}
                />
            )}

            {/* Indicateur de capture */}
            {isLegalMove && piece && (
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '3px solid #7b7d0e',
                        boxSizing: 'border-box',
                        borderRadius: '50%',
                    }}
                />
            )}

            {/* Indicateur de check */}
            {isKingChecked && (
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '4px solid #ffff00',
                        boxSizing: 'border-box',
                        animation: 'pulse 0.6s infinite',
                    }}
                />
            )}

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};

export default Square;
