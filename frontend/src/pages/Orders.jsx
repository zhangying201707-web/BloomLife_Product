import { useEffect, useState } from 'react';
import AvailabilityCard from '../features/customerJourney/components/AvailabilityCard';
import OrderTracker from '../features/customerJourney/components/OrderTracker';
import SubscriptionSupportCard from '../features/customerJourney/components/SubscriptionSupportCard';
import {
  getFavoriteProducts,
  getOrderHistory,
  reorderPreviousPurchase,
  saveFavoriteProduct,
} from '../features/customerJourney/api';

export default function Orders({ orders, onMessage, user }) {
  const [history, setHistory] = useState(orders);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  async function refreshHistory() {
    if (!user?.username) return;
    setLoading(true);
    try {
      const data = await getOrderHistory(user.username);
      setHistory(data.data || []);
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function refreshFavorites() {
    if (!user?.userId) return;
    try {
      const data = await getFavoriteProducts(user.userId);
      setFavorites(data.data || []);
    } catch (error) {
      onMessage?.(error.message);
    }
  }

  useEffect(() => {
    setHistory(orders);
  }, [orders]);

  useEffect(() => {
    refreshHistory();
    refreshFavorites();
  }, [user?.username, user?.userId]);

  async function handleReorder(orderId) {
    if (!user?.username) return;
    setLoading(true);
    try {
      await reorderPreviousPurchase(orderId, user.username);
      onMessage?.(`Reordered from #${orderId}`);
      await refreshHistory();
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleFavorite(order) {
    const items = Array.isArray(order.items) ? order.items : [];
    if (items.length === 0) {
      onMessage?.('No products found in this order to favorite');
      return;
    }

    try {
      const saved = [];
      for (const item of items) {
        await saveFavoriteProduct({
          userId: user?.userId,
          productId: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
        });
        saved.push(item.name);
      }
      onMessage?.(`Saved ${saved.length} product(s) to favorites`);
      await refreshFavorites();
    } catch (error) {
      onMessage?.(error.message);
    }
  }

  return (
    <section className="panel orders-panel">
      <div className="section-title-row">
        <h2>Orders</h2>
        <p>Track delivery progress and check serviceability by ZIP code</p>
      </div>

      <div className="order-layout">
        <div className="order-main-column">
          <div className="embedded-section">
            <div className="section-title-row embedded-title-row">
              <div>
                <h3>Recent Orders</h3>
                <p>Review history, then track the latest shipment when you need an update.</p>
              </div>
              <button className="ghost-btn inline-btn" onClick={refreshHistory} disabled={loading}>
                {loading ? 'Loading...' : 'Reload History'}
              </button>
            </div>
            {history.length === 0 && <p>No orders yet. Start shopping from the shop page.</p>}
            {history.map((order) => (
              <article key={order.id} className="order-item">
                <div>
                  <strong>Order #{order.id}</strong>
                  <span className="order-status">{order.status}</span>
                </div>
                <p>Total: ¥{Number(order.totalAmount).toFixed(2)}</p>
                <p>Address: {order.deliveryAddress}</p>
                <p>Time: {new Date(order.createdAt).toLocaleString()}</p>
                <div className="product-actions">
                  <button className="ghost-btn inline-btn" onClick={() => handleReorder(order.id)} disabled={loading}>
                    Reorder
                  </button>
                  <button className="ghost-btn inline-btn" onClick={() => handleFavorite(order)}>
                    Save Favorite Product
                  </button>
                </div>
              </article>
            ))}

            {favorites.length > 0 && (
              <div className="journey-list">
                <p className="hint-text">Saved favorite products</p>
                {favorites.slice(0, 4).map((product) => (
                  <p key={`${product.id}-${product.savedAt || product.name}`}>
                    <strong>{product.name}</strong> - ¥{Number(product.price).toFixed(2)}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="embedded-section">
            <div className="section-title-row embedded-title-row">
              <div>
                <h3>Tracking & Availability</h3>
                <p>Track a specific order and confirm whether a ZIP code is currently serviceable.</p>
              </div>
            </div>
            <div className="embedded-toolbar-grid">
              <OrderTracker onMessage={onMessage} />
              <AvailabilityCard productId={1} onMessage={onMessage} />
            </div>
          </div>
        </div>

        <aside className="order-side-column">
          <div className="embedded-section">
            <div className="section-title-row embedded-title-row">
              <div>
                <h3>Keep Fresh Flowers Coming</h3>
                <p>Subscription and support live beside your order history, where users naturally look for help.</p>
              </div>
            </div>
            <SubscriptionSupportCard userId={user?.userId} onMessage={onMessage} />
          </div>
        </aside>
      </div>
    </section>
  );
}
