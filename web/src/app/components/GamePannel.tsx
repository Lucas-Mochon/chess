import React, { useState } from "react";
import CustomIcon from "./CIcon";
import "./css/GamePannel.css";

interface GamePannelProps {
    title: string;
    href: string;
}

const GamePannel: React.FC<GamePannelProps> = ({ title, href }) => {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const gamesProposed = [
        {
            "playerName": "test",
            "eloPlayer": 900,
            "winAgainstPlayer": 1,
            "nullAgainstPlayer": 0,
            "loseAgainstPlayer": 1
        },
        {
            "playerName": "joueur2",
            "eloPlayer": 1200,
            "winAgainstPlayer": 2,
            "nullAgainstPlayer": 1,
            "loseAgainstPlayer": 0
        },
        {
            "playerName": "master64",
            "eloPlayer": 1500,
            "winAgainstPlayer": 0,
            "nullAgainstPlayer": 2,
            "loseAgainstPlayer": 1
        }
    ];

    const handleViewChange = (mode: "grid" | "list") => {
        setViewMode(mode);
    };

    return (
        <div className="game-pannel shadow rounded p-3">
            <h2 className="dropdown-title d-flex justify-content-between align-items-center mb-3">
                {title} ({gamesProposed.length})
                <div className="view-toggle">
                    <button
                        className={`btn btn-link p-1 text-white ${viewMode === "list" ? "" : "opacity-50"}`}
                        onClick={() => handleViewChange("list")}
                    >
                        <CustomIcon name="FiAlignJustify" size={24} />
                    </button>
                    <button
                        className={`btn btn-link p-1 text-white ${viewMode === "grid" ? "" : "opacity-50"}`}
                        onClick={() => handleViewChange("grid")}
                    >
                        <CustomIcon name="CiGrid41" size={24} />
                    </button>
                </div>
            </h2>
            <hr className="mt-0 mb-3" />
            {viewMode === "grid" ? (
                <div className="row g-3">
                    {gamesProposed.map((game, index) => (
                        <div className="col-md-6 col-lg-4" key={index}>
                            <div className="game-card d-flex">
                                <div className="game-image-container align-self-start">
                                    <img
                                        src="assets/images/echiquier.png"
                                        alt="échiquier"
                                        className="game-image"
                                    />
                                    <div className="game-buttons text-white">
                                        <button className="btn-decline-defi">
                                            <CustomIcon name="FiX" color="white" />
                                        </button>
                                        <button className="btn-accept-defi">
                                            <strong className="text-white">Défi</strong>
                                        </button>
                                    </div>
                                </div>
                                <div className="game-info text-white p-2">
                                    <strong className="mb-1">Match recommandée</strong>
                                    <div className="mb-1">
                                        <strong>{game.playerName}</strong> <span>({game.eloPlayer})</span>
                                    </div>
                                    <div className="mb-1">
                                        {game.winAgainstPlayer} / {game.nullAgainstPlayer} / {game.loseAgainstPlayer}
                                    </div>
                                    <div className="small">Adversaire récent</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="list-view">
                    {gamesProposed.map((game, index) => (
                        <div className="game-card-list d-flex align-items-center justify-content-between mb-1 shadow-sm rounded p-2" key={index}>
                            <div className="d-flex align-items-center">
                                <img
                                    src="assets/images/echiquier.png"
                                    alt="échiquier"
                                    className="game-image-small me-3"
                                    style={{ width: "80px", borderRadius: "4px" }}
                                />
                                <div className="game-info-list text-white">
                                    <strong className="d-block">Match recommandée</strong>
                                    <div className="player-name">
                                        {game.playerName} <span className="text-white-50">({game.eloPlayer})</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="game-stats me-2">
                                            {game.winAgainstPlayer} / {game.nullAgainstPlayer} / {game.loseAgainstPlayer}
                                        </div>
                                        <div className="player-status text-white-50">
                                            • Adversaire récent
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="list-buttons d-flex flex-row text-white">
                                <button className="btn-decline-defi-line rounded p-2 mr-2">
                                    <CustomIcon name="FiX" color="white" />
                                </button>
                                <div className="pl-2 pr-2"></div>
                                <button className="btn-accept-defi-line rounded p-2">
                                    <strong className="text-white">Défi</strong>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GamePannel;