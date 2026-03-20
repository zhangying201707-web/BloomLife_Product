import { useEffect, useState } from 'react';
import { getProductDetails, getProductGallery, getProductReviews } from '../api';

export default function ProductInsightsCard({ products, defaultProductId, onMessage }) {
  const [productId, setProductId] = useState('');
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultProductId) {
      setProductId(String(defaultProductId));
      return;
    }

    if (products[0]?.id) {
      setProductId(String(products[0].id));
    }
  }, [defaultProductId, products]);

  async function loadInsights() {
    if (!productId) {
      onMessage?.('Please choose a product first');
      return;
    }

    setLoading(true);
    try {
      const [detailsRes, reviewsRes, galleryRes] = await Promise.all([
        getProductDetails(productId),
        getProductReviews(productId),
        getProductGallery(productId),
      ]);
      setDetails(detailsRes.data);
      setReviews(reviewsRes.data);
      setGallery(galleryRes.data || []);
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="journey-card">
      <h3>Product Details & Reviews</h3>
      <p className="hint-text">US-004, US-005, US-006</p>
      <select className="text-input" value={productId} onChange={(e) => setProductId(e.target.value)}>
        <option value="">Choose a product</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      <button className="primary-btn" onClick={loadInsights} disabled={loading}>
        {loading ? 'Loading...' : 'Load Product Story'}
      </button>
      {details && (
        <div className="journey-list">
          <p>
            <strong>Description:</strong> {details.description}
          </p>
          <p>
            <strong>Included:</strong> {details.included.join(', ')}
          </p>
          <p>
            <strong>Reviews:</strong> {reviews.rating} stars from {reviews.reviewCount} customers
          </p>
          {reviews.items.slice(0, 2).map((item) => (
            <p key={item.id}>
              {item.author}: "{item.comment}"
            </p>
          ))}
          <p>
            <strong>Angles:</strong> {gallery.map((item) => item.angle).join(', ')}
          </p>
        </div>
      )}
    </article>
  );
}
