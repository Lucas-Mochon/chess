import React from "react";
import "./css/PicturesCard.css";
import CButton from "./CButton";

interface PicturesCardProps {
    imgLink: string;
    imgAlt: string;
    text: string;
    haveButtons?: boolean;
    buttonLink?: string;
    buttonText?: string;
}

const PicturesCard: React.FC<PicturesCardProps> = ({
    imgLink,
    imgAlt,
    text,
    haveButtons = true,
    buttonLink,
    buttonText
}) => {
    return (
        <div className="container my-5">
            <div className="background text-light p-4 mx-auto text-center" style={{ maxWidth: "800px" }}>
                <img src={imgLink} alt={imgAlt} className="img-fluid rounded w-100" />

                <p className="mt-4 fs-5">
                    {text}
                </p>

                {buttonText && buttonLink && haveButtons && (
                    <div className="mt-3">
                        <CButton link={buttonLink} text={buttonText} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PicturesCard;