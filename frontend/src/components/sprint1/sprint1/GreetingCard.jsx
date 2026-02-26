import React, { useState } from 'react';
import { apiUrl } from '../../api';

const GreetingCard = () => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [savedCard, setSavedCard] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveCard = async () => {
    if (!recipient || !message) {
      alert('Please enter recipient and message');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/greeting-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient, message })
      });
      const data = await res.json();
      setSavedCard(data.data);
    } catch (error) {
      console.error('Error saving card:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ddd'
        }}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="3"
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ddd'
        }}
      />
      <button 
        onClick={saveCard}
        disabled={loading}
        style={{
          padding: '8px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        {loading ? 'Saving...' : 'Save Greeting Card'}
      </button>
      
      {savedCard && (
        <div style={{ 
          marginTop: '10px', 
          padding: '10px',
          background: '#f0f0f0',
          borderRadius: '5px',
          fontSize: '14px',
          whiteSpace: 'pre-line'
        }}>
          {savedCard.preview}
        </div>
      )}
    </div>
  );
};

export default GreetingCard;