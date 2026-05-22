import { useEffect } from 'react';
import LandingPage from './components/LandingPage';
import CursorGlow from './components/CursorGlow';

function App() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    const root = document.getElementById('root');
    document.documentElement.style.height = 'auto';
    document.documentElement.style.minHeight = '100dvh';
    document.body.style.height = 'auto';
    document.body.style.minHeight = '100dvh';
    if (root) { root.style.height = 'auto'; root.style.minHeight = '100dvh'; }
  }, []);

  return (
    <>
      <CursorGlow />
      <div className="min-h-[100dvh]">
        <LandingPage onApply={() => { window.location.href = '/apply'; }} />
      </div>
    </>
  );
}

export default App;
