import { useEffect, useState } from 'react';
import { getSubscriptionSummary, subscribeMonthlyBox, updateSubscription } from '../api';

export default function SubscriptionManagerCard({ userId, onMessage }) {
  const [subscription, setSubscription] = useState(null);
  const [themes, setThemes] = useState([]);
  const [plan, setPlan] = useState('Seasonal Classic');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  async function refresh() {
    if (!userId) return;

    setLoading(true);
    try {
      const data = await getSubscriptionSummary(userId);
      const nextSubscription = data.data.subscription;
      setSubscription(nextSubscription);
      setThemes(data.data.upcomingThemes || []);
      setPlan(nextSubscription?.plan || 'Seasonal Classic');
      setAddress(nextSubscription?.address || '');
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, [userId]);

  async function handleSave() {
    if (!address.trim()) {
      onMessage?.('Please enter the subscription delivery address');
      return;
    }

    setLoading(true);
    try {
      const data = subscription
        ? await updateSubscription(userId, { plan, address })
        : await subscribeMonthlyBox({ userId, plan, address, frequency: 'Monthly' });
      setSubscription(data.data);
      setThemes(data.data.upcomingThemes || []);
      onMessage?.(subscription ? 'Subscription updated' : 'Subscription created');
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(action) {
    setLoading(true);
    try {
      const data = await updateSubscription(userId, { action });
      setSubscription(data.data);
      setThemes(data.data.upcomingThemes || []);
      onMessage?.(`Subscription ${action}d successfully`);
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>Subscription Manager</h3>
      <select className="text-input" value={plan} onChange={(e) => setPlan(e.target.value)}>
        <option>Seasonal Classic</option>
        <option>Luxury Signature</option>
        <option>Office Refresh</option>
      </select>
      <input
        className="text-input"
        placeholder="Subscription delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="journey-actions journey-actions-inline">
        <button className="primary-btn" onClick={handleSave} disabled={loading}>
          {subscription ? 'Save Subscription Changes' : 'Start Subscription'}
        </button>
        <button className="ghost-btn" onClick={() => handleAction('pause')} disabled={loading || !subscription}>
          Pause Plan
        </button>
        <button className="ghost-btn" onClick={() => handleAction('resume')} disabled={loading || !subscription}>
          Resume Plan
        </button>
      </div>
      {subscription && (
        <div className="journey-list">
          <p>
            <strong>Status:</strong> {subscription.status}
          </p>
          <p>
            <strong>Next delivery:</strong> {subscription.nextDelivery}
          </p>
          <p>
            <strong>Address:</strong> {subscription.address}
          </p>
        </div>
      )}
      <div className="journey-list">
        <p>
          <strong>Upcoming themes:</strong>
        </p>
        {themes.map((item) => (
          <p key={item.id}>
            Month {item.monthOffset}: {item.theme}
          </p>
        ))}
      </div>
      <button className="ghost-btn inline-btn" onClick={refresh} disabled={loading}>
        Refresh Subscription
      </button>
    </article>
  );
}
