import React from 'react';
import { PieceType, Color } from '../../types/chess';
import PieceComponent from './Piece';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PromotionModalProps {
    color: Color;
    onSelect: (pieceType: PieceType) => void;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ color, onSelect }) => {
    const pieces: PieceType[] = ['queen', 'rook', 'bishop', 'knight'];

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
            style={{ zIndex: 1000 }}
        >
            <div className="bg-secondary rounded p-4 shadow text-center">
                <h2 className="text-white mb-4">Choisissez une pièce</h2>

                <div className="row g-3">
                    {pieces.map((pieceType) => (
                        <div className="col-3" key={pieceType}>
                            <button
                                className="btn btn-warning w-100 h-100 d-flex align-items-center justify-content-center"
                                onClick={() => onSelect(pieceType)}
                                style={{
                                    transition: 'transform 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                    e.currentTarget.classList.add('bg-light');
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.classList.remove('bg-light');
                                }}
                            >
                                <div style={{ fontSize: '40px' }}>
                                    <PieceComponent
                                        piece={{
                                            type: pieceType,
                                            color: color,
                                        }}
                                    />
                                </div>
                            </button>
                        </div>
                    ))}
                </div>

                <p className="text-muted mt-3" style={{ fontSize: '14px' }}>
                    {color === 'white' ? 'Blanc' : 'Noir'} - Promotion du pion
                </p>
            </div>
        </div>
    );
};

export default PromotionModal;
