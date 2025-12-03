import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand" aria-label="Nutty Narrows Thrift Shop home">
          <LogoMark />
          <div className="brand-text">
            <span className="brand-name">Nutty Narrows</span>
            <span className="brand-tagline">Thrift Shop</span>
          </div>
        </NavLink>
        <nav aria-label="Main navigation">
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                Contact & Location
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
