import React from "react";
import { useGame } from "../../contexts/GameContext";
import "bootstrap/dist/css/bootstrap.min.css";

interface ModalNullGameProps {
    player: "white" | "black";
}

const ModalNullGame: React.FC<ModalNullGameProps> = ({ player }) => {
    const { gameState, getOpenModalNullState, closeModalNull, openModalEndGame, setStatus, setEndGame } = useGame();

    if (gameState.status !== 'nullProposed' || !getOpenModalNullState()) return null;

    function handleAccept() {
        closeModalNull();
        setStatus('draw');
        setEndGame(true);
        openModalEndGame();
    }

    function handleRefuse() {
        closeModalNull();
        setStatus('playing');
    }

    return (
        <div className="modal-overlay position-fixed top-0 start-0 w-100 h-100 
                        d-flex justify-content-center align-items-center bg-opacity-75">
            <div className="card shadow border-0 rounded-4 overflow-hidden" style={{ maxWidth: "350px" }}>
                
                <div className="card-header border-0 py-3 px-4 position-relative" style={{ backgroundColor: "#3C3A38" }}>
                    <button
                        onClick={handleRefuse}
                        className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                        aria-label="Close"
                        style={{ width: "20px", height: "20px" }}
                    ></button>

                    <div className="pe-4">
                        <h2 className="mb-2 fw-bold text-white" style={{ fontSize: "1.25rem" }}>
                            Le joueur adverse propose un match nul
                        </h2>
                    </div>
                </div>

                <div className="card-body p-3" style={{ backgroundColor: "#262321" }}>
                    <div className="d-grid gap-1 d-flex justify-content-around">
                        <button 
                            onClick={handleAccept}
                            className="btn w-100 rounded-3 py-2 text-white" 
                            style={{ backgroundColor: "#a0cd5e", fontSize: "0.875rem" }}
                        >
                            Accepter
                        </button>

                        <button 
                        onClick={handleRefuse}
                            className="btn w-100 rounded-3 py-2 text-white" 
                            style={{ backgroundColor: "#44423F", fontSize: "0.875rem" }}
                        >
                            Refuser
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalNullGame;
