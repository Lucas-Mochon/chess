export const mainMenu = [
    { key: 'play', label: 'Jouer', icon: 'chess-knight' },
    { key: 'puzzles', label: 'Problèmes', icon: 'puzzle-outline' },
    { key: 'learn', label: 'Apprendre', icon: 'school-outline' },
    { key: 'watch', label: 'Regarder', icon: 'video-outline' },
    { key: 'news', label: 'Infos', icon: 'newspaper-variant-outline' },
    { key: 'social', label: 'Social', icon: 'account-group-outline' },
    { key: 'more', label: 'Plus', icon: 'dots-horizontal' },
];

export const subMenus: Record<string, { label: string; icon: string }[]> = {
    play: [
        { label: 'Jouer contre des robots', icon: 'robot-outline' },
        { label: "Jouer avec l’entraîneur", icon: 'account-tie-outline' },
        { label: 'Tournois', icon: 'trophy-outline' },
        { label: 'Classement', icon: 'chart-bar' },
        { label: 'Historique des parties', icon: 'history' },
    ],
    puzzles: [
        { label: 'Sprint de problèmes', icon: 'run-fast' },
        { label: 'Bataille de problèmes', icon: 'sword-cross' },
        { label: 'Problème du jour', icon: 'calendar' },
    ],
    learn: [
        { label: 'Leçons', icon: 'book-outline' },
        { label: 'Cours', icon: 'school-outline' },
        { label: 'Ouvertures', icon: 'chess-bishop' },
        { label: 'Analyse', icon: 'chart-line' },
    ],
    watch: [
        { label: 'Événements', icon: 'calendar-star' },
        { label: 'ChessTV', icon: 'television-classic' },
        { label: 'Diffuseurs', icon: 'broadcast' },
    ],
    news: [
        { label: 'Chess Today', icon: 'newspaper' },
        { label: 'Articles', icon: 'file-document-outline' },
        { label: 'Classements', icon: 'crown-outline' },
    ],
    social: [
        { label: 'Amis', icon: 'account-outline' },
        { label: 'Clubs', icon: 'account-group' },
        { label: 'Forums', icon: 'forum-outline' },
    ],
    more: [
        { label: 'Ouvertures', icon: 'book-open-outline' },
        { label: 'Boutique', icon: 'shopping-outline' },
        { label: 'Outils', icon: 'wrench-outline' },
    ],
};