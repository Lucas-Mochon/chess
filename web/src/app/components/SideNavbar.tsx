import React, { useState, useEffect, useRef } from 'react';
import { mainMenu, subMenus } from '../utils/sideNavbarElements';
import { useTheme } from '../contexts/ThemeContext';
import * as MdIcons from 'react-icons/md';
import LogoButton from './LogoButton';
import CustomIcon from './CIcon';

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
        handleWidthChange();
    }, [forceExpanded, isExpanded, onExpandChange]);

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
                className="position-fixed top-0 start-0 text-light d-flex flex-column"
                style={{
                    backgroundColor: "#262522",
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
                    <div className="m-2">
                        <LogoButton />
                    </div>
                    {mainMenu.map((item) => {
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
                                    {item.image != null ? (
                                        <span className="d-flex align-items-center text-white">
                                            <img
                                                src={item.image}
                                                alt={item.label}
                                                style={{ width: 30, height: 30 }}
                                            />
                                            <h4 className="ms-2">{item.label}</h4>
                                        </span>
                                    ) : (
                                        <span className="d-flex align-items-center text-white">
                                            <CustomIcon name={item.icon} size={30} />
                                            <h4 className="ms-2">{item.label}</h4>
                                        </span>
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
                    className="position-fixed top-0 text-light p-3 shadow"
                    style={{
                        backgroundColor: "#141413",
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
