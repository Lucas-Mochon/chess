import React from 'react';
import { Card } from 'react-bootstrap';

interface TimerProps {
    time: number;
}

const Timer: React.FC<TimerProps> = ({ time }) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formatTime = (value: number): string => {
        return value.toString().padStart(2, '0');
    };

    const isLowTime = time < 60;

    return (
        <Card
            className={`border-0 text-center ${isLowTime ? 'bg-danger bg-opacity-10 border-danger border-2' : 'bg-secondary bg-opacity-10'}`}
            style={{
                transition: 'all 0.3s ease',
            }}
        >
            <Card.Body className="py-3">
                <div
                    style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        fontFamily: "'Courier New', monospace",
                        color: isLowTime ? '#dc3545' : '#e0e6ed',
                        animation: isLowTime ? 'blink 0.5s infinite' : 'none',
                    }}
                >
                    {formatTime(minutes)}:{formatTime(seconds)}
                </div>
            </Card.Body>

            <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
        </Card>
    );
};

export default Timer;
