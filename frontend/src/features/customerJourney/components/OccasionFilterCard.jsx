import { useEffect, useState } from 'react';
import { getOccasions, filterProducts } from '../api';

const styles = ['Romantic', 'Modern', 'Elegant', 'Sunny', 'Classic', 'Simple'];
const moods = ['Love', 'Happy', 'Respect', 'Cheerful', 'Admiration', 'Warm'];

export default function OccasionFilterCard({ onFiltered, onMessage }) {
  const [occasions, setOccasions] = useState([]);
  const [occasion, setOccasion] = useState('');
  const [style, setStyle] = useState('');
  const [mood, setMood] = useState('');
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
      const data = await filterProducts({ occasion, style, mood });
      onFiltered?.(data.data || []);
      onMessage?.(`Filter result: ${data.total || 0} product(s)`);
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>Occasion & Mood</h3>
      <p className="hint-text">US-001, US-002</p>
      <select className="text-input" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
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
      <button className="primary-btn" onClick={applyFilters} disabled={loading}>
        {loading ? 'Filtering...' : 'Apply Filters'}
      </button>
    </article>
  );
}
