import React from "react";
import "./css/CButton.css";
import CustomIcon from "./CIcon";

interface CButtonProps {
    link?: string;
    text: string;
    color?: string;
    logo?: string;
    icon?: string;
    iconSize?: number;
    iconColor?: string;
    type?: "button" | "submit";
    disabled?: boolean;
    size?: "normal" | "large";
}

const CButton: React.FC<CButtonProps> = ({
    link,
    text,
    color,
    logo,
    icon,
    iconColor,
    iconSize = 24,
    type,
    disabled = false,
    size = "normal",
}) => {
    let classPrefix = "text-decoration-none d-inline-block text-center position-relative w-100";

    // Ajout de classes en fonction de la taille
    if (size === "large") {
        classPrefix += " custom-btn-large";
    } else {
        classPrefix += " btn-lg p-2 m-1";
    }

    // Ajout de classes en fonction de la couleur
    if (color === "black") classPrefix += " custom-btn-black";
    if (color === "green" || color === undefined) classPrefix += " custom-btn-green";
    if (disabled) classPrefix += " disabled";

    const renderIcon = () => {
        if (logo) {
            return (
                <img
                    src={logo}
                    alt=""
                    style={{
                        width: size === "large" ? "30px" : "20px",
                        height: size === "large" ? "30px" : "20px",
                        verticalAlign: "middle",
                    }}
                />
            );
        } else if (icon) {
            return <CustomIcon name={icon} size={size === "large" ? iconSize * 1.5 : iconSize} color={iconColor} />
        }
        return null;
    };

    const buttonStyle = {
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        minHeight: size === "large" ? "70px" : "auto",
        fontSize: size === "large" ? "1.5rem" : "1rem",
        padding: size === "large" ? "16px 20px" : undefined
    };

    if (type === "submit") {
        return (
            <button
                type="submit"
                className={classPrefix}
                disabled={disabled}
                style={buttonStyle}
            >
                <div className="d-flex justify-content-between align-items-center w-100">
                    <span className="pe-2">{renderIcon()}</span>
                    <span className="flex-grow-1 text-start ps-2">{text}</span>
                </div>
            </button>
        );
    }

    return (
        <a
            href={link}
            className={classPrefix}
            style={{
                ...buttonStyle,
                pointerEvents: disabled ? "none" : "auto"
            }}
        >
            <div className="d-flex justify-content-between align-items-center w-100">
                <span className="pe-2">{renderIcon()}</span>
                <span className="flex-grow-1 text-start ps-2">{text}</span>
            </div>
        </a>
    );
};

export default CButton;