import { useState } from 'react';
import { saveDeliveryDetails } from '../api';

export default function DeliveryDetailsForm({ onMessage }) {
  const [recipient, setRecipient] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('09:00-12:00');
  const [savedAddress, setSavedAddress] = useState('');
  const [savedSlot, setSavedSlot] = useState('');
  const [loading, setLoading] = useState(false);

  async function submitDetails() {
    setLoading(true);
    try {
      const data = await saveDeliveryDetails({ recipient, phone, address, deliveryDate, deliveryTime });
      setSavedAddress(data.data.fullAddress);
      setSavedSlot(`${data.data.deliveryDate} ${data.data.deliveryTime}`);
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
      <p className="hint-text">US-010</p>
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
      <input
        className="text-input"
        type="date"
        value={deliveryDate}
        onChange={(e) => setDeliveryDate(e.target.value)}
      />
      <select className="text-input" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)}>
        <option value="09:00-12:00">09:00-12:00</option>
        <option value="12:00-15:00">12:00-15:00</option>
        <option value="15:00-18:00">15:00-18:00</option>
      </select>
      <button className="primary-btn" onClick={submitDetails} disabled={loading}>
        {loading ? 'Saving...' : 'Save Delivery Info'}
      </button>
      {savedAddress && <p className="hint-text">Saved: {savedAddress}</p>}
      {savedSlot && <p className="hint-text">Time window: {savedSlot}</p>}
    </article>
  );
}
