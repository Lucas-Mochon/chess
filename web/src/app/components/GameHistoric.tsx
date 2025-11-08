import TitleElements from "./TitleElements";
import "./css/GameHistoric.css";

const GameHistoric: React.FC = () => {
    const moksGameHisotic = [
        {
            whitePlayer: { playerName: "test1", playerElo: 900 },
            blackPlayer: { playerName: "test2", playerElo: 902 },
            whiteWin: true,
            blackWin: false,
            precision: "84.3",
            coups: 41,
            Date: "11 Janvier",
        },
        {
            whitePlayer: { playerName: "test1", playerElo: 900 },
            blackPlayer: { playerName: "test2", playerElo: 902 },
            whiteWin: false,
            blackWin: true,
            precision: "78.5",
            coups: 38,
            Date: "10 Janvier",
        },
        {
            whitePlayer: { playerName: "test1", playerElo: 900 },
            blackPlayer: { playerName: "test2", playerElo: 902 },
            whiteWin: true,
            blackWin: false,
            precision: "92.1",
            coups: 56,
            Date: "9 Janvier",
        },
    ];

    function returnWinNumber(result: boolean) {
        return result ? 1 : 0;
    }

    return (
        <div className="shadow rounded" style={{ backgroundColor: "#262522" }}>
            <div className="p-3">
                <TitleElements
                    title="Parties récentes"
                    href="/"
                    hr={false}
                    iconAction={false}
                />
            </div>

            <div
                className="row py-2 mx-0 fw-semibold d-none d-md-flex"
                style={{ backgroundColor: "#1F1E1C", minHeight: "45px" }}
            >
                <div className="col-md-5 text-center">Joueurs</div>
                <div className="col-md-1 text-start">Résultats</div>
                <div className="col-md-2 text-center">Précision</div>
                <div className="col-md-1 text-start">Coups</div>
                <div className="col-md-2 text-end">Date</div>
                <div className="col-md-1"></div>
            </div>

            {moksGameHisotic.map((item, index) => (
                <div key={index} className="games-lines">
                    {index !== 0 && <hr className="game-historic-separator" />}
                    <div className="row py-3 mx-0 align-items-center">
                        <div className="col-12 col-md-5 text-center">
                            <div className="fw-semibold text-white">
                                {item.whitePlayer.playerName} ({item.whitePlayer.playerElo})
                            </div>
                            <div className="text-secondary">
                                {item.blackPlayer.playerName} ({item.blackPlayer.playerElo})
                            </div>
                        </div>

                        <div className="col-6 col-md-1 text-center">
                            <div>{returnWinNumber(item.whiteWin)}</div>
                            <div>{returnWinNumber(item.blackWin)}</div>
                        </div>

                        <div className="col-6 col-md-2 text-center">{item.precision}%</div>

                        <div className="col-6 col-md-1 text-center">{item.coups}</div>

                        <div className="col-6 col-md-2 text-end">{item.Date}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameHistoric;
