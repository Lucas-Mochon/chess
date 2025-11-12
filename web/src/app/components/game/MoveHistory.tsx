import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import GameControls from './GameControls';
import { useGame } from '../../contexts/GameContext';

const MoveHistory: React.FC = () => {
    const { gameState, handleResign, handleDraw } = useGame();
    const pairMoves = () => {
        const pairs = [];
        for (let i = 0; i < gameState.moves.length; i += 2) {
            pairs.push({
                white: gameState.moves[i],
                black: i + 1 < gameState.moves.length ? gameState.moves[i + 1] : null,
                moveNumber: Math.floor(i / 2) + 1
            });
        }
        return pairs;
    };

    return (
        <Card className="border-0 bg-secondary bg-opacity-10 h-100">
            <Card.Header className="border-secondary">
                <h5 className="mb-0 text-white">Historique des coups</h5>
            </Card.Header>
            <Card.Body
                style={{
                    maxHeight: '600px',
                    overflowY: 'auto',
                }}
            >
                {gameState.moves.length === 0 ? (
                    <p className="text-white text-center">Aucun coup joué</p>
                ) : (
                    <div className="px-2">
                        {pairMoves().map((pair, index) => (
                            <Row key={index} className="mb-1 gx-3">
                                <Col xs={1} className="text-white opacity-50 pe-0">
                                    {pair.moveNumber}
                                </Col>
                                <Col xs={5} className="px-1">
                                    <div
                                        className="text-light fw-bold text-center"
                                        style={{ cursor: 'pointer' }}
                                        title={pair.white?.notation}
                                    >
                                        {pair.white?.notation}
                                    </div>
                                </Col>
                                <Col xs={5} className="px-1">
                                    {pair.black && (
                                        <div
                                            className="text-warning fw-bold text-center"
                                            style={{ cursor: 'pointer' }}
                                            title={pair.black?.notation}
                                        >
                                            {pair.black?.notation}
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        ))}
                    </div>
                )}
            </Card.Body>
            <Card.Footer>
                <GameControls handleNull={handleDraw} handleResign={handleResign} />
            </Card.Footer>
        </Card>
    );
};

export default MoveHistory;