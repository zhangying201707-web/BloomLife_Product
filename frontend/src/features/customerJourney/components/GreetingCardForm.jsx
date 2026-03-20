import { useState } from 'react';
import { getFavoriteMessages, saveFavoriteMessage, saveGreetingCard } from '../api';

export default function GreetingCardForm({ userId, onMessage }) {
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [saved, setSaved] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadFavorites() {
    try {
      const data = await getFavoriteMessages(userId || 'guest');
      setFavorites(data.data || []);
    } catch (error) {
      onMessage?.(error.message);
    }
  }

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

  async function saveAsFavorite() {
    if (!message.trim()) {
      onMessage?.('Write a message before saving it');
      return;
    }

    try {
      await saveFavoriteMessage({
        userId: userId || 'guest',
        label: recipient ? `${recipient}'s card` : 'Saved card',
        message,
        recipient,
        sender,
      });
      onMessage?.('Favorite message saved');
      await loadFavorites();
    } catch (error) {
      onMessage?.(error.message);
    }
  }

  return (
    <article className="journey-card">
      <h3>Greeting Card</h3>
      <p className="hint-text">US-008, US-009</p>
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
      <button className="ghost-btn" onClick={saveAsFavorite}>
        Save as Favorite
      </button>
      <button className="ghost-btn" onClick={loadFavorites}>
        Load Favorite Messages
      </button>
      {saved && <p className="hint-text">{saved.preview}</p>}
      {favorites.length > 0 && (
        <div className="journey-list">
          {favorites.map((item) => (
            <p key={item.id}>{item.label}: {item.message}</p>
          ))}
        </div>
      )}
    </article>
  );
}
