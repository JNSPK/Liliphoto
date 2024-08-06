import { useLocation } from 'react-router-dom';
import Header from './header';
import HeaderAdmin from './headerAdminPanel';

const AppHeader = () => {
  const location = useLocation(); // Récupérez l'emplacement actuel

  // Vérifiez si le chemin actuel est '/admin'
  const isAdminPath = location.pathname === '/admin';

  // Affichez l'en-tête en fonction du chemin
  return isAdminPath ? <HeaderAdmin children /> : <Header />;
};

export default AppHeader;
