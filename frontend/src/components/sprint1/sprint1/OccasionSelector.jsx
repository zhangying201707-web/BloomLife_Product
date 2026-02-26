import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../api';

const OccasionSelector = ({ onSelect }) => {
  const [occasions, setOccasions] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    fetchOccasions();
  }, []);

  const fetchOccasions = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/occasions');
      const data = await res.json();
      setOccasions(data.data);
    } catch (error) {
      console.error('Error fetching occasions:', error);
    }
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
    if (onSelect) {
      onSelect(e.target.value);
    }
  };

  return (
    <div>
      <select 
        value={selected} 
        onChange={handleChange}
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '5px',
          border: '1px solid #ddd'
        }}
      >
        <option value="">Select Occasion</option>
        {occasions.map(o => (
          <option key={o.id} value={o.id}>{o.name}</option>
        ))}
      </select>
    </div>
  );
};

export default OccasionSelector;