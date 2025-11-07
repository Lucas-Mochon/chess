import CustomIcon from "./CIcon";

const DivisionCard: React.FC = () => {
    const placement = 120;
    return (
        <div className="d-flex flex-row justify-content-between mb-4">
            <img src="assets/images/divisions/trophy.svg" alt="Divion trophy" style={{ height: "50px", width: "50px" }}></img>
            <div className="d-felx flex column ml-2">
                <strong>Jouer</strong>
                <div>{placement} <CustomIcon name="FaTrophy" /></div>
            </div>
            <div></div>
            <div></div>
        </div >
    )
}

export default DivisionCard;