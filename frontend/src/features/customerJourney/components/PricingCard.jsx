import { useState } from 'react';
import { getPricing } from '../api';

export default function PricingCard({ productId, onMessage }) {
  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadPricing() {
    if (!productId) {
      onMessage?.('Please select a product first');
      return;
    }

    setLoading(true);
    try {
      const data = await getPricing(productId);
      setPricing(data.data);
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>Pricing Breakdown</h3>
      <p className="hint-text">US-006</p>
      <button className="primary-btn" onClick={loadPricing} disabled={loading}>
        {loading ? 'Loading...' : 'View Price Details'}
      </button>
      {pricing && (
        <div className="journey-list">
          <p>{pricing.productName}</p>
          <p>Base: ¥{Number(pricing.basePrice).toFixed(2)}</p>
          <p>Packaging: ¥{Number(pricing.packaging).toFixed(2)}</p>
          <p>Delivery: ¥{Number(pricing.deliveryFee).toFixed(2)}</p>
          <p>Tax: ¥{Number(pricing.tax).toFixed(2)}</p>
          <p>
            <strong>Total: ¥{Number(pricing.total).toFixed(2)}</strong>
          </p>
        </div>
      )}
    </article>
  );
}
