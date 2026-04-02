import AccountCenterCard from '../features/customerJourney/components/AccountCenterCard';
import NotificationCenter from '../features/customerJourney/components/NotificationCenter';
import SubscriptionManagerCard from '../features/customerJourney/components/SubscriptionManagerCard';
import SubscriptionSupportCard from '../features/customerJourney/components/SubscriptionSupportCard';
import SupportHubCard from '../features/customerJourney/components/SupportHubCard';

export default function Inbox({ user, onMessage, products, onProfileUpdated }) {
  return (
    <section className="panel orders-panel">
      <div className="section-title-row">
        <h2>Inbox</h2>
        <p>Order notifications and customer alerts</p>
      </div>
      <div className="journey-grid">
        <NotificationCenter userId={user?.userId} onMessage={onMessage} />
        <SubscriptionManagerCard userId={user?.userId} onMessage={onMessage} />
        <AccountCenterCard
          user={user}
          products={products}
          onMessage={onMessage}
          onProfileUpdated={onProfileUpdated}
        />
        <SupportHubCard userId={user?.userId} onMessage={onMessage} />
        <SubscriptionSupportCard userId={user?.userId} onMessage={onMessage} />
      </div>
    </section>
  );
}
