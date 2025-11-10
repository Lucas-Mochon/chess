import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Move } from '../../types/chess';

interface MoveHistoryProps {
    moves: Move[];
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moves }) => {
    return (
        <Card className="border-0 bg-secondary bg-opacity-10 h-100">
            <Card.Header className="bg-dark border-secondary">
                <h5 className="mb-0 fw-bold">📋 Historique des coups</h5>
            </Card.Header>
            <Card.Body
                style={{
                    maxHeight: '600px',
                    overflowY: 'auto',
                }}
            >
                {moves.length === 0 ? (
                    <p className="text-muted text-center">Aucun coup joué</p>
                ) : (
                    <Row className="g-2">
                        {moves.map((move, index) => (
                            <Col xs={6} key={index}>
                                <div
                                    className="p-2 bg-dark rounded text-center"
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#444c56';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#161b22';
                                    }}
                                >
                                    <small className="text-muted">
                                        {Math.floor(index / 2) + 1}.
                                    </small>
                                    <div
                                        className={`fw-bold ${index % 2 === 0 ? 'text-light' : 'text-warning'}`}
                                    >
                                        {move.notation}
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
            </Card.Body>
        </Card>
    );
};

export default MoveHistory;
