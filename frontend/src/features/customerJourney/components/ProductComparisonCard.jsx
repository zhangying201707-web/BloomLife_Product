import { useEffect, useState } from 'react';
import { compareProducts } from '../api';

export default function ProductComparisonCard({ products, onMessage }) {
  const [leftId, setLeftId] = useState('');
  const [rightId, setRightId] = useState('');
  const [comparison, setComparison] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products.length >= 2) {
      setLeftId(String(products[0].id));
      setRightId(String(products[1].id));
    }
  }, [products]);

  async function handleCompare() {
    if (!leftId || !rightId || leftId === rightId) {
      onMessage?.('Please choose two different arrangements');
      return;
    }

    setLoading(true);
    try {
      const data = await compareProducts([leftId, rightId]);
      setComparison(data.data || []);
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>Arrangement Comparison</h3>
      <p className="hint-text">US-003</p>
      <select className="text-input" value={leftId} onChange={(e) => setLeftId(e.target.value)}>
        <option value="">Choose arrangement A</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      <select className="text-input" value={rightId} onChange={(e) => setRightId(e.target.value)}>
        <option value="">Choose arrangement B</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      <button className="primary-btn" onClick={handleCompare} disabled={loading}>
        {loading ? 'Comparing...' : 'Compare Arrangements'}
      </button>
      {comparison.length > 0 && (
        <div className="journey-list">
          {comparison.map((item) => (
            <p key={item.id}>
              <strong>{item.name}</strong>: ¥{Number(item.price).toFixed(2)}, {item.style}, {item.rating} stars,
              {` ${item.stemCount} stems`}
            </p>
          ))}
        </div>
      )}
    </article>
  );
}
