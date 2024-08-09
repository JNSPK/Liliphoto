import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';
import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider} from 'react-router-dom';
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

const supabase = createClient(
  import.meta.env.VITE_API as string,
  import.meta.env.VITE_KEY as string
);

// const basename = '/Liliphoto';

const imageBg = [
  `./src/assets/img/Neck_Deep_32.jpg`,
  `./src/assets/img/OLN_02.jpg`,
  `./src/assets/img/Seaway_38.jpg`,
  `./src/assets/img/All_Time_Low_46.jpg`,
];

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
        </Routes>{' '}
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SessionContextProvider supabaseClient={supabase}>
    <Router basename='/'>
      <Layout />
    </Router>
  </SessionContextProvider>
);
