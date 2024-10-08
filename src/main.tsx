import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';
import ReactDOM from 'react-dom/client';
import {
  Route,
  HashRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';
import Home from './Home';
import AppHeader from './components/appHeader';
import HeroBanner from './components/hero';
import './index.css';
import Error404 from './pages/404';
import About from './pages/about';
import Admin from './pages/admin';
import bg1 from '/src/assets/img/Neck_Deep_32.jpg';
import bg2 from '/src/assets/img/OLN_02.jpg';
import bg3 from '/src/assets/img/Seaway_38.jpg';

const supabase = createClient(
  import.meta.env.VITE_API as string,
  import.meta.env.VITE_KEY as string
);

const imageBg = [`${bg1}`, `${bg2}`, `${bg3}`];

function randomBg() {
  const randomIndex = Math.floor(Math.random() * imageBg.length);
  return imageBg[randomIndex];
}

export function Layout() {
  const location = useLocation();

  return (
    <>
      <div className='min-h-min w-full'>
        {location.pathname === '/' && <HeroBanner src={randomBg()} />}
        <AppHeader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='*' element={<Error404 />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SessionContextProvider supabaseClient={supabase}>
    <Router basename={'/'}>
      <Layout />
    </Router>
  </SessionContextProvider>
);
