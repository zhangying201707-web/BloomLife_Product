import AvailabilityCard from '../features/customerJourney/components/AvailabilityCard';
import DeliveryAssuranceCard from '../features/customerJourney/components/DeliveryAssuranceCard';
import OrderTracker from '../features/customerJourney/components/OrderTracker';
import SubscriptionSupportCard from '../features/customerJourney/components/SubscriptionSupportCard';

export default function Orders({ orders, onMessage, user, onReorder }) {
  return (
    <section className="panel orders-panel">
      <div className="section-title-row">
        <h2>Orders</h2>
        <p>Track delivery progress and check serviceability by ZIP code</p>
      </div>

      <div className="order-layout">
        <div className="order-main-column">
          <div className="embedded-section">
            <div className="section-title-row embedded-title-row">
              <div>
                <h3>Recent Orders</h3>
                <p>Review history, then track the latest shipment when you need an update.</p>
              </div>
            </div>
            {orders.length === 0 && <p>No orders yet. Start shopping from the shop page.</p>}
            {orders.map((order) => (
              <article key={order.id} className="order-item">
                <div>
                  <strong>Order #{order.id}</strong>
                  <span className="order-status">{order.status}</span>
                </div>
                <p>Total: ¥{Number(order.totalAmount).toFixed(2)}</p>
                <p>Address: {order.deliveryAddress}</p>
                <p>Items: {(order.items || []).map((item) => `${item.name} x${item.quantity || 1}`).join(', ')}</p>
                <p>Time: {new Date(order.createdAt).toLocaleString()}</p>
                <button className="ghost-btn inline-btn" onClick={() => onReorder?.(order.items || [])}>
                  Reorder Items
                </button>
              </article>
            ))}
          </div>

          <div className="embedded-section">
            <div className="section-title-row embedded-title-row">
              <div>
                <h3>Tracking & Availability</h3>
                <p>Track a specific order and confirm whether a ZIP code is currently serviceable.</p>
              </div>
            </div>
            <div className="embedded-toolbar-grid">
              <OrderTracker onMessage={onMessage} />
              <AvailabilityCard productId={1} onMessage={onMessage} />
              <DeliveryAssuranceCard orders={orders} onMessage={onMessage} />
            </div>
          </div>
        </div>

        <aside className="order-side-column">
          <div className="embedded-section">
            <div className="section-title-row embedded-title-row">
              <div>
                <h3>Keep Fresh Flowers Coming</h3>
                <p>Subscription and support live beside your order history, where users naturally look for help.</p>
              </div>
            </div>
            <SubscriptionSupportCard userId={user?.userId} onMessage={onMessage} />
          </div>
        </aside>
      </div>
    </section>
  );
}
