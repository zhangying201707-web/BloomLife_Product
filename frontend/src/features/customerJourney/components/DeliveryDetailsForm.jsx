import { useState } from 'react';
import { saveDeliveryDetails } from '../api';

export default function DeliveryDetailsForm({ onMessage }) {
  const [recipient, setRecipient] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [savedAddress, setSavedAddress] = useState('');
  const [loading, setLoading] = useState(false);

  async function submitDetails() {
    setLoading(true);
    try {
      const data = await saveDeliveryDetails({ recipient, phone, address });
      setSavedAddress(data.data.fullAddress);
      onMessage?.('Delivery details saved');
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>Delivery Details</h3>
      <p className="hint-text">US-017</p>
      <input
        className="text-input"
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        className="text-input"
        placeholder="Phone (11 digits)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="text-input"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button className="primary-btn" onClick={submitDetails} disabled={loading}>
        {loading ? 'Saving...' : 'Save Delivery Info'}
      </button>
      {savedAddress && <p className="hint-text">Saved: {savedAddress}</p>}
    </article>
  );
}
