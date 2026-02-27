import { useState } from 'react';
import { saveGreetingCard } from '../api';

export default function GreetingCardForm({ onMessage }) {
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [saved, setSaved] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submitCard() {
    setLoading(true);
    try {
      const data = await saveGreetingCard({ recipient, sender, message });
      setSaved(data.data);
      onMessage?.('Greeting card saved');
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>Greeting Card</h3>
      <p className="hint-text">US-011</p>
      <input
        className="text-input"
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        className="text-input"
        placeholder="Sender (optional)"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
      />
      <textarea
        className="text-input"
        rows="3"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="primary-btn" onClick={submitCard} disabled={loading}>
        {loading ? 'Saving...' : 'Save Card'}
      </button>
      {saved && <p className="hint-text">{saved.preview}</p>}
    </article>
  );
}
