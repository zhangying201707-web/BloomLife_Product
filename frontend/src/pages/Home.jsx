import { useEffect, useState } from 'react';
import OccasionFilterCard from '../features/customerJourney/components/OccasionFilterCard';
import PricingCard from '../features/customerJourney/components/PricingCard';
import ProductComparisonCard from '../features/customerJourney/components/ProductComparisonCard';
import ProductInsightsCard from '../features/customerJourney/components/ProductInsightsCard';

export default function Home({
  products,
  allProducts = products,
  loading,
  onAddToCart,
  readonly = false,
  onFilteredProducts,
  onMessage,
}) {
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id ?? null);

  useEffect(() => {
    if (!products.length) {
      setSelectedProductId(null);
      return;
    }

    if (!products.some((product) => product.id === selectedProductId)) {
      setSelectedProductId(products[0].id);
    }
  }, [products, selectedProductId]);

  return (
    <section className="panel">
      <div className="section-title-row">
        <h2>Featured Bouquets</h2>
        <p>Curated by occasion, crafted fast after checkout</p>
      </div>

      {!readonly && (
        <div className="embedded-section">
          <div className="section-title-row embedded-title-row">
            <div>
              <h3>Discover Faster</h3>
              <p>Filter by budget, inspect trending picks, then compare your shortlist.</p>
            </div>
          </div>
          <div className="embedded-toolbar-grid">
            <OccasionFilterCard onFiltered={onFilteredProducts} onMessage={onMessage} />
            <ProductComparisonCard products={allProducts} onMessage={onMessage} />
          </div>
        </div>
      )}

      {loading && <p>Loading products...</p>}
      {!loading && products.length === 0 && <p>No products available</p>}

      <div className="shop-layout">
        <div className="shop-products-column">
          <div className="product-grid">
            {products.map((product) => (
              <article
                className={selectedProductId === product.id ? 'product-card is-selected' : 'product-card'}
                key={product.id}
              >
                <img src={product.image} alt={product.name} className="product-cover" />
                <div className="product-body">
                  <div className="product-meta">
                    <span>{product.category}</span>
                    <strong>¥{Number(product.price).toFixed(2)}</strong>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  {!readonly ? (
                    <div className="product-actions">
                      <button className="primary-btn" onClick={() => onAddToCart?.(product)}>
                        Add to Cart
                      </button>
                      <button className="ghost-btn" onClick={() => setSelectedProductId(product.id)}>
                        View Story
                      </button>
                    </div>
                  ) : (
                    <p className="hint-text">Log in to place an order</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {!readonly && (
          <aside className="shop-side-panel">
            <div className="embedded-section">
              <div className="section-title-row embedded-title-row">
                <div>
                  <h3>Selected Bouquet</h3>
                  <p>Price breakdown, detailed description, gallery angles and customer feedback.</p>
                </div>
              </div>
              <div className="embedded-side-stack">
                <PricingCard productId={selectedProductId} onMessage={onMessage} />
                <ProductInsightsCard
                  products={allProducts}
                  defaultProductId={selectedProductId}
                  onMessage={onMessage}
                />
              </div>
            </div>
          </aside>
        )}
      </div>

      {!readonly && products.length > 0 && (
        <div className="embedded-selection-row">
          <span className="hint-text">
            Current focus: {products.find((product) => product.id === selectedProductId)?.name || products[0]?.name}
          </span>
        </div>
      )}
    </section>
  );
}
