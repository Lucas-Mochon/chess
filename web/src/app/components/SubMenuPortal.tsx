import React from 'react';
import ReactDOM from 'react-dom';

interface SubMenuPortalProps {
    children: React.ReactNode;
}

const SubMenuPortal: React.FC<SubMenuPortalProps> = ({ children }) => {
    const portalRoot = document.getElementById('submenu-root');

    return portalRoot
        ? ReactDOM.createPortal(
            <div
                className="position-fixed top-0 bg-dark text-light p-3 shadow"
                style={{
                    left: 250,
                    top: 0,
                    height: '100vh',
                    zIndex: 9999,
                    minWidth: 220,
                }}
            >
                {children}
            </div>,
            portalRoot
        )
        : null;
};

export default SubMenuPortal;