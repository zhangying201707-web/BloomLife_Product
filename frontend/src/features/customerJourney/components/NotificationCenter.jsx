import { useState } from 'react';
import { getNotifications } from '../api';

export default function NotificationCenter({ userId, onMessage }) {
  const [items, setItems] = useState([]);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [loading, setLoading] = useState(false);

  async function loadNotifications(nextUnreadOnly = unreadOnly) {
    if (!userId) return;

    setLoading(true);
    try {
      const data = await getNotifications(userId, nextUnreadOnly);
      setItems(data.data || []);
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  function toggleUnread() {
    const nextValue = !unreadOnly;
    setUnreadOnly(nextValue);
    loadNotifications(nextValue);
  }

  return (
    <article className="journey-card">
      <h3>Notifications</h3>
      <p className="hint-text">US-022</p>
      <div className="journey-actions">
        <button className="primary-btn" onClick={() => loadNotifications()} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh'}
        </button>
        <button className="ghost-btn" onClick={toggleUnread}>
          {unreadOnly ? 'Show All' : 'Unread Only'}
        </button>
      </div>
      <div className="journey-list">
        {items.length === 0 && <p className="hint-text">No notifications</p>}
        {items.map((item) => (
          <p key={item.id}>
            <strong>{item.title}</strong>: {item.message}
          </p>
        ))}
      </div>
    </article>
  );
}
