import AdminConsoleCard from '../features/customerJourney/components/AdminConsoleCard';

export default function Admin({ onMessage }) {
  return (
    <section className="panel orders-panel">
      <div className="section-title-row">
        <h2>Admin</h2>
        <p>Manage products and update order statuses for sprint verification</p>
      </div>
      <div className="journey-grid">
        <AdminConsoleCard onMessage={onMessage} />
      </div>
    </section>
  );
}
