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
}

const CButton: React.FC<CButtonProps> = ({
    link,
    text,
    color,
    logo,
    icon,
    iconColor,
    iconSize,
    type,
    disabled = false,
}) => {
    let classPrefix = "btn-lg text-decoration-none d-inline-block text-center p-2 m-1 position-relative w-100";
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
                        width: "20px",
                        height: "20px",
                        verticalAlign: "middle",
                    }}
                />
            );
        } else if (icon) {
            return <CustomIcon name={icon} size={iconSize} color={iconColor} />
        }
        return null;
    };

    if (type === "submit") {
        return (
            <button
                type="submit"
                className={classPrefix}
                disabled={disabled}
                style={{ cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1 }}
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
            style={{ pointerEvents: disabled ? "none" : "auto", opacity: disabled ? 0.6 : 1 }}
        >
            <div className="d-flex justify-content-between align-items-center w-100">
                <span className="pe-2">{renderIcon()}</span>
                <span className="flex-grow-1 text-start ps-2">{text}</span>
            </div>
        </a>
    );
};

export default CButton;
