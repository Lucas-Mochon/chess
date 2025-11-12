import React from 'react';
import { GameProvider } from '../../contexts/GameContext';
import GameScreenContent from './gameScreenContent';

const GameScreen: React.FC = () => {
    return (
        <GameProvider>
            <GameScreenContent />
        </GameProvider>
    );
};

export default GameScreen;
