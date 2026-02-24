import BrandLogo from '../components/BrandLogo';

export default function NavBar({ loginUser, onLogout, onNav, currentPage, cartCount }) {
  return (
    <nav className="top-nav">
      <div className="nav-brand">
        <BrandLogo compact />
      </div>
      <div className="nav-links">
        <button
          className={currentPage === 'home' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNav('home')}
        >
          Home
        </button>
        <button
          className={currentPage === 'cart' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNav('cart')}
        >
          Cart ({cartCount})
        </button>
        <button
          className={currentPage === 'orders' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNav('orders')}
        >
          My Orders
        </button>
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
