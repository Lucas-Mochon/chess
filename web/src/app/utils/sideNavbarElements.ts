export const mainMenu = [
    { key: 'play', label: 'Jouer', icon: 'MdOutlineSportsEsports' },
    { key: 'puzzles', label: 'Problèmes', icon: 'MdOutlineExtension' },
    { key: 'learn', label: 'Apprendre', icon: 'MdOutlineSchool' },
    { key: 'watch', label: 'Regarder', icon: 'MdOutlineOndemandVideo' },
    { key: 'news', label: 'Infos', icon: 'MdOutlineNewspaper' },
    { key: 'social', label: 'Social', icon: 'MdOutlineGroups' },
    { key: 'more', label: 'Plus', icon: 'MdMoreHoriz' },
];

export const subMenus: Record<string, { label: string; icon: string }[]> = {
    play: [
        { label: 'Jouer contre des robots', icon: 'MdOutlineSmartToy' },
        { label: "Jouer avec l’entraîneur", icon: 'MdOutlinePerson' },
        { label: 'Tournois', icon: 'MdEmojiEvents' },
        { label: 'Classement', icon: 'MdBarChart' },
        { label: 'Historique des parties', icon: 'MdHistory' },
    ],
    puzzles: [
        { label: 'Sprint de problèmes', icon: 'MdDirectionsRun' },
        { label: 'Bataille de problèmes', icon: 'MdOutlineGavel' },
        { label: 'Problème du jour', icon: 'MdOutlineCalendarToday' },
    ],
    learn: [
        { label: 'Leçons', icon: 'MdMenuBook' },
        { label: 'Cours', icon: 'MdOutlineSchool' },
        { label: 'Ouvertures', icon: 'MdOutlineEmojiObjects' },
        { label: 'Analyse', icon: 'MdShowChart' },
    ],
    watch: [
        { label: 'Événements', icon: 'MdEvent' },
        { label: 'ChessTV', icon: 'MdOutlineTv' },
        { label: 'Diffuseurs', icon: 'MdOutlineCast' },
    ],
    news: [
        { label: 'Chess Today', icon: 'MdOutlineNewspaper' },
        { label: 'Articles', icon: 'MdDescription' },
        { label: 'Classements', icon: 'MdOutlineEmojiEvents' },
    ],
    social: [
        { label: 'Amis', icon: 'MdOutlinePerson' },
        { label: 'Clubs', icon: 'MdGroups' },
        { label: 'Forums', icon: 'MdForum' },
    ],
    more: [
        { label: 'Ouvertures', icon: 'MdMenuBook' },
        { label: 'Boutique', icon: 'MdOutlineShoppingCart' },
        { label: 'Outils', icon: 'MdBuild' },
    ],
};