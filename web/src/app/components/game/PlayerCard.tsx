import React from 'react';
import { Player } from '../../types/chess';
import './css/PlayerCard.css';
import Timer from './Timer';

interface PlayerCardProps {
    player: Player;
    gameState: {
        timeWhite: number;
        timeBlack: number;
    },
    playerColor: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, gameState, playerColor }) => {
    return (
        <div className="d-flex align-items-center flex-row justify-content-between p-2">
            <div className="d-flex align-items-center">
                <img
                    src={player.avatar ? player.avatar : '/assets/images/default-avatar.png'}
                    alt={player.username}
                    className="mr-3"
                    style={{
                        width: '60px',
                        height: '60px',
                    }}
                />
                <span><h5 className="mb-1 fw-bold">{player.username}</h5></span>
                <span className="mb-1">({player.rating})</span>
                <span className="badge">{player.country}</span>
            </div>
            <div>
                {playerColor === 'white' ? <Timer time={gameState.timeWhite} /> : <Timer time={gameState.timeBlack} />}
            </div>
        </div>
    );
};

export default PlayerCard;
