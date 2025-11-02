import React from 'react';
import * as MdIcons from 'react-icons/md';

interface TopNavbarProps {
    onMenuClick: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ onMenuClick }) => {
    const MenuIcon = MdIcons.MdMenu as React.ComponentType<any>;

    return (
        <div
            className="d-flex align-items-center justify-content-between bg-dark text-light px-3"
            style={{
                height: '56px',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
            }}
        >
            <button className="btn btn-dark" onClick={onMenuClick}>
                <MenuIcon size={28} />
            </button>
            <div className="fw-bold">ChessApp</div>
        </div>
    );
};

export default TopNavbar;