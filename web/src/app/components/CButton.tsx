import React from "react";
import "./css/CButton.css";
import { FaApple } from "react-icons/fa";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { IoMail } from "react-icons/io5";

interface CButtonProps {
    link: string;
    text: string;
    color?: string;
    logo?: string;
    icon?: string;
}

const CButton: React.FC<CButtonProps> = ({ link, text, color, logo, icon }) => {
    let classPrefix = "btn-lg text-decoration-none d-inline-block text-center p-2 m-1 position-relative";
    if (color === "black") classPrefix += " custom-btn-black";
    if (color === "green" || color === undefined) classPrefix += " custom-btn-green";

    const renderIcon = () => {
        if (logo) {
            return (
                <img
                    src={logo}
                    alt=''
                    style={{
                        width: '20px',
                        height: '20px',
                        verticalAlign: 'middle'
                    }}
                />
            );
        } else if (icon) {
            switch (icon) {
                case 'phone': return <MdOutlinePhoneIphone size={20} />;
                case 'google': return <FcGoogle size={20} />;
                case 'apple': return <FaApple size={20} />;
                case 'mail': return <IoMail size={20} />;
                default: return null;
            }
        }
        return null;
    };

    return (
        <a href={link} className={classPrefix}>
            <div className="d-flex justify-content-between align-items-center w-100">
                <span className="pe-2">
                    {renderIcon()}
                </span>
                <span className="flex-grow-1 text-start ps-2">{text}</span>
            </div>
        </a>
    );
};

export default CButton;