import { useEffect, useMemo, useState } from 'react';
import Login from './Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NavBar from './pages/NavBar';
import BrandLogo from './components/BrandLogo';
// ===== Import Sprint 1 components =====
import OccasionSelector from './components/sprint1/OccasionSelector';
import PricingDisplay from './components/sprint1/PricingDisplay';
import DeliveryChecker from './components/sprint1/DeliveryChecker';
import GreetingCard from './components/sprint1/GreetingCard';
import { apiUrl } from './api';
import './App.css';
import './FlowerShopTheme.css';

function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [page, setPage] = useState('home');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [globalMessage, setGlobalMessage] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(true);

  // ===== Sprint 1 new state =====
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSprint1Features, setShowSprint1Features] = useState(false);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  async function fetchProducts() {
    try {
      setLoadingProducts(true);
      const res = await fetch(apiUrl('/products'));
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load products');
      setProducts(data);
      setFilteredProducts(data);
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
      setPage('orders');
      fetchOrders(user.username);
    } catch (error) {
      setGlobalMessage(error.message);
    }
  }

  function handleLogout() {
    setUser(null);
    setPage('home');
    setCart([]);
    setOrders([]);
    setGlobalMessage('Logged out successfully');
  }

  // ===== Sprint 1 filter function =====
  async function handleFilterByOccasion(occasion) {
    setSelectedOccasion(occasion);
    try {
      const res = await fetch(apiUrl(`/products/filter?occasion=${occasion}`));
      const data = await res.json();
      setFilteredProducts(data);
    } catch (error) {
      console.error('Filter error:', error);
    }
  }

  return (
    <div className="shop-shell">
      <header className="hero-banner">
        <div className="hero-content">
          <BrandLogo />
          <h1>Urban Flower E-Commerce</h1>
          <p>Same-day delivery, seasonal custom bouquets, and corporate gifting.</p>
          {/* ===== Sprint 1 toggle button ===== */}
          {user && (
            <button 
              onClick={() => setShowSprint1Features(!showSprint1Features)}
              style={{
                padding: '10px',
                marginTop: '10px',
                background: showSprint1Features ? '#4CAF50' : '#f0f0f0',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {showSprint1Features ? 'Hide Sprint 1 Features' : 'Show Sprint 1 Features'}
            </button>
          )}
        </div>
      </header>

      {!user ? (
        <main className="auth-layout">
          <section className="auth-card-wrap">
            {authMode === 'login' ? (
              <Login
                onLogin={(loginUser) => {
                  setUser(loginUser);
                  setGlobalMessage(`Welcome back, ${loginUser.username}`);
                }}
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
              onClick={() => setAuthMode((prev) => (prev === 'login' ? 'register' : 'login'))}
            >
              {authMode === 'login' ? "Don't have an account? Register" : 'Already have an account? Log in'}
            </button>
          </section>
          <Home
            products={products.slice(0, 3)}
            loading={loadingProducts}
            onAddToCart={null}
            readonly
          />
        </main>
      ) : (
        <>
          <NavBar
            loginUser={user.username}
            onLogout={handleLogout}
            onNav={setPage}
            currentPage={page}
            cartCount={cartCount}
          />
          
          {/* ===== Sprint 1 Features Panel ===== */}
          {showSprint1Features && (
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '25px',
              margin: '20px',
              borderRadius: '15px',
              color: 'white',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <h2 style={{margin: '0 0 20px 0', textAlign: 'center'}}>📋 Sprint 1 Features (10/10 Completed)</h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '15px'
              }}>
                
                {/* SCRUM-8: Occasion Selection */}
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: '10px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                    <span style={{background: '#4CAF50', width: '20px', height: '20px', borderRadius: '50%'}}></span>
                    <strong>SCRUM-8: Occasion Selection</strong>
                  </div>
                  <OccasionSelector onSelect={handleFilterByOccasion} />
                </div>

                {/* SCRUM-9: Filter by Style */}
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: '10px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                    <span style={{background: '#4CAF50', width: '20px', height: '20px', borderRadius: '50%'}}></span>
                    <strong>SCRUM-9: Filter by Style</strong>
                  </div>
                  <button 
                    style={{margin: '5px', padding: '8px', background: 'white', border: 'none', borderRadius: '5px'}}
                    onClick={async () => {
                      const res = await fetch('http://localhost:3000/api/products/filter?style=Romantic');
                      const data = await res.json();
                      alert(`Found ${data.data.length} Romantic style products`);
                    }}
                  >Romantic</button>
                  <button 
                    style={{margin: '5px', padding: '8px', background: 'white', border: 'none', borderRadius: '5px'}}
                    onClick={async () => {
                      const res = await fetch('http://localhost:3000/api/products/filter?mood=Happy');
                      const data = await res.json();
                      alert(`Found ${data.data.length} Happy mood products`);
                    }}
                  >Happy</button>
                </div>

                {/* SCRUM-13: Price Breakdown */}
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: '10px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                    <span style={{background: '#4CAF50', width: '20px', height: '20px', borderRadius: '50%'}}></span>
                    <strong>SCRUM-13: Price Breakdown</strong>
                  </div>
                  <PricingDisplay productId={products[0]?.id} />
                </div>

                {/* SCRUM-14: Delivery Date */}
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: '10px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                    <span style={{background: '#4CAF50', width: '20px', height: '20px', borderRadius: '50%'}}></span>
                    <strong>SCRUM-14: Delivery Date</strong>
                  </div>
                  <DeliveryChecker productId={products[0]?.id} />
                </div>

                {/* SCRUM-18: Greeting Card */}
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: '10px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                    <span style={{background: '#4CAF50', width: '20px', height: '20px', borderRadius: '50%'}}></span>
                    <strong>SCRUM-18: Greeting Card</strong>
                  </div>
                  <GreetingCard />
                </div>

                {/* SCRUM-19: Optional Gifts -yan*/}
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: '10px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                    <span style={{background: '#4CAF50', width: '20px', height: '20px', borderRadius: '50%'}}></span>
                    <strong>SCRUM-19: Optional Gifts</strong>
                  </div>
                  <button 
                    style={{margin: '5px', padding: '8px', background: 'white', border: 'none', borderRadius: '5px'}}
                    onClick={async () => {
                      const res = await fetch(apiUrl('/add-gift'), {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({productId: 1, giftId: 1})
                      });
                      const data = await res.json();
                      setGlobalMessage(data.data.message);
                    }}
                  >+Chocolate ¥88</button>
                  <button 
                    style={{margin: '5px', padding: '8px', background: 'white', border: 'none', borderRadius: '5px'}}
                    onClick={async () => {
                      const res = await fetch(apiUrl('/add-gift'), {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({productId: 1, giftId: 2})
                      });
                      const data = await res.json();
                      setGlobalMessage(data.data.message);
                    }}
                  >+Teddy Bear ¥129</button>
                </div>

                {/* SCRUM-23: Shopping Cart - Existing -yan */}
                <div style={{background: 'rgba(76, 175, 80, 0.3)', padding: '15px', borderRadius: '10px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                    <span style={{background: '#4CAF50', width: '20px', height: '20px', borderRadius: '50%'}}></span>
                    <strong>SCRUM-23: Shopping Cart</strong>
                  </div>
                  <div>Items: {cartCount}</div>
                  <button 
                    style={{marginTop: '10px', padding: '8px', background: 'white', border: 'none', borderRadius: '5px'}}
                    onClick={() => setPage('cart')}
                  >View Cart</button>
                </div>

                {/* SCRUM-24: Delivery Info - Existing -yan*/}
                <div style={{background: 'rgba(76, 175, 80, 0.3)', padding: '15px', borderRadius: '10px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                    <span style={{background: '#4CAF50', width: '20px', height: '20px', borderRadius: '50%'}}></span>
                    <strong>SCRUM-24: Delivery Info</strong>
                  </div>
                  <div>Fill at checkout</div>
                </div>

                {/* SCRUM-28: Order Tracking - Existing -yan*/}
                <div style={{background: 'rgba(7, 11, 7, 0.3)', padding: '15px', borderRadius: '10px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                    <span style={{background: '#4CAF50', width: '20px', height: '20px', borderRadius: '50%'}}></span>
                    <strong>SCRUM-28: Order Tracking</strong>
                  </div>
                  <button 
                    style={{padding: '8px', background: 'white', border: 'none', borderRadius: '5px'}}
                    onClick={() => setPage('orders')}
                  >View My Orders</button>
                </div>

                {/* SCRUM-29: Notifications - Existing -yan*/}
                <div style={{background: 'rgba(76, 175, 80, 0.3)', padding: '15px', borderRadius: '10px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                    <span style={{background: '#4CAF50', width: '20px', height: '20px', borderRadius: '50%'}}></span>
                    <strong>SCRUM-29: Notifications</strong>
                  </div>
                  <div>{globalMessage || 'No new notifications'}</div>
                </div>

              </div>
            </div>
          )}

          <main className="page-main">
            {page === 'home' && (
              <Home
                products={showSprint1Features ? filteredProducts : products}
                loading={loadingProducts}
                onAddToCart={handleAddToCart}
              />
            )}
            {page === 'cart' && (
              <Cart
                cart={cart}
                onCheckout={handleCheckout}
                onRemove={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            )}
            {page === 'orders' && (
              <section className="panel orders-panel">
                <h2>My Orders</h2>
                {orders.length === 0 && <p>No orders yet. Start shopping from the home page.</p>}
                {orders.map((order) => (
                  <article key={order.id} className="order-item">
                    <div>
                      <strong>Order #{order.id}</strong>
                      <span className="order-status">{order.status}</span>
                    </div>
                    <p>Total: ¥{Number(order.totalAmount).toFixed(2)}</p>
                    <p>Address: {order.deliveryAddress}</p>
                    <p>Time: {new Date(order.createdAt).toLocaleString()}</p>
                  </article>
                ))}
              </section>
            )}
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