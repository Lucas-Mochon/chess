export const mainMenu = [
    { key: 'play', label: 'Jouer', image: 'assets/images/sidebar-icons/pawn.png' },
    { key: 'puzzles', label: 'Problèmes', image: 'assets/images/sidebar-icons/puzzle.png' },
    { key: 'learn', label: 'Apprendre', image: 'assets/images/sidebar-icons/lessons.png' },
    { key: 'watch', label: 'Regarder', image: 'assets/images/sidebar-icons/binocular.png' },
    { key: 'news', label: 'Infos', image: 'assets/images/sidebar-icons/article.png' },
    { key: 'social', label: 'Social', image: 'assets/images/sidebar-icons/friends.png' },
    { key: 'more', label: 'Plus', icon: 'MdMoreHoriz' },
];

export const subMenus: Record<string, { label: string; icon?: string, image?: string }[]> = {
    play: [
        { label: 'Jouer', image: 'assets/images/sidebar-icons/pawn.png' },
        { label: 'Jouer contre des robots', icon: 'MdOutlineSmartToy' },
        { label: "Jouer avec l’entraîneur", icon: 'MdOutlinePerson' },
        { label: 'Tournois', icon: 'MdEmojiEvents' },
        { label: 'Classement', icon: 'MdBarChart' },
        { label: 'Historique des parties', icon: 'MdHistory' },
    ],
    puzzles: [
        { label: 'Problèmes', image: 'assets/images/sidebar-icons/puzzle.png' },
        { label: 'Sprint de problèmes', icon: 'MdDirectionsRun', image: 'assets/images/game-mode/problem-sprint.png' },
        { label: 'Bataille de problèmes', icon: 'MdOutlineGavel', image: 'assets/images/game-mode/duel.png' },
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