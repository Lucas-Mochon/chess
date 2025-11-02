import React, { ReactNode, useEffect, useState } from 'react';
import SideNavbar from './SideNavbar';
import TopNavbar from './TopNavbar';
import { useThemedStyles } from '../hooks/useThemedStyles';
import * as MdIcons from 'react-icons/md';
import { mainMenu, subMenus } from '../utils/sideNavbarElements';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const themedStyles = useThemedStyles();
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 960);
    const [isOverlayOpen, setOverlayOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [sidebarWidth, setSidebarWidth] = useState(64);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 960);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div style={{ minHeight: '100vh' }}>
            {!isDesktop && <TopNavbar onMenuClick={() => setOverlayOpen(true)} />}

            {!isDesktop && isOverlayOpen && (
                <div
                    className="position-fixed top-0 start-0 bg-dark text-light"
                    style={{
                        width: '100%',
                        height: '100%',
                        zIndex: 2000,
                        display: 'flex',
                        flexDirection: 'row',
                        transition: 'transform 0.3s ease',
                    }}
                >
                    <div style={{ width: 250, padding: '1rem', borderRight: '1px solid #333' }}>
                        {mainMenu.map((item) => {
                            const IconComponent = MdIcons[item.icon as keyof typeof MdIcons] as React.ComponentType<any>;
                            return (
                                <button
                                    key={item.key}
                                    className="btn d-flex align-items-center w-100 text-start text-white mb-2"
                                    onClick={() => setActiveMenu(item.key)}
                                >
                                    {IconComponent && <IconComponent size={24} className="me-2" />}
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {activeMenu && subMenus[activeMenu] && (
                        <div style={{ flex: 1, padding: '1rem' }}>
                            {subMenus[activeMenu].map((subItem, index) => {
                                const SubIcon = MdIcons[subItem.icon as keyof typeof MdIcons] as React.ComponentType<any>;
                                return (
                                    <button
                                        key={index}
                                        className="btn d-flex align-items-center w-100 text-start text-white mb-2"
                                        onClick={() => {
                                            setOverlayOpen(false);
                                            setActiveMenu(null);
                                        }}
                                    >
                                        {SubIcon && <SubIcon size={20} className="me-2" />}
                                        <span>{subItem.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            <div className="d-flex" style={{ minHeight: '100vh' }}>
                {isDesktop && <SideNavbar onExpandChange={(width) => setSidebarWidth(width)} />}

                <div
                    className={`flex-grow-1 position-relative z-1 ${themedStyles.backgroundClass}`}
                    style={{
                        ...themedStyles.inlineStyles,
                        paddingTop: !isDesktop ? 56 : 0,
                        paddingRight: '1rem',
                        paddingBottom: '1rem',
                        paddingLeft: isDesktop ? sidebarWidth : '1rem',
                        transition: 'padding-left 0.3s ease',
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
