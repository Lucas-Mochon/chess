import "./css/ChessCard.css";

interface ChessCardProps {
    image: string;
    altImage: string;
    title: string;
    subTitle: string;
    textButton: string;
}

const ChessCard: React.FC<ChessCardProps> = ({ image, altImage, title, subTitle, textButton }) => {
    return (
        <div className="text-white border-0 rounded-4 p-3 text-center chess-card">
            <div className="chess-card-header d-flex align-items-center mb-3">
                <img
                    src={image}
                    alt={altImage}
                    className="me-3"
                    style={{ width: "40px", height: "40px" }}
                />
                <div className="text-start">
                    <strong className="fs-5">{title}</strong>
                    <div>{subTitle}</div>
                </div>
            </div>

            <img
                src="assets/images/echiquier.png"
                alt="échiquier"
                className="img-fluid chess-card-image"
            />
            <button className="custom-btn btn-lg text-decoration-none d-inline-block text-center position-relative w-100">
                {textButton}
            </button>
        </div>
    );
};

export default ChessCard;
