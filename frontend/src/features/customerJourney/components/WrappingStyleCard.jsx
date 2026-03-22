import { useEffect, useState } from 'react';
import { getWrappingOptions } from '../api';

export default function WrappingStyleCard({ productId, onMessage }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOptions([]);
    setSelected('');
  }, [productId]);

  async function loadWrappingOptions() {
    if (!productId) {
      onMessage?.('Add a bouquet to cart first');
      return;
    }

    setLoading(true);
    try {
      const data = await getWrappingOptions(productId);
      setOptions(data.data || []);
      if (data.data?.[0]) {
        setSelected(data.data[0].name);
      }
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>Wrapping Styles</h3>
      <button className="primary-btn" onClick={loadWrappingOptions} disabled={loading}>
        {loading ? 'Loading...' : 'View Wrapping Options'}
      </button>
      {options.length > 0 && (
        <>
          <select className="text-input" value={selected} onChange={(e) => setSelected(e.target.value)}>
            {options.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name} {option.surcharge > 0 ? `(+¥${option.surcharge})` : '(Included)'}
              </option>
            ))}
          </select>
          <p className="hint-text">Selected wrap: {selected}</p>
        </>
      )}
    </article>
  );
}
