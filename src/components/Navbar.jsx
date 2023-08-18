import { Link } from 'react-router-dom';
import './Navbar.css';

import {
  faCirclePlus,
  faCircleCheck,
  faClipboardList,
  faBus,
  faDatabase,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navigationItems = [
  { path: '/roles', icon: faCirclePlus, label: 'Roles' },
  { path: '/',  icon: faBus, label: '' },
  { path: '/seleccionarrol', icon: faCircleCheck, label: 'Rol' },
  { path: '/reporte', icon: faClipboardList, label: 'Reporte' },
  { path: '/datos', icon: faDatabase, label: 'Datos' },
  { path: '/sonido', icon: faVolumeHigh, label: 'Sonido' },
];

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {navigationItems.map((item) => (
          <li className="nav-item" key={item.path}>
            <Link to={item.path} className="nav-link">
              <FontAwesomeIcon icon={item.icon} size="2x" style={{ fontSize: '24px' }}/> {/* Renderiza el icono de Font Awesome */} 
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;