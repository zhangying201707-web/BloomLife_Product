import { useEffect, useState } from 'react';
import { getPersonalInfo, updatePersonalInfo } from '../api';

export default function ProfileCard({ userId, onMessage }) {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', birthday: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      if (!userId) return;
      try {
        const response = await getPersonalInfo(userId);
        setForm({
          fullName: response.data.fullName || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          birthday: response.data.birthday || '',
        });
      } catch (error) {
        onMessage?.(error.message);
      }
    }

    load();
  }, [userId, onMessage]);

  async function save() {
    if (!userId) return;
    setLoading(true);
    try {
      await updatePersonalInfo(userId, form);
      onMessage?.('Profile updated');
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>Personal Information</h3>
      <input
        className="text-input"
        placeholder="Full name"
        value={form.fullName}
        onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
      />
      <input
        className="text-input"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
      />
      <input
        className="text-input"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
      />
      <input
        className="text-input"
        placeholder="Birthday (YYYY-MM-DD)"
        value={form.birthday}
        onChange={(e) => setForm((prev) => ({ ...prev, birthday: e.target.value }))}
      />
      <button className="primary-btn" onClick={save} disabled={loading}>
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </article>
  );
}
