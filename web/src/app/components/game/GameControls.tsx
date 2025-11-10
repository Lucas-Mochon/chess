import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { GameStatus } from '../../types/chess';

interface GameControlsProps {
    status: GameStatus;
    onResign: () => void;
    onDraw: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
    status,
    onResign,
    onDraw,
}) => {
    const getStatusMessage = (): string => {
        const messages: Record<GameStatus, string> = {
            playing: '⚔️ Partie en cours',
            checkmate: '♔ Échec et mat',
            stalemate: '🤝 Pat',
            draw: '🤝 Nulle',
            resigned: '🏳️ Abandon',
            check: '⚠️ Échec',
            timeout: '⏰ Temps écoulé',
        };
        return messages[status];
    };

    const getStatusColor = (): string => {
        const colors: Record<GameStatus, string> = {
            playing: 'info',
            checkmate: 'danger',
            stalemate: 'warning',
            draw: 'secondary',
            resigned: 'danger',
            check: 'warning',
            timeout: 'danger',
        };
        return colors[status];
    };

    return (
        <Card className="border-0 bg-secondary bg-opacity-10">
            <Card.Body>
                <Row className="align-items-center">
                    <Col md={6} className="text-center mb-3 mb-md-0">
                        <h5 className={`text-${getStatusColor()} mb-0 fw-bold`}>
                            {getStatusMessage()}
                        </h5>
                    </Col>
                    <Col md={6}>
                        {status === 'playing' && (
                            <div className="d-flex gap-2 justify-content-center">
                                <Button
                                    variant="info"
                                    size="sm"
                                    onClick={onDraw}
                                    className="fw-bold"
                                >
                                    ✋ Proposer une nulle
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={onResign}
                                    className="fw-bold"
                                >
                                    🏳️ Abandonner
                                </Button>
                            </div>
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default GameControls;
