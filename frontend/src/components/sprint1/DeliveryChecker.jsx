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
        placeholder="输入邮政编码"
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
        {loading ? '检查中...' : '检查配送日期'}
      </button>
      
      {delivery && (
        <div style={{ marginTop: '10px', fontSize: '14px' }}>
          <div>预计送达: {delivery.estimatedDelivery}</div>
          <div>库存: {delivery.stockCount}件</div>
          <div>可配送: {delivery.deliveryAvailable ? '✅' : '❌'}</div>
        </div>
      )}
    </div>
  );
};

export default DeliveryChecker;