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
        {loading ? '加载中...' : '查看价格明细'}
      </button>
      
      {pricing && (
        <div style={{ marginTop: '10px', fontSize: '14px' }}>
          <div>商品: {pricing.productName}</div>
          <div>原价: ¥{pricing.basePrice}</div>
          <div>税费: ¥{pricing.tax}</div>
          <div>包装: ¥{pricing.packaging}</div>
          <div>配送: ¥{pricing.deliveryFee}</div>
          <div><strong>总计: ¥{pricing.total}</strong></div>
        </div>
      )}
    </div>
  );
};

export default PricingDisplay;