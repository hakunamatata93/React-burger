import { useParams } from 'react-router-dom';

import OrderDetails from '../components/order-details/order-details';

import styles from './style.module.css';

export const OrderDetailsPage = () => {


  return (
    <div className={styles.modalPage}>
      <OrderDetails/>
    </div>
  );
  };