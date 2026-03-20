import { useMemo, useState } from 'react';
import DeliveryDetailsForm from '../features/customerJourney/components/DeliveryDetailsForm';
import GiftPicker from '../features/customerJourney/components/GiftPicker';
import GreetingCardForm from '../features/customerJourney/components/GreetingCardForm';
import WrappingStyleCard from '../features/customerJourney/components/WrappingStyleCard';
import CheckoutEnhancementsCard from '../features/customerJourney/components/CheckoutEnhancementsCard';

export default function Cart({ cart, onCheckout, onRemove, onUpdateQuantity, onMessage, userId }) {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [note, setNote] = useState('');

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [cart]
  );

  function submitOrder() {
    if (!deliveryAddress.trim()) return;
    onCheckout(deliveryAddress.trim(), note.trim());
    setDeliveryAddress('');
    setNote('');
  }

  return (
    <section className="panel">
      <div className="section-title-row">
        <h2>Shopping Cart</h2>
        <p>Confirm delivery details and submit your order</p>
      </div>

      {cart.length === 0 && <p>Your cart is empty. Start shopping from the home page.</p>}

      {cart.length > 0 && (
        <>
          <div className="checkout-layout">
            <div className="checkout-main-column">
              <div className="embedded-section">
                <div className="section-title-row embedded-title-row">
                  <div>
                    <h3>Cart Items</h3>
                    <p>Review bouquet choices before you personalize the order.</p>
                  </div>
                </div>
                <div className="cart-list">
                  {cart.map((item) => (
                    <article key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-main">
                        <h3>{item.name}</h3>
                        <p>Unit Price ¥{Number(item.price).toFixed(2)}</p>
                      </div>
                      <div className="cart-item-controls">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
                        />
                        <button className="danger-btn" onClick={() => onRemove(item.id)}>
                          Remove
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="embedded-section">
                <div className="section-title-row embedded-title-row">
                  <div>
                    <h3>Personalize The Gift</h3>
                    <p>Configure wrapping, greeting cards, saved messages and add-ons in context.</p>
                  </div>
                </div>
                <div className="embedded-toolbar-grid checkout-tools-grid">
                  <GreetingCardForm userId={userId} onMessage={onMessage} />
                  <GiftPicker productId={cart[0]?.id} onMessage={onMessage} />
                  <WrappingStyleCard productId={cart[0]?.id} onMessage={onMessage} />
                </div>
              </div>

              <div className="embedded-section">
                <div className="section-title-row embedded-title-row">
                  <div>
                    <h3>Delivery & Time Window</h3>
                    <p>Save recipient details and choose when the flowers should arrive.</p>
                  </div>
                </div>
                <DeliveryDetailsForm onMessage={onMessage} />
              </div>
            </div>

            <aside className="checkout-side-column">
              <div className="checkout-box">
                <h3>Checkout Summary</h3>
                <p className="total-price">Total: ¥{total.toFixed(2)}</p>
                <input
                  className="text-input"
                  placeholder="Delivery address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
                <textarea
                  className="text-input"
                  rows="3"
                  placeholder="Order note (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <CheckoutEnhancementsCard subtotal={total} onMessage={onMessage} />
                <button className="primary-btn" onClick={submitOrder}>
                  Place Order
                </button>
              </div>
            </aside>
          </div>
        </>
      )}
    </section>
  );
}
