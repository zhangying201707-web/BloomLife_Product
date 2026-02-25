import { useMemo, useState } from 'react';

export default function Cart({ cart, onCheckout, onRemove, onUpdateQuantity }) {
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

          <div className="checkout-box">
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
            <button className="primary-btn" onClick={submitOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </section>
  );
}
