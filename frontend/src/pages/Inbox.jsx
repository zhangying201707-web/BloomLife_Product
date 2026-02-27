import NotificationCenter from '../features/customerJourney/components/NotificationCenter';

export default function Inbox({ user, onMessage }) {
  return (
    <section className="panel orders-panel">
      <div className="section-title-row">
        <h2>Inbox</h2>
        <p>Order notifications and customer alerts</p>
      </div>
      <div className="journey-grid">
        <NotificationCenter userId={user?.userId} onMessage={onMessage} />
      </div>
    </section>
  );
}
