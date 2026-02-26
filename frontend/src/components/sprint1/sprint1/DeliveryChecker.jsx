import React, { useState } from 'react';
import { apiUrl } from '../../api';

const DeliveryChecker = ({ productId }) => {
  const [zipCode, setZipCode] = useState('');
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkDelivery = async () => {
    if (!productId || !zipCode) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/availability?productId=${productId}&zipCode=${zipCode}`);
      const data = await res.json();
      setDelivery(data.data);
    } catch (error) {
      console.error('Error checking delivery:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ZIP code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ddd'
        }}
      />
      <button 
        onClick={checkDelivery}
        disabled={loading || !zipCode}
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
        {loading ? 'Checking...' : 'Check Delivery Date'}
      </button>
      
      {delivery && (
        <div style={{ marginTop: '10px', fontSize: '14px' }}>
          <div>Estimated Delivery: {delivery.estimatedDelivery}</div>
          <div>Stock: {delivery.stockCount} items</div>
          <div>Available: {delivery.deliveryAvailable ? '✅' : '❌'}</div>
        </div>
      )}
    </div>
  );
};

export default DeliveryChecker;