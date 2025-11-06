import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import './css/DropdownMenu.css'
import CustomIcon from './CIcon';

interface MenuItem {
    key: string;
    label: string;
    href: string;
    icon?: string;
}

interface DropdownMenuProps {
    title: string;
    items: MenuItem[];
    overflow?: boolean;
    href?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, items, overflow = false, href = '' }) => {

    const displayItems = overflow ? items.slice(0, 6) : items;

    return (
        <div className={`position-absolute dropdown-menu-custom ${overflow ? 'dropdown-overflow' : ''}`}>
            <div className={`p-3 shadow rounded ${overflow ? 'overflow-menu' : 'standard-menu'}`}>
                <h2 className="dropdown-title d-flex justify-content-between align-center">
                    {title}
                    {href != null ? (
                        <a className="text-white text-decoration-none d-flex align-items-center m-1" href={href}>
                            <IoIosArrowForward />
                        </a>
                    ) : null}
                </h2>
                <hr />
                <ul className="list-unstyled m-0">
                    {displayItems.map((item: MenuItem) => {
                        return (
                            <li key={item.key} className="mb-2 d-flex align-items-center">
                                <a
                                    href={item.href}
                                    className="text-white text-decoration-none d-flex align-items-center m-1"
                                >
                                    {item.icon != undefined ? (
                                        <CustomIcon name={item.icon} />
                                    ) : null}
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default DropdownMenu;