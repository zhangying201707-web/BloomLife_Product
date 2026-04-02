import { useEffect, useMemo, useState } from 'react';
import {
  getFavoriteProducts,
  getUserProfile,
  saveFavoriteProduct,
  updateUserProfile,
} from '../api';

export default function AccountCenterCard({ user, products = [], onMessage, onProfileUpdated }) {
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [loading, setLoading] = useState(false);

  const selectableProducts = useMemo(() => products.slice(0, 6), [products]);

  async function refresh() {
    if (!user?.userId) return;

    setLoading(true);
    try {
      const [profileRes, favoritesRes] = await Promise.all([
        getUserProfile(user.userId),
        getFavoriteProducts(user.userId),
      ]);
      setProfile(profileRes.data);
      setUsername(profileRes.data.username || '');
      setEmail(profileRes.data.email || '');
      setFavorites(favoritesRes.data || []);
      if (!selectedProductId && selectableProducts.length > 0) {
        setSelectedProductId(String(selectableProducts[0].id));
      }
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, [user?.userId, selectableProducts.length]);

  async function handleProfileSave() {
    setLoading(true);
    try {
      const data = await updateUserProfile(user.userId, { username, email });
      setProfile(data.data);
      onProfileUpdated?.(data.data);
      onMessage?.('Personal information updated');
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveFavorite() {
    setLoading(true);
    try {
      await saveFavoriteProduct({ userId: user.userId, productId: selectedProductId });
      onMessage?.('Favorite product saved');
      const favoritesRes = await getFavoriteProducts(user.userId);
      setFavorites(favoritesRes.data || []);
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card account-center-card">
      <h3>Account Center</h3>
      <div className="account-center-section">
        <p className="account-center-label">Profile details</p>
        <input
          className="text-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="text-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="primary-btn" onClick={handleProfileSave} disabled={loading}>
          Save Personal Info
        </button>
        {profile && (
          <div className="account-center-summary">
            <p className="account-center-label">Current account</p>
            <p>
              <strong>Username</strong>
              <span>{profile.username}</span>
            </p>
            <p>
              <strong>Email</strong>
              <span>{profile.email}</span>
            </p>
          </div>
        )}
      </div>

      <div className="account-center-section">
        <p className="account-center-label">Favorite products</p>
        <select
          className="text-input"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          <option value="">Select product to favorite</option>
          {selectableProducts.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <button className="primary-btn" onClick={handleSaveFavorite} disabled={loading || !selectedProductId}>
          Save Favorite Product
        </button>
        <div className="account-favorites-list">
          {favorites.length === 0 && <p className="account-center-empty">No saved favorites yet.</p>}
          {favorites.map((item) => (
            <div key={item.id} className="account-favorite-item">
              <strong>{item.name}</strong>
              <span>¥{Number(item.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
