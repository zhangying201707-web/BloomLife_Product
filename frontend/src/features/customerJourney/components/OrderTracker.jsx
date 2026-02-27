import { useState } from 'react';
import { trackOrder } from '../api';

export default function OrderTracker({ onMessage }) {
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submitTrack() {
    if (!orderId.trim()) {
      onMessage?.('Enter order id');
      return;
    }

    setLoading(true);
    try {
      const data = await trackOrder(orderId.trim());
      setTracking(data.data);
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>Order Tracking</h3>
      <p className="hint-text">US-021</p>
      <input
        className="text-input"
        placeholder="Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button className="primary-btn" onClick={submitTrack} disabled={loading}>
        {loading ? 'Tracking...' : 'Track Order'}
      </button>
      {tracking && (
        <div className="journey-list">
          <p>{tracking.orderNumber}</p>
          <p>Status: {tracking.currentStatus}</p>
          <p>Courier: {tracking.courier}</p>
          <p>ETA: {tracking.estimatedDelivery}</p>
        </div>
      )}
    </article>
  );
}
