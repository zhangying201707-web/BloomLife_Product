import AvailabilityCard from '../features/customerJourney/components/AvailabilityCard';
import OrderTracker from '../features/customerJourney/components/OrderTracker';

export default function Orders({ orders, onMessage }) {
  return (
    <section className="panel orders-panel">
      <div className="section-title-row">
        <h2>Orders</h2>
        <p>Track delivery progress and check serviceability by ZIP code</p>
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
          <p>Time: {new Date(order.createdAt).toLocaleString()}</p>
        </article>
      ))}

      <div className="journey-grid" style={{ marginTop: 14 }}>
        <OrderTracker onMessage={onMessage} />
        <AvailabilityCard productId={1} onMessage={onMessage} />
      </div>
    </section>
  );
}
