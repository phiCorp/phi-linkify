import './assets/styles/neo.all.css';
import './assets/styles/neo-ui.input.css';
import './assets/styles/neo-ui.button.css';
import './assets/styles/style.css';
import './assets/styles/fonts.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import MainContent from './components/layouts/MainContent';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

function App() {
  const version = '1.0.0';
  const domain = 'https://phly.ir';
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('neoTheme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
    }
  }, []);

  const handleThemeChange = (isDark) => {
    setIsDarkTheme(isDark);
  };

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: isDarkTheme ? '#333' : '#fff',
            color: isDarkTheme ? '#fff' : '#333',
            border: isDarkTheme ? '1px solid #444' : '1px solid #eee',
          },
        }}
      />
      <Header onThemeChange={handleThemeChange} domain={domain} />
      <MainContent domain={domain} />
      <Footer version={version} domain={domain} isDarkTheme={isDarkTheme} />
    </>
  );
}

export default App;
