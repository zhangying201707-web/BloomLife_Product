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
          Shop
        </button>
        <button
          className={currentPage === 'cart' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNav('cart')}
        >
          Checkout ({cartCount})
        </button>
        <button
          className={currentPage === 'orders' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNav('orders')}
        >
          Orders
        </button>
        <button
          className={currentPage === 'inbox' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNav('inbox')}
        >
          Inbox
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
