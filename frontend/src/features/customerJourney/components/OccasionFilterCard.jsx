import { useEffect, useState } from 'react';
import { getOccasions, filterProducts, getTrendingArrangements } from '../api';

const styles = ['Romantic', 'Modern', 'Elegant', 'Sunny', 'Classic', 'Simple'];
const moods = ['Love', 'Happy', 'Respect', 'Cheerful', 'Admiration', 'Warm'];

export default function OccasionFilterCard({ onFiltered, onMessage }) {
  const [occasions, setOccasions] = useState([]);
  const [occasion, setOccasion] = useState('');
  const [style, setStyle] = useState('');
  const [mood, setMood] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadOccasions() {
      try {
        const data = await getOccasions();
        setOccasions(data.data || []);
      } catch (error) {
        onMessage?.(error.message);
      }
    }

    loadOccasions();
  }, [onMessage]);

  async function applyFilters() {
    setLoading(true);
    try {
      const data = await filterProducts({ occasion, style, mood, maxBudget });
      onFiltered?.(data.data || []);
      onMessage?.(`Filter result: ${data.total || 0} product(s)`);
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function onOccasionChange(nextOccasion) {
    setOccasion(nextOccasion);
    setLoading(true);
    try {
      const data = await filterProducts({ occasion: nextOccasion, style, mood, maxBudget });
      onFiltered?.(data.data || []);
      onMessage?.(`Filter result: ${data.total || 0} product(s)`);
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function showTrending() {
    setLoading(true);
    try {
      const data = await getTrendingArrangements();
      setTrending(data.data || []);
      onMessage?.('Loaded trending arrangements');
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>Budget & Trending Discovery</h3>
      <p className="hint-text">US-001, US-002</p>
      <select className="text-input" value={occasion} onChange={(e) => onOccasionChange(e.target.value)}>
        <option value="">All occasions</option>
        {occasions.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <select className="text-input" value={style} onChange={(e) => setStyle(e.target.value)}>
        <option value="">All styles</option>
        {styles.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select className="text-input" value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="">All moods</option>
        {moods.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <input
        className="text-input"
        placeholder="Max budget"
        value={maxBudget}
        onChange={(e) => setMaxBudget(e.target.value)}
      />
      <button className="primary-btn" onClick={applyFilters} disabled={loading}>
        {loading ? 'Filtering...' : 'Apply Filters'}
      </button>
      <button className="ghost-btn" onClick={showTrending} disabled={loading}>
        Show Trending Arrangements
      </button>
      {trending.length > 0 && (
        <div className="journey-list">
          {trending.map((item) => (
            <p key={item.id}>
              <strong>{item.name}</strong>: score {item.trendingScore}, {item.rating} stars
            </p>
          ))}
        </div>
      )}
    </article>
  );
}
