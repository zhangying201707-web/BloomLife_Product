import { useEffect, useState } from 'react';
import { getSupportOptions, startSupportChat } from '../api';

export default function SupportHubCard({ userId, onMessage }) {
  const [support, setSupport] = useState(null);
  const [thread, setThread] = useState([]);
  const [message, setMessage] = useState('');
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

  async function handleSend() {
    setLoading(true);
    try {
      const data = await startSupportChat({ userId, message });
      setThread(data.data || []);
      setMessage('');
      onMessage?.('Support chat updated');
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>FAQ & Live Support</h3>
      <div className="journey-list">
        {(support?.faqs || []).map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
      <input
        className="text-input"
        placeholder="Ask a support agent"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="primary-btn" onClick={handleSend} disabled={loading}>
        {loading ? 'Sending...' : 'Chat With Support'}
      </button>
      <div className="journey-list">
        {thread.map((item) => (
          <p key={item.id}>
            <strong>{item.sender}:</strong> {item.text}
          </p>
        ))}
      </div>
    </article>
  );
}
