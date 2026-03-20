import { useEffect, useState } from 'react';
import { getSupportOptions, subscribeMonthlyBox } from '../api';

export default function SubscriptionSupportCard({ userId, onMessage }) {
  const [plan, setPlan] = useState('Seasonal Classic');
  const [address, setAddress] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [support, setSupport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSupport() {
      try {
        const data = await getSupportOptions();
        setSupport(data.data);
      } catch (error) {
        onMessage?.(error.message);
      }
    }

    loadSupport();
  }, [onMessage]);

  async function handleSubscribe() {
    setLoading(true);
    try {
      const data = await subscribeMonthlyBox({
        userId,
        plan,
        address,
        frequency: 'Monthly',
      });
      setSubscription(data.data);
      onMessage?.('Monthly flower box subscribed');
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>Subscription & Support</h3>
      <p className="hint-text">US-013, US-014</p>
      <select className="text-input" value={plan} onChange={(e) => setPlan(e.target.value)}>
        <option>Seasonal Classic</option>
        <option>Luxury Signature</option>
        <option>Office Refresh</option>
      </select>
      <input
        className="text-input"
        placeholder="Monthly box address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button className="primary-btn" onClick={handleSubscribe} disabled={loading}>
        {loading ? 'Saving...' : 'Subscribe Monthly Box'}
      </button>
      {subscription && (
        <p className="hint-text">
          {subscription.plan} scheduled. Next delivery: {subscription.nextDelivery}
        </p>
      )}
      <div className="journey-list">
        {(support?.channels || []).map((channel) => (
          <p key={channel.id}>
            <strong>{channel.label}</strong>: {channel.availability}
          </p>
        ))}
      </div>
    </article>
  );
}
