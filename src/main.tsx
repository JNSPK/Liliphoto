import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';
import ReactDOM from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import Error404 from './pages/404';
import Admin from './pages/admin';

const supabase = createClient(
  import.meta.env.VITE_API as string,
  import.meta.env.VITE_KEY as string
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SessionContextProvider supabaseClient={supabase}>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  </SessionContextProvider>
);
