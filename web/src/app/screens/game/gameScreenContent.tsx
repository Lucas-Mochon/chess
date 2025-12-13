import React, { useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import Board from '../../components/game/Board';
import PlayerCard from '../../components/game/PlayerCard';
import MoveHistory from '../../components/game/MoveHistory';
import { Row, Col, Container } from 'react-bootstrap';
import ModalEndGame from '../../components/game/ModalEndGame';
import ModalNullGame from '../../components/game/ModalNullGame';
import ModalSearchPlayer from '../../components/game/ModalSearchPlayer';

const GameScreenContent: React.FC = () => {
    const {
        gameState,
        handleCheckChange,
        handleGameEnd,
        handleResign,
        getOpenModalEndGameState,
        openModalSearch
    } = useGame();

    useEffect(() => {
        if (gameState.status === 'searching') {
            openModalSearch();
        }
    }, [gameState.status, openModalSearch]);

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
                    <MoveHistory handleResign={handleResign} />
                </Col>
            </Row>

            {gameState.endGame && getOpenModalEndGameState() && <ModalEndGame />}
            {gameState.status === 'nullProposed' && <ModalNullGame player="black" />}
            {gameState.status === 'searching' && <ModalSearchPlayer />}
        </Container>
    );
};

export default GameScreenContent;
