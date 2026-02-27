import OccasionFilterCard from '../features/customerJourney/components/OccasionFilterCard';
import PricingCard from '../features/customerJourney/components/PricingCard';

export default function Home({
  products,
  loading,
  onAddToCart,
  readonly = false,
  onFilteredProducts,
  onMessage,
}) {
  return (
    <section className="panel">
      <div className="section-title-row">
        <h2>Featured Bouquets</h2>
        <p>Curated by occasion, crafted fast after checkout</p>
      </div>
      {loading && <p>Loading products...</p>}
      {!loading && products.length === 0 && <p>No products available</p>}
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-cover" />
            <div className="product-body">
              <div className="product-meta">
                <span>{product.category}</span>
                <strong>¥{Number(product.price).toFixed(2)}</strong>
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              {!readonly ? (
                <button className="primary-btn" onClick={() => onAddToCart?.(product)}>
                  Add to Cart
                </button>
              ) : (
                <p className="hint-text">Log in to place an order</p>
              )}
            </div>
          </article>
        ))}
      </div>

      {!readonly && (
        <div className="journey-grid" style={{ marginTop: 16 }}>
          <OccasionFilterCard onFiltered={onFilteredProducts} onMessage={onMessage} />
          <PricingCard productId={products[0]?.id} onMessage={onMessage} />
        </div>
      )}
    </section>
  );
}
