import React, { useEffect } from 'react';
import AppNavigator from './app/navigation/AppNavigator';
import { ThemeProvider } from './app/contexts/ThemeContext';

const App: React.FC = () => {
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('submenu-root')) {
      document.title = "ChessCom";
      const div = document.createElement('div');
      div.id = 'submenu-root';
      div.style.position = 'absolute';
      div.style.top = '0';
      div.style.left = '0';
      div.style.zIndex = '9999';
      document.body.appendChild(div);
    }
        const favicon = document.querySelector("link[rel='icon']");

    if (favicon) {
      favicon.setAttribute("href", "/assets/images/sidebar-icons/pawn.png");
    } else {
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.href = "/assets/images/chess-pieces.png";
      document.head.appendChild(newFavicon);
    }
  }, []);

  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;