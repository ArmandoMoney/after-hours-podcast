import { useState, useCallback, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import SimpleLandingHero from './components/SimpleLandingHero';
import Questionnaire from './components/Questionnaire';
import ThankYou from './components/ThankYou';
import CursorGlow from './components/CursorGlow';

const FULL_LANDING = true;

type Stage = 'landing' | 'questionnaire' | 'thankyou';

function App() {
  const [stage, setStage] = useState<Stage>('landing');
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('apply') === 'true') {
      setStage('questionnaire');
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const goTo = useCallback((next: Stage) => {
    setTransitioning(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      setStage(next);
      setTransitioning(false);
    }, 300);
  }, []);

  useEffect(() => {
    const root = document.getElementById('root');
    if (stage === 'landing' && FULL_LANDING) {
      document.documentElement.style.height = 'auto';
      document.documentElement.style.minHeight = '100dvh';
      document.body.style.height = 'auto';
      document.body.style.minHeight = '100dvh';
      if (root) { root.style.height = 'auto'; root.style.minHeight = '100dvh'; }
    } else {
      document.documentElement.style.height = '';
      document.documentElement.style.minHeight = '';
      document.body.style.height = '';
      document.body.style.minHeight = '';
      if (root) { root.style.height = ''; root.style.minHeight = ''; }
    }
  }, [stage]);

  const isLanding = stage === 'landing';

  return (
    <>
      <CursorGlow />
      <div
        className={`transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'} ${
          isLanding ? 'min-h-[100dvh]' : 'h-full overflow-hidden'
        }`}
      >
        {stage === 'landing' && (FULL_LANDING ? <LandingPage onApply={() => goTo('questionnaire')} /> : <SimpleLandingHero onApply={() => goTo('questionnaire')} />)}
        {stage === 'questionnaire' && <Questionnaire onComplete={() => goTo('thankyou')} onBack={() => goTo('landing')} />}
        {stage === 'thankyou' && <ThankYou onReturn={() => goTo('landing')} />}
      </div>
    </>
  );
}

export default App;
