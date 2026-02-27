import OccasionFilterCard from './components/OccasionFilterCard';
import PricingCard from './components/PricingCard';
import AvailabilityCard from './components/AvailabilityCard';
import GreetingCardForm from './components/GreetingCardForm';
import GiftPicker from './components/GiftPicker';
import DeliveryDetailsForm from './components/DeliveryDetailsForm';
import OrderTracker from './components/OrderTracker';
import NotificationCenter from './components/NotificationCenter';

export default function CustomerJourneyPanel({
  user,
  selectedProduct,
  cartCount,
  onFilteredProducts,
  onMessage,
  onOpenCart,
  onOpenOrders,
}) {
  return (
    <section className="panel journey-panel">
      <div className="section-title-row">
        <h2>Customer Journey Features</h2>
        <p>US-001 / 002 / 006 / 007 / 011 / 012 / 016 / 017 / 021 / 022</p>
      </div>

      <div className="journey-grid">
        <OccasionFilterCard onFiltered={onFilteredProducts} onMessage={onMessage} />
        <PricingCard productId={selectedProduct?.id} onMessage={onMessage} />
        <AvailabilityCard productId={selectedProduct?.id} onMessage={onMessage} />
        <GreetingCardForm onMessage={onMessage} />
        <GiftPicker productId={selectedProduct?.id} onMessage={onMessage} />
        <DeliveryDetailsForm onMessage={onMessage} />
        <OrderTracker onMessage={onMessage} />
        <NotificationCenter userId={user?.userId} onMessage={onMessage} />

        <article className="journey-card">
          <h3>Cart & Checkout</h3>
          <p className="hint-text">US-016</p>
          <p>Items in cart: {cartCount}</p>
          <button className="primary-btn" onClick={onOpenCart}>
            Open Cart
          </button>
        </article>

        <article className="journey-card">
          <h3>My Orders</h3>
          <p className="hint-text">US-021</p>
          <button className="primary-btn" onClick={onOpenOrders}>
            Open Orders
          </button>
        </article>
      </div>
    </section>
  );
}
