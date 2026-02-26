import React, { useState } from 'react';
import { apiUrl } from '../../api';

const PricingDisplay = ({ productId }) => {
  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPricing = async () => {
    if (!productId) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/products/${productId}/pricing`);
      const data = await res.json();
      setPricing(data.data);
    } catch (error) {
      console.error('Error fetching pricing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={fetchPricing}
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
        {loading ? 'Loading...' : 'View Price Breakdown'}
      </button>
      
      {pricing && (
        <div style={{ marginTop: '10px', fontSize: '14px' }}>
          <div>Product: {pricing.productName}</div>
          <div>Base Price: ¥{pricing.basePrice}</div>
          <div>Tax: ¥{pricing.tax}</div>
          <div>Packaging: ¥{pricing.packaging}</div>
          <div>Delivery: ¥{pricing.deliveryFee}</div>
          <div><strong>Total: ¥{pricing.total}</strong></div>
        </div>
      )}
    </div>
  );
};

export default PricingDisplay;