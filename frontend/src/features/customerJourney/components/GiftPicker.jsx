import { useState } from 'react';
import { addGift } from '../api';

const gifts = [
  { id: 1, label: 'Chocolate (+¥88)' },
  { id: 2, label: 'Teddy Bear (+¥129)' },
  { id: 3, label: 'Premium Card (+¥29)' },
];

export default function GiftPicker({ productId, onMessage }) {
  const [loadingId, setLoadingId] = useState(null);

  async function addGiftToOrder(giftId) {
    if (!productId) {
      onMessage?.('Select a product first');
      return;
    }

    setLoadingId(giftId);
    try {
      const data = await addGift({ productId, giftId });
      onMessage?.(data.data.message);
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <article className="journey-card">
      <h3>Optional Gifts</h3>
      <p className="hint-text">US-012</p>
      <div className="journey-actions">
        {gifts.map((gift) => (
          <button
            key={gift.id}
            className="ghost-btn"
            disabled={loadingId === gift.id}
            onClick={() => addGiftToOrder(gift.id)}
          >
            {loadingId === gift.id ? 'Adding...' : gift.label}
          </button>
        ))}
      </div>
    </article>
  );
}
