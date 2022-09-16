import { OrdersFeed } from '../components/orders-feed/orders-feed';
import { OrdersStatus } from '../components/orders-status/orders-status';

import styles from './style.module.css';

export const FeedPage = () => {

  return (
    <main>
      <h2>Лента заказов</h2>
      <div className={styles.feed}>
        <OrdersFeed />
        <OrdersStatus />
      </div>
    </main>
  );
};
