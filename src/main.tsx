import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';
import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import Home from './Home';
import AppHeader from './components/appHeader';
import './index.css';
import Error404 from './pages/404';
import About from './pages/about';
import Admin from './pages/admin';

const supabase = createClient(
  import.meta.env.VITE_API as string,
  import.meta.env.VITE_KEY as string
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SessionContextProvider supabaseClient={supabase}>
    <Router basename='/'>
      <AppHeader />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='*' element={<Error404 />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
  </SessionContextProvider>
);
