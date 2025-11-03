import React from "react";
import "./css/CButton.css";

interface CButtonProps {
    link: string;
    text: string;
}

const CButton: React.FC<CButtonProps> = ({ link, text }) => {
    return (
        <a href={link} className="custom-btn btn-lg text-decoration-none d-inline-block">
            {text}
        </a>
    );
};

export default CButton;