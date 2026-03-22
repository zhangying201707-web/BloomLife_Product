import { useEffect, useState } from 'react';
import {
  createAdminProduct,
  getAdminSalesAnalytics,
  getAdminSubscriptionShipments,
  getAdminOrders,
  getAdminProducts,
  updateAdminSubscriptionShipmentStatus,
  updateAdminOrderStatus,
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
  const [shipments, setShipments] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    try {
      const [productsRes, ordersRes, shipmentsRes, analyticsRes] = await Promise.all([
        getAdminProducts(),
        getAdminOrders(),
        getAdminSubscriptionShipments(),
        getAdminSalesAnalytics(),
      ]);
      setProducts([...(productsRes.data || [])].sort((a, b) => Number(b.id) - Number(a.id)));
      setOrders(ordersRes.data || []);
      setShipments(shipmentsRes.data || []);
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

  async function handleShipmentStatus(shipmentId, status) {
    setLoading(true);
    try {
      await updateAdminSubscriptionShipmentStatus(shipmentId, status);
      onMessage?.('Subscription shipment status updated');
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

        {shipments.length > 0 && <p className="hint-text">Subscription shipments</p>}
        {shipments.slice(0, 3).map((shipment) => (
          <div key={shipment.id} className="journey-list-row">
            <span>
              Shipment #{shipment.id} ({shipment.plan}) - {shipment.status}
            </span>{' '}
            <button
              className="ghost-btn inline-btn"
              onClick={() => handleShipmentStatus(shipment.id, shipment.status === 'scheduled' ? 'fulfilled' : 'scheduled')}
            >
              Toggle Status
            </button>
          </div>
        ))}

        {analytics && (
          <div className="journey-list">
            <p className="hint-text">Sales analytics</p>
            <p>
              <strong>Total Revenue</strong>: ¥{Number(analytics.totalRevenue).toFixed(2)}
            </p>
            <p>
              <strong>Total Orders</strong>: {analytics.totalOrders}
            </p>
            <p>
              <strong>Avg Order Value</strong>: ¥{Number(analytics.avgOrderValue).toFixed(2)}
            </p>
            {(analytics.bestSellers || []).slice(0, 3).map((item) => (
              <p key={item.id}>
                <strong>{item.name}</strong>: {item.sales} sales
              </p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
