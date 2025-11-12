import React from 'react';
import { useGame } from '../../contexts/GameContext';
import Board from '../../components/game/Board';
import PlayerCard from '../../components/game/PlayerCard';
import MoveHistory from '../../components/game/MoveHistory';
import { Row, Col, Container } from 'react-bootstrap';
import ModalEndGame from '../../components/game/ModalEndGame';

const GameScreenContent: React.FC = () => {
    const { gameState, handleCheckChange, handleGameEnd, getOpenModalState } = useGame();

    return (
        <Container fluid className="h-100">
            <Row className="h-100">
                <Col lg={8} md={8} sm={12} className="pe-lg-2">
                    <div className="d-flex flex-column h-100">
                        <PlayerCard
                            player={gameState.black}
                            gameState={gameState.time}
                            playerColor="black"
                        />

                        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                            <Board
                                onCheckChange={handleCheckChange}
                                onGameEnd={handleGameEnd}
                            />
                        </div>

                        <PlayerCard
                            player={gameState.white}
                            gameState={gameState.time}
                            playerColor="white"
                        />
                    </div>
                </Col>

                <Col lg={4} md={4} sm={12} className="ps-lg-2 mt-sm-3 mt-lg-0">
                    <MoveHistory />
                </Col>
            </Row>

            {gameState.endGame && !getOpenModalState() && <ModalEndGame />}
        </Container>
    );
};

export default GameScreenContent;
