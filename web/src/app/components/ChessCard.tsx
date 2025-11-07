import "./css/ChessCard.css";

interface ChessCardProps {
    image: string;
    altImage: string;
    title: string;
    subTitle: string;
    textButton: string;
}

const ChessCard: React.FC<ChessCardProps> = ({
    image,
    altImage,
    title,
    subTitle,
    textButton
}) => {

    return (
        <div className="text-white border-0 rounded-4 bg-transparent chess-card">
            <div className="chess-card-header d-flex align-items-center mb-2">
                <img
                    src={image}
                    alt={altImage}
                    className="me-3"
                    style={{ width: "50px", height: "50px" }}
                />
                <div className="text-start">
                    <h3>{title}</h3>
                    <strong>{subTitle}</strong>
                </div>
            </div>
            <div className="chess-board-container">
                <img
                    src="assets/images/echiquier.png"
                    alt="échiquier"
                    className="img-fluid w-100 chess-board-image"
                    style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                />
            </div>
            <button className={`custom-btn btn-lg text-decoration-none d-inline-block text-center position-relative w-100`}>
                {textButton}
            </button>
        </div>
    );
};

export default ChessCard;