import { useState } from 'react';
import { apiUrl } from '../api';

export default function AdminLogin({ onLogin, onBack }) {
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const res = await fetch(apiUrl('/auth/admin-login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Admin login failed');
        return;
      }
      setError('');
      onLogin({
        username: data.username,
        userId: data.userId,
        role: data.role,
      });
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-card auth-card-admin">
      <p className="auth-badge">Demo Admin Access</p>
      <h2>Admin Login</h2>
      <p className="auth-copy">
        This sprint demo uses a fixed administrator account. Use the button below to enter the
        admin console directly.
      </p>
      <div className="demo-credentials">
        <span>Username: demo_admin</span>
        <span>Password: Admin123456</span>
      </div>
      <button type="button" className="primary-btn" onClick={handleSubmit} disabled={submitting}>
        {submitting ? 'Signing in...' : 'Login as Demo Admin'}
      </button>
      <button type="button" className="ghost-btn" onClick={onBack}>
        Back to Customer Login
      </button>
      {error && <p className="error-text">{error}</p>}
    </section>
  );
}
