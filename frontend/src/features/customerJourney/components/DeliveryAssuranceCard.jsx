import { useEffect, useState } from 'react';
import { getDeliveryAssurance } from '../api';

export default function DeliveryAssuranceCard({ orders = [], onMessage }) {
  const [orderId, setOrderId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!orderId && orders.length > 0) {
      setOrderId(String(orders[0].id));
    }
  }, [orders, orderId]);

  async function handleLoad() {
    if (!orderId) {
      onMessage?.('Please choose an order first');
      return;
    }

    setLoading(true);
    try {
      const data = await getDeliveryAssurance(orderId);
      setResult(data.data);
      onMessage?.('Delivery proof and delay updates loaded');
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>Delivery Proof & Delay Alerts</h3>
      <select className="text-input" value={orderId} onChange={(e) => setOrderId(e.target.value)}>
        <option value="">Select recent order</option>
        {orders.map((order) => (
          <option key={order.id} value={order.id}>
            Order #{order.id}
          </option>
        ))}
      </select>
      <button className="primary-btn" onClick={handleLoad} disabled={loading}>
        {loading ? 'Loading...' : 'Load Delivery Update'}
      </button>
      {result && (
        <>
          <div className="journey-list">
            <p>
              <strong>Status:</strong> {result.status}
            </p>
            <p>
              <strong>Delay Alert:</strong> {result.delayAlert.message}
            </p>
          </div>
          <img
            className="journey-preview-image"
            src={result.deliveryPhoto.image}
            alt={result.deliveryPhoto.caption}
          />
          <p className="hint-text">{result.deliveryPhoto.caption}</p>
        </>
      )}
    </article>
  );
}
