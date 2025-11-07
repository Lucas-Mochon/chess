import TitleElements from "./TitleElements";
import "./css/GameHistoric.css"

const GameHistoric: React.FC = () => {
    const moksGameHisotic = [
        {
            whitePlayer: {
                playerName: "test1",
                playerElo: 900,
            },
            blackPlayer: {
                playerName: "test2",
                playerElo: 902,
            },
            whiteWin: true,
            blackWin: false,
            precision: "84.3",
            coups: 41,
            Date: "11 Janvier",
        },
        {
            whitePlayer: {
                playerName: "test1",
                playerElo: 900,
            },
            blackPlayer: {
                playerName: "test2",
                playerElo: 902,
            },
            whiteWin: true,
            blackWin: false,
            precision: "84.3",
            coups: 41,
            Date: "11 Janvier",
        },
        {
            whitePlayer: {
                playerName: "test1",
                playerElo: 900,
            },
            blackPlayer: {
                playerName: "test2",
                playerElo: 902,
            },
            whiteWin: true,
            blackWin: false,
            precision: "84.3",
            coups: 41,
            Date: "11 Janvier",
        },
    ];

    function returnWinNumber(result: boolean) {
        return result ? 1 : 0;
    }

    return (
        <div className="shadow rounded" style={{ backgroundColor: "#262522" }}>
            <div className="p-3">
                <TitleElements title="Parties récentes" href="/" hr={false} iconAction={false} />
            </div>

            <div
                className="col-12 d-flex flex-row py-2"
                style={{
                    backgroundColor: "#1F1E1C",
                    fontWeight: 600,
                    alignItems: "center",
                    minHeight: "45px",
                }}
            >
                <div className="col-12 col-lg-5 text-center">Joueurs</div>
                <div className="col-12 col-lg-1 text-left">Résultats</div>
                <div className="col-12 col-lg-2 text-center">Précision</div>
                <div className="col-12 col-lg-1 text-left">Coups</div>
                <div className="col-12 col-lg-2 text-end date-padding">Date</div>
                <div className="col-12 col-lg-1 text-end date-padding"></div>
            </div>

            {moksGameHisotic.length > 0 &&
                moksGameHisotic.map((item, index) => (
                    <div className=" games-lines">
                        {index !== 0 ? <hr className="game-historic-separator" /> : null}
                        <div
                            className="col-12 d-flex flex-row py-3"
                            key={index}
                        >
                            <div className="col-12 col-lg-5 text-center d-flex flex-column justify-content-center">
                                <div>{item.whitePlayer.playerName} ({item.whitePlayer.playerElo})</div>
                                <div>{item.blackPlayer.playerName} ({item.blackPlayer.playerElo})</div>
                            </div>

                            <div className="col-12 col-lg-1 text-left d-flex flex-column justify-content-center">
                                <div>{returnWinNumber(item.whiteWin)}</div>
                                <div>{returnWinNumber(item.blackWin)}</div>
                            </div>

                            <div className="col-12 col-lg-2 text-center d-flex justify-content-center">
                                {item.precision}
                            </div>

                            <div className="col-12 col-lg-1 text-left d-flex justify-content-center">
                                {item.coups}
                            </div>

                            <div className="col-12 col-lg-2 text-end d-flex justify-content-end date-padding">
                                {item.Date}
                            </div>
                            <div className="col-12 col-lg-1 text-end date-padding"></div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default GameHistoric;
