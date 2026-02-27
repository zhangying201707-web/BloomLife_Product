import { useState } from 'react';
import { checkAvailability } from '../api';

export default function AvailabilityCard({ productId, onMessage }) {
  const [zipCode, setZipCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submitCheck() {
    if (!productId || !zipCode.trim()) {
      onMessage?.('Select a product and enter zip code');
      return;
    }

    setLoading(true);
    try {
      const data = await checkAvailability(productId, zipCode.trim());
      setResult(data.data);
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>Delivery Availability</h3>
      <p className="hint-text">US-007</p>
      <input
        className="text-input"
        placeholder="ZIP code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
      <button className="primary-btn" onClick={submitCheck} disabled={loading}>
        {loading ? 'Checking...' : 'Check Delivery'}
      </button>
      {result && (
        <div className="journey-list">
          <p>Estimated: {result.estimatedDelivery}</p>
          <p>Stock: {result.stockCount}</p>
          <p>Available: {result.deliveryAvailable ? 'Yes' : 'No'}</p>
        </div>
      )}
    </article>
  );
}
