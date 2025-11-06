import React, { useState, useRef } from 'react';
import UserCard from "../../components/UserCard";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { FaGear } from 'react-icons/fa6';
import { settingsMenu } from '../../utils/dashboardIconMenuContent';
import { IoMail } from 'react-icons/io5';
import DropdownMenu from '../../components/DropdownMenu';
import { FaChessPawn, FaUserFriends } from "react-icons/fa";
import ChessCard from '../../components/ChessCard';
import CButton from '../../components/CButton';
import DivisionCard from '../../components/DivisionCard';


const Dashboard: React.FC = () => {
    const themedStyles = useThemedStyles();
    const leaveTimeoutRef = useRef<number | null>(null);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const gearMenu = settingsMenu;
    const rating = "1 500";

    const handleMouseLeave = () => {
        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
        }
        leaveTimeoutRef.current = window.setTimeout(() => {
            setActiveMenu(null);
        }, 150);
    };

    const handleMouseEnter = (menuId: string) => {
        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
        }
        leaveTimeoutRef.current = window.setTimeout(() => {
            setActiveMenu(menuId);
        }, 150);
    };

    return (
        <div
            className={`container-fluid ${themedStyles.backgroundClass} ${themedStyles.textClass}`}
            style={themedStyles.inlineStyles}
        >
            <div className='container mx-auto px-4' style={{ maxWidth: '75%' }}>
                <div className="d-flex flex-row justify-content-between mt-5">
                    <UserCard />
                    <div></div>
                    <div className='d-flex justify-content-between gap-4'>
                        <div
                            className="position-relative"
                            onMouseEnter={() => handleMouseEnter('friends')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <FaUserFriends size={24} color="#81B64C" />
                            {activeMenu === 'friends' && (
                                <div></div>
                            )}
                        </div>
                        <div>
                            <a href='/' className='back-link text-decoration-none'>
                                <FaChessPawn size={24} />
                            </a>
                        </div>
                        <div
                            className="position-relative"
                            onMouseEnter={() => handleMouseEnter('mail')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <IoMail size={24} />
                            {activeMenu === 'mail' && (
                                <div></div>
                            )}
                        </div>
                        <div
                            className="position-relative"
                            onMouseEnter={() => handleMouseEnter('settings')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <FaGear size={24} />
                            {activeMenu === 'settings' && (
                                <DropdownMenu title='Pamamètres' items={gearMenu} />
                            )}
                        </div>
                    </div>
                </div>

                <div className='d-flex justify-content-between flex-row mt-4'>
                    <div style={{ width: "100%", maxWidth: "250px" }}>
                        <div className='pb-4'>
                            <DivisionCard />
                        </div>
                        <div className='pb-4'>
                            <CButton text='Jouer en 10 min' icon='CiStopwatch' color='black' iconColor='#81B64C' />
                        </div>
                        <div className='pb-4'>
                            <CButton text='Nouvelle partie' icon='FaChessPawn' color='black' />
                        </div>
                        <div className='pb-4'>
                            <CButton text='Jouer contre des robots' icon='LiaRobotSolid' color='black' />
                        </div>
                        <div className='pb-4'>
                            <CButton text='Jouer avec un ami' icon='FaHandshake' color='black' />
                        </div>
                    </div>
                    <ChessCard image="assets/images/logo/puzzles.png" altImage="puzzles" title="Problèmes" subTitle={rating} textButton='Résolver le problème' />
                    <ChessCard image="assets/images/logo/lessons.png" altImage="lessons" title="Leçon suivante" subTitle="Utiliser tout le potentiel de ses pièces :" textButton='Commencer la leçon' />
                    <ChessCard image="assets/images/logo/gameReview.png" altImage="games analyse" title="Bilan de la partie" subTitle="pprenez de vos erreurs" textButton='Bilan contre' />
                </div>
            </div>
        </div >
    );
};

export default Dashboard;