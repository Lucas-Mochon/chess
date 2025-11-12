import React from 'react';
import CustomIcon from '../CIcon';

interface GameControlsProps {
    handleResign: () => void;
    handleNull: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ handleNull, handleResign }) => {

    return (
        <div className="border-0 bg-opacity-10">
            <div className="d-flex flex-row justify-content-between align-items-center p-2">

                <CustomIcon
                    name="IoMdSettings"
                    className="text-white fs-5"
                />

                <div className="d-flex align-items-center gap-3">
                    <small
                        role="button"
                        onClick={handleNull}
                        className="text-white fs-5 hover-opacity"
                        title="Proposer nulle"
                        style={{ cursor: 'pointer' }}
                    >
                        ½
                    </small>
                    <small
                        role="button"
                        onClick={handleResign}
                        className="text-white text-small fs-5 hover-opacity"
                        title="Abandonner"
                        style={{ cursor: 'pointer' }}
                    >
                        <CustomIcon name="FaFlag" className="fs-6" />
                        Abandonner
                    </small>
                </div>
            </div>
        </div>
    );
};

export default GameControls;