import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Inbox from './pages/Inbox';
import Admin from './pages/Admin';
import NavBar from './pages/NavBar';
import BrandLogo from './components/BrandLogo';
import { apiUrl } from './api';
import './App.css';
import './FlowerShopTheme.css';

function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [globalMessage, setGlobalMessage] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const currentProducts = filteredProducts ?? products;

  async function fetchProducts() {
    try {
      setLoadingProducts(true);
      const res = await fetch(apiUrl('/products'));
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load products');
      setProducts(data);
      setFilteredProducts(null);
    } catch (error) {
      setGlobalMessage(error.message);
    } finally {
      setLoadingProducts(false);
    }
  }

  async function fetchOrders(username) {
    if (!username) return;
    try {
      const res = await fetch(apiUrl(`/orders?username=${encodeURIComponent(username)}`));
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load orders');
      setOrders(data);
    } catch (error) {
      setGlobalMessage(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user?.username) fetchOrders(user.username);
  }, [user]);

  function handleAddToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setGlobalMessage(`Added to cart: ${product.name}`);
  }

  function handleRemoveFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function handleUpdateQuantity(productId, quantity) {
    if (quantity <= 0) return;
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  }

  async function handleCheckout(deliveryAddress, note) {
    if (!user?.username) return;
    try {
      const res = await fetch(apiUrl('/orders'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user.username,
          items: cart,
          deliveryAddress,
          note,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to place order');

      setCart([]);
      setGlobalMessage(`Order placed successfully. Order #${data.orderId}`);
      navigate('/orders');
      fetchOrders(user.username);
    } catch (error) {
      setGlobalMessage(error.message);
    }
  }

  function handleLogout() {
    setUser(null);
    setAuthMode('login');
    navigate('/');
    setCart([]);
    setOrders([]);
    setFilteredProducts(null);
    setGlobalMessage('Logged out successfully');
  }

  return (
    <div className="shop-shell">
      <header className="hero-banner">
        <div className="hero-content">
          <BrandLogo />
          <h1>Urban Flower E-Commerce</h1>
          <p>Same-day delivery, seasonal custom bouquets, and corporate gifting.</p>
        </div>
      </header>

      {!user ? (
        <main className="auth-layout">
          <section className="auth-card-wrap">
            {authMode === 'login' ? (
              <Login
                onLogin={(loginUser) => {
                  setUser(loginUser);
                  setFilteredProducts(null);
                  setGlobalMessage(`Welcome back, ${loginUser.username}`);
                  navigate(loginUser.role === 'admin' ? '/admin' : '/product');
                }}
                onAdminMode={() => setAuthMode('admin')}
              />
            ) : authMode === 'admin' ? (
              <AdminLogin
                onLogin={(loginUser) => {
                  setUser(loginUser);
                  setFilteredProducts(null);
                  setGlobalMessage(`Admin access granted: ${loginUser.username}`);
                  navigate('/admin');
                }}
                onBack={() => setAuthMode('login')}
              />
            ) : (
              <Register
                onRegister={() => {
                  setAuthMode('login');
                  setGlobalMessage('Registration successful. Please log in.');
                }}
              />
            )}
            <button
              className="ghost-btn"
              onClick={() =>
                setAuthMode((prev) => {
                  if (prev === 'register') return 'login';
                  return 'register';
                })
              }
            >
              {authMode === 'register'
                ? 'Already have an account? Log in'
                : authMode === 'login'
                ? "Don't have an account? Register"
                : 'Need a customer account? Register'}
            </button>
          </section>
          <Home products={products.slice(0, 3)} loading={loadingProducts} onAddToCart={null} readonly />
        </main>
      ) : (
        <>
          <NavBar
            loginUser={user.username}
            onLogout={handleLogout}
            currentPage={currentPage}
            cartCount={cartCount}
            isAdmin={user?.role === 'admin'}
          />

          <main className="page-main">
            <Routes>
              <Route path="/" element={<Navigate to="/product" replace />} />
              <Route
                path="/product"
                element={
                  <Home
                    products={currentProducts}
                    allProducts={products}
                    loading={loadingProducts}
                    onAddToCart={handleAddToCart}
                    onFilteredProducts={setFilteredProducts}
                    onMessage={setGlobalMessage}
                  />
                }
              />
              <Route
                path="/checkout"
                element={
                  <Cart
                    cart={cart}
                    onCheckout={handleCheckout}
                    onRemove={handleRemoveFromCart}
                    onUpdateQuantity={handleUpdateQuantity}
                    userId={user?.userId}
                    onMessage={setGlobalMessage}
                  />
                }
              />
              <Route
                path="/orders"
                element={<Orders orders={orders} user={user} onMessage={setGlobalMessage} />}
              />
              <Route path="/inbox" element={<Inbox user={user} onMessage={setGlobalMessage} />} />
              <Route
                path="/admin"
                element={user?.role === 'admin' ? <Admin onMessage={setGlobalMessage} /> : <Navigate to="/product" replace />}
              />
              <Route path="*" element={<Navigate to="/product" replace />} />
            </Routes>
          </main>
        </>
      )}

      {globalMessage && (
        <div className="toast-message" onAnimationEnd={() => setGlobalMessage('')}>
          {globalMessage}
        </div>
      )}
    </div>
  );
}

export default App;
