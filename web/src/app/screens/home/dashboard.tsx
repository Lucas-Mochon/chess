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
import GamePannel from '../../components/GamePannel';
import GameHistoric from '../../components/GameHistoric';
import StatsCard from '../../components/StatsCard';
import DirectChess from '../../components/DirectChess';
import DailyProblemCard from '../../components/DailyProblemCard';

const Dashboard: React.FC = () => {
    const themedStyles = useThemedStyles();
    const leaveTimeoutRef = useRef<number | null>(null);
    const [activeLive, setActiveLive] = useState<boolean>(true);
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

    const handleCloseLive = () => {
        setActiveLive(false);
    }

    return (
        <div
            className={`container-fluid ${themedStyles.backgroundClass} ${themedStyles.textClass}`}
            style={{ ...themedStyles.inlineStyles }}
        >
            <div className='container mx-auto px-2 px-md-3 px-lg-4' style={{ maxWidth: '1500px' }}>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center py-3">
                    <div className="mb-3 mb-md-0">
                        <UserCard />
                    </div>
                    <div className='d-flex justify-content-between gap-3 gap-md-4'>
                        <div
                            className="position-relative"
                            onMouseEnter={() => handleMouseEnter('friends')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <FaUserFriends size={24} color="#81B64C" className="icon-hover" />
                            {activeMenu === 'friends' && (
                                <div></div>
                            )}
                        </div>
                        <div>
                            <a href='/' className='back-link text-decoration-none'>
                                <FaChessPawn size={24} className="icon-hover" />
                            </a>
                        </div>
                        <div
                            className="position-relative"
                            onMouseEnter={() => handleMouseEnter('mail')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <IoMail size={24} className="icon-hover" />
                            {activeMenu === 'mail' && (
                                <div></div>
                            )}
                        </div>
                        <div
                            className="position-relative"
                            onMouseEnter={() => handleMouseEnter('settings')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <FaGear size={24} className="icon-hover" />
                            {activeMenu === 'settings' && (
                                <DropdownMenu title='Paramètres' items={gearMenu} />
                            )}
                        </div>
                    </div>
                </div>

                <div className='row mt-2 gy-3'>
                    <div className="col-12 col-md-3 col-lg-3 mt-5">
                        <div className='mb-2'>
                            <DivisionCard />
                        </div>
                        <div className='mb-2'>
                            <CButton
                                text='Jouer en 10 min'
                                icon='CiStopwatch'
                                color='black'
                                iconColor='#81B64C'
                                size="large"
                            />
                        </div>
                        <div className='mb-2'>
                            <CButton
                                text='Nouvelle partie'
                                icon='FaChessPawn'
                                color='black'
                                size="large"
                            />
                        </div>
                        <div className='mb-2'>
                            <CButton
                                text='Jouer contre des robots'
                                icon='LiaRobotSolid'
                                color='black'
                                size="large"
                            />
                        </div>
                        <div className='mb-2'>
                            <CButton
                                text='Jouer avec un ami'
                                icon='FaHandshake'
                                color='black'
                                size="large"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-9 col-lg-9">
                        <div className="row g-3">
                            <div className="col-12 col-lg-4">
                                <div className="chess-card-wrapper">
                                    <ChessCard
                                        image="assets/images/logo/puzzles.png"
                                        altImage="puzzles"
                                        title="Problèmes"
                                        subTitle={rating}
                                        textButton='Résoudre le problème'
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-lg-4">
                                <div className="chess-card-wrapper">
                                    <ChessCard
                                        image="assets/images/logo/lessons.png"
                                        altImage="lessons"
                                        title="Leçon suivante"
                                        subTitle="Utiliser tout le potentiel de ses pièces :"
                                        textButton='Commencer la leçon'
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-lg-4">
                                <div className="chess-card-wrapper">
                                    <ChessCard
                                        image="assets/images/logo/gameReview.png"
                                        altImage="game review"
                                        title="Bilan de la partie"
                                        subTitle="Apprenez de vos erreurs"
                                        textButton='Bilan contre minsh69'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2 gy-3'>
                    <div className="col-12 col-md-9 col-lg-9 mt-5">
                        <div className='pb-5'>
                            <GamePannel title="Partie en différé" href="/" />
                        </div>
                        <div className='pb-5'>
                            <GameHistoric />
                        </div>
                    </div>
                    <div className="col-12 col-md-3 col-lg-3 mt-5">
                        {activeLive ? (
                            <div className='pb-5'>
                                <DirectChess action={handleCloseLive} />
                            </div>
                        ) : null}
                        <div className='pb-5'>
                            <StatsCard />
                        </div>
                        <div className='pb-5'>
                            <DailyProblemCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;