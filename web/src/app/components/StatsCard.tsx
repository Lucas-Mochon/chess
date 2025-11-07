import CustomIcon from "./CIcon";
import TitleElements from "./TitleElements";
import "./css/StatsCard.css"

const StatsCard: React.FC = () => {
    const mockData = [
        {
            "mode": "blitz",
            "rating": 1236,
            "isExtented": true,
        },
        {
            "mode": "rapide",
            "rating": 1429,
            "isExtented": true,
        },
        {
            "mode": "bullet",
            "rating": 1356,
            "isExtented": false,
        },
    ]
    return (
        <div className="shadow rounded" style={{ backgroundColor: "#262522" }}>
            <div className="p-3">
                <TitleElements title="Statistique" href="/" icon="IoIosArrowForward" />
            </div>
            <div className="pb-3">
                <div className="px-3 py-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <strong className="d-flex align-items-center">
                            <CustomIcon name="FaChessBoard" size={24} />
                            <span className="ml-3">Parties</span>
                        </strong>
                        <strong>1500</strong>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-around">
                            <strong className="d-flex align-items-center">
                                <CustomIcon name="SlPuzzle" size={24} />
                                <span className="ml-3">Problèmes</span>
                            </strong>
                        </div>
                        <strong>4526</strong>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <strong className="d-flex align-items-center">
                            <CustomIcon name="FaGraduationCap" size={24} />
                            <span className="ml-3">Leçon</span>
                        </strong>
                        <strong>19</strong>
                    </div>
                </div>
            </div>
            <hr className="mt-0 mb-3" />
            <div className="px-3 py-2">
                {mockData.map((item, index) => {
                    return (
                        <div key={index}>
                            <span className={item.isExtented ? "d-flex flex-row justify-content-between deploy-banner" : "d-flex flex-row justify-content-between"}>
                                <h4 className="m-2">
                                    {item.mode}
                                </h4>
                                <h4 className="m-2">
                                    {item.rating}
                                    <CustomIcon name={item.isExtented ? "IoIosArrowDown" : "IoIosArrowForward"} size={24} />
                                </h4>
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StatsCard;