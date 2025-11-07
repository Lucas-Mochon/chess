import { useRef } from "react";
import TitleElements from "./TitleElements";
interface DirectChessProps {
    action: () => void;
}

const DirectChess: React.FC<DirectChessProps> = ({ action }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    return (
        <div className="shadow rounded" style={{ backgroundColor: "#262522" }}>
            <div className="p-3">
                <TitleElements title="Direct" icon="RxCross2" action={action} />
            </div>

            <div className="p-2">
                <video
                    ref={videoRef}
                    controls
                    width="100%"
                    className="rounded"
                >
                    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                    Ton navigateur ne supporte pas la lecture vidéo.
                </video>
            </div>
        </div>
    );
};

export default DirectChess;
