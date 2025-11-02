import React, { useState, useEffect, useRef } from 'react';
import { mainMenu, subMenus } from '../utils/sideNavbarElements';
import { useTheme } from '../contexts/ThemeContext';
import * as MdIcons from 'react-icons/md';

interface SideNavbarProps {
    onExpandChange?: (width: number) => void;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ onExpandChange }) => {
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [forceExpanded, setForceExpanded] = useState(window.innerWidth >= 1200);
    const { theme, toggleTheme } = useTheme();

    const navbarRef = useRef<HTMLDivElement>(null);
    const subMenuRef = useRef<HTMLDivElement>(null);
    const leaveTimeoutRef = useRef<number | null>(null);

    const BrightnessIcon = MdIcons.MdBrightness6 as React.ComponentType<any>;

    const currentWidth = forceExpanded || isExpanded ? 250 : 64;
    const isSubMenuOpen = hoveredMenu && subMenus[hoveredMenu];

    useEffect(() => {
        const handleWidthChange = () => {
            const width = forceExpanded || isExpanded ? 250 : 64;
            onExpandChange?.(width);
        };
        handleWidthChange(); // à l'initialisation
    }, [forceExpanded, isExpanded, onExpandChange]);

    // Handle responsive
    useEffect(() => {
        const handleResize = () => {
            const expanded = window.innerWidth >= 1200;
            setForceExpanded(expanded);
            if (expanded) {
                setIsExpanded(true);
                onExpandChange?.(250);
            } else {
                setIsExpanded(false);
                onExpandChange?.(64);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [onExpandChange]);

    // Close subMenu if click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                !navbarRef.current?.contains(e.target as Node) &&
                !subMenuRef.current?.contains(e.target as Node)
            ) {
                setHoveredMenu(null);
                if (!forceExpanded) {
                    setIsExpanded(false);
                    onExpandChange?.(64);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [forceExpanded, onExpandChange]);

    const handleMouseLeave = () => {

        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
        }
        leaveTimeoutRef.current = window.setTimeout(() => {
            setHoveredMenu(null);
            if (!forceExpanded) {
                setIsExpanded(false);
                onExpandChange?.(64);
            }
        }, 150);
    };

    const handleMouseEnter = () => {
        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
        }
        leaveTimeoutRef.current = window.setTimeout(() => {
            if (leaveTimeoutRef.current) {
                clearTimeout(leaveTimeoutRef.current);
            }
        }, 150);
    };

    return (
        <>
            <div
                ref={navbarRef}
                className="position-fixed top-0 start-0 bg-dark text-light d-flex flex-column"
                style={{
                    width: currentWidth,
                    height: '100vh',
                    transition: 'width 0.3s ease',
                    zIndex: 1000,
                }}
                onMouseEnter={() => {
                    handleMouseEnter();
                    if (!forceExpanded) {
                        setIsExpanded(true);
                        onExpandChange?.(250);
                    }
                }}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex-grow-1">
                    {mainMenu.map((item) => {
                        const IconComponent = MdIcons[item.icon as keyof typeof MdIcons] as React.ComponentType<any>;
                        return (
                            <div
                                key={item.key}
                                onMouseEnter={() => {
                                    handleMouseEnter();
                                    setHoveredMenu(item.key);
                                }}
                                onMouseLeave={handleMouseLeave}
                                className="mb-2"
                            >
                                <button
                                    className={`btn d-flex align-items-center w-100 text-start ${hoveredMenu === item.key ? 'bg-secondary' : ''
                                        }`}
                                    style={{ padding: '0.75rem' }}
                                >
                                    {IconComponent && <IconComponent size={24} className="text-white" />}
                                    {(forceExpanded || isExpanded) && (
                                        <span className="ms-2 text-white">{item.label}</span>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-auto p-2">
                    <button
                        className="d-flex align-items-center border-0 bg-transparent text-secondary w-100"
                        onClick={toggleTheme}
                        style={{ opacity: 0.7 }}
                    >
                        <BrightnessIcon size={20} />
                        {(forceExpanded || isExpanded) && (
                            <span className="ms-2">{theme === 'dark' ? 'Interface claire' : 'Interface sombre'}</span>
                        )}
                    </button>
                </div>
            </div>

            {isSubMenuOpen && (
                <div
                    ref={subMenuRef}
                    className="position-fixed top-0 bg-dark text-light p-3 shadow"
                    style={{
                        left: currentWidth,
                        top: 0,
                        height: '100vh',
                        zIndex: 9999,
                        minWidth: 220,
                        transition: 'left 0.3s ease',
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {subMenus[hoveredMenu].map((subItem, index) => {
                        const SubIcon = MdIcons[subItem.icon as keyof typeof MdIcons] as React.ComponentType<any>;
                        return (
                            <React.Fragment key={index}>
                                <button className="btn d-flex align-items-center text-start w-100 text-white mb-2">
                                    {SubIcon && <SubIcon size={20} className="me-2" />}
                                    <span>{subItem.label}</span>
                                </button>
                                {index < subMenus[hoveredMenu].length - 1 && (
                                    <hr className="bg-secondary" />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default SideNavbar;
