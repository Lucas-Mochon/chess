import CustomIcon from "./CIcon";
import TitleElements from "./TitleElements";

const DailyProblemCard: React.FC = () => {
    return (
        <div>
            <div className="shadow rounded" style={{ backgroundColor: "#262522" }}>
                <div className="pt-3">
                    <TitleElements title="Problème du jour" hr={false} href="/" icon="IoIosArrowForward" />
                </div>
                <div className="d-flex">
                    <img
                        src="assets/images/echiquier.png"
                        alt="echiquier"
                        className="img-fluid d-block w-100"
                    />
                </div>
                <div className="d-flex flex-row justify-content-around">
                    <div></div>
                    <div className="d-flex justify-content-center align-items-center text-center">
                        <CustomIcon name="FaFire" color="#FA742C" size={40} />
                    </div>
                    <div className="p-4">
                        <h3>3 jours d’affilée</h3>
                        <div>Revenez demain</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DailyProblemCard;