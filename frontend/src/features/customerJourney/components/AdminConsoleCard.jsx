import { useEffect, useState } from 'react';
import {
  createAdminProduct,
  getAdminSubscriptions,
  getAdminOrders,
  getAdminProducts,
  getSalesAnalytics,
  updateAdminOrderStatus,
  updateAdminSubscriptionStatus,
  updateAdminProduct,
} from '../api';

const seedProduct = {
  name: 'Sprint 2 Demo Bouquet',
  description: 'Admin-created bouquet for sprint verification.',
  price: '199',
  image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80',
  category: 'Bouquet',
  stock: '20',
};

export default function AdminConsoleCard({ onMessage }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    try {
      const [productsRes, ordersRes, subscriptionsRes, analyticsRes] = await Promise.all([
        getAdminProducts(),
        getAdminOrders(),
        getAdminSubscriptions(),
        getSalesAnalytics(),
      ]);
      setProducts([...(productsRes.data || [])].sort((a, b) => Number(b.id) - Number(a.id)));
      setOrders(ordersRes.data || []);
      setSubscriptions(subscriptionsRes.data || []);
      setAnalytics(analyticsRes.data || null);
    } catch (error) {
      onMessage?.(error.message);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleCreateProduct() {
    setLoading(true);
    try {
      await createAdminProduct(seedProduct);
      onMessage?.('Admin product created');
      await refresh();
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRestock(productId, stock) {
    setLoading(true);
    try {
      await updateAdminProduct(productId, { stock: Number(stock || 0) + 5 });
      onMessage?.('Product inventory updated');
      await refresh();
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusUpdate(orderId) {
    setLoading(true);
    try {
      await updateAdminOrderStatus(orderId, 'out_for_delivery');
      onMessage?.('Order status updated');
      await refresh();
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubscriptionShipment(subscriptionId) {
    setLoading(true);
    try {
      await updateAdminSubscriptionStatus(subscriptionId, 'dispatched');
      onMessage?.('Subscription shipment updated');
      await refresh();
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>Admin Console</h3>
      <div className="journey-actions">
        <button className="primary-btn" onClick={handleCreateProduct} disabled={loading}>
          Create Demo Product
        </button>
        <button className="ghost-btn" onClick={refresh} disabled={loading}>
          Refresh Admin Data
        </button>
      </div>
      <div className="journey-list">
        {products.slice(0, 3).map((product) => (
          <div key={product.id} className="journey-list-row">
            <span>
              <strong>{product.name}</strong>: stock {product.stock}
            </span>{' '}
            <button className="ghost-btn inline-btn" onClick={() => handleRestock(product.id, product.stock)}>
              +5 Stock
            </button>
          </div>
        ))}
        {orders.length === 0 && <p>No orders yet for admin review.</p>}
        {orders.slice(0, 2).map((order) => (
          <div key={order.id} className="journey-list-row">
            <span>Order #{order.id} status: {order.status}</span>{' '}
            <button className="ghost-btn inline-btn" onClick={() => handleStatusUpdate(order.id)}>
              Mark Out for Delivery
            </button>
          </div>
        ))}
        {subscriptions.length === 0 && <p>No subscription shipments queued yet.</p>}
        {subscriptions.slice(0, 2).map((subscription) => (
          <div key={subscription.id} className="journey-list-row">
            <span>
              Subscription #{subscription.id}: {subscription.nextTheme} ({subscription.shipmentStatus})
            </span>{' '}
            <button
              className="ghost-btn inline-btn"
              onClick={() => handleSubscriptionShipment(subscription.id)}
            >
              Dispatch Shipment
            </button>
          </div>
        ))}
        {analytics && (
          <>
            <p>
              <strong>Total revenue:</strong> ¥{Number(analytics.totalRevenue || 0).toFixed(2)}
            </p>
            <p>
              <strong>Subscriptions:</strong> {analytics.activeSubscriptions}/{analytics.totalSubscriptions} active
            </p>
            {(analytics.topProducts || []).map((item) => (
              <p key={item.name}>
                <strong>{item.name}</strong>: {item.units} sold / ¥{Number(item.revenue).toFixed(2)}
              </p>
            ))}
          </>
        )}
      </div>
    </article>
  );
}
