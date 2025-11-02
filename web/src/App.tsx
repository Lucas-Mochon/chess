import React, { useEffect } from 'react';
import AppNavigator from './app/navigation/AppNavigator';
import { ThemeProvider } from './app/contexts/ThemeContext';

const App: React.FC = () => {
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('submenu-root')) {
      const div = document.createElement('div');
      div.id = 'submenu-root';
      div.style.position = 'absolute';
      div.style.top = '0';
      div.style.left = '0';
      div.style.zIndex = '9999';
      document.body.appendChild(div);
    }
  }, []);

  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;