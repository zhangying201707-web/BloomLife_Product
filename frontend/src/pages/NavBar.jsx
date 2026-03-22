import BrandLogo from '../components/BrandLogo';
import { NavLink } from 'react-router-dom';

export default function NavBar({ loginUser, onLogout, currentPage, cartCount, isAdmin }) {
  const linkClass = (path) =>
    currentPage === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className="top-nav">
      <div className="nav-brand">
        <BrandLogo compact />
      </div>
      <div className="nav-links">
        <NavLink className={linkClass('/product')} to="/product">
          Shop
        </NavLink>
        <NavLink className={linkClass('/checkout')} to="/checkout">
          Checkout ({cartCount})
        </NavLink>
        <NavLink className={linkClass('/orders')} to="/orders">
          Orders
        </NavLink>
        <NavLink className={linkClass('/inbox')} to="/inbox">
          Inbox
        </NavLink>
        {isAdmin && (
          <NavLink className={linkClass('/admin')} to="/admin">
            Admin
          </NavLink>
        )}
      </div>
      <div className="nav-user">
        <span>{loginUser}</span>
        <button className="ghost-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
