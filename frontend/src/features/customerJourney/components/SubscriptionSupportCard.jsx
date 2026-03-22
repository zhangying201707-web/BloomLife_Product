import { useEffect, useState } from 'react';
import {
  getFaqs,
  getSubscriptionThemes,
  getSupportChat,
  getSupportOptions,
  getUserSubscriptions,
  manageSubscription,
  sendSupportMessage,
  subscribeMonthlyBox,
} from '../api';

export default function SubscriptionSupportCard({ userId, onMessage }) {
  const [plan, setPlan] = useState('Seasonal Classic');
  const [address, setAddress] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);
  const [support, setSupport] = useState(null);
  const [themes, setThemes] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [chatItems, setChatItems] = useState([]);
  const [chatMessage, setChatMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function refreshSubscriptions() {
    if (!userId) return;
    const response = await getUserSubscriptions(userId);
    setSubscriptions(response.data || []);
  }

  async function refreshChat() {
    if (!userId) return;
    const response = await getSupportChat(userId);
    setChatItems(response.data || []);
  }

  useEffect(() => {
    async function loadData() {
      try {
        const [supportRes, themesRes, faqRes] = await Promise.all([
          getSupportOptions(),
          getSubscriptionThemes(),
          getFaqs(),
        ]);
        setSupport(supportRes.data);
        setThemes(themesRes.data || []);
        setFaqs(faqRes.data || []);

        await Promise.all([refreshSubscriptions(), refreshChat()]);
      } catch (error) {
        onMessage?.(error.message);
      }
    }

    loadData();
  }, [onMessage, userId]);

  async function handleSubscribe() {
    setLoading(true);
    try {
      await subscribeMonthlyBox({
        userId,
        plan,
        address,
        frequency: 'Monthly',
      });
      await refreshSubscriptions();
      onMessage?.('Subscription created');
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateSubscription(item, payload, successMessage) {
    setLoading(true);
    try {
      await manageSubscription(item.id, payload);
      await refreshSubscriptions();
      onMessage?.(successMessage);
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function submitChatMessage() {
    if (!userId) {
      onMessage?.('Please log in to chat with support');
      return;
    }
    if (!chatMessage.trim()) return;

    setLoading(true);
    try {
      const response = await sendSupportMessage({ userId, message: chatMessage.trim() });
      setChatItems(response.data || []);
      setChatMessage('');
      onMessage?.('Support message sent');
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>Subscription & Support</h3>
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

      <div className="journey-list">
        {subscriptions.length === 0 && <p className="hint-text">No active subscriptions yet.</p>}
        {subscriptions.slice(0, 3).map((item) => (
          <div key={item.id} className="journey-list-row">
            <span>
              <strong>{item.plan}</strong> ({item.status}) - next: {item.nextDelivery}
            </span>
            <div className="journey-actions">
              <button
                className="ghost-btn inline-btn"
                onClick={() =>
                  updateSubscription(
                    item,
                    { status: item.status === 'paused' ? 'active' : 'paused' },
                    item.status === 'paused' ? 'Subscription resumed' : 'Subscription paused'
                  )
                }
                disabled={loading}
              >
                {item.status === 'paused' ? 'Resume' : 'Pause'}
              </button>
              <button
                className="ghost-btn inline-btn"
                onClick={() =>
                  updateSubscription(
                    item,
                    {
                      plan: item.plan === 'Seasonal Classic' ? 'Luxury Signature' : 'Seasonal Classic',
                      address: address || item.address,
                    },
                    'Subscription plan/address updated'
                  )
                }
                disabled={loading}
              >
                Change Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="journey-list">
        <p className="hint-text">Upcoming subscription themes</p>
        {themes.map((item) => (
          <p key={item.month}>
            <strong>{item.month}</strong>: {item.theme} ({item.palette})
          </p>
        ))}
      </div>

      <div className="journey-list">
        {(support?.channels || []).map((channel) => (
          <p key={channel.id}>
            <strong>{channel.label}</strong>: {channel.availability}
          </p>
        ))}
      </div>

      <div className="journey-list">
        <p className="hint-text">FAQs</p>
        {faqs.map((faq) => (
          <p key={faq.id}>
            <strong>{faq.question}</strong> {faq.answer}
          </p>
        ))}
      </div>

      <div className="journey-list">
        <p className="hint-text">Live support chat</p>
        {chatItems.slice(-4).map((item) => (
          <p key={item.id}>
            <strong>{item.from === 'agent' ? 'Agent' : 'You'}</strong>: {item.text}
          </p>
        ))}
      </div>
      <input
        className="text-input"
        placeholder="Message support agent"
        value={chatMessage}
        onChange={(e) => setChatMessage(e.target.value)}
      />
      <button className="ghost-btn" onClick={submitChatMessage} disabled={loading}>
        Send Message
      </button>
    </article>
  );
}
