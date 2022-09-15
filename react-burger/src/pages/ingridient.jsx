import { useParams } from 'react-router-dom';

import IngridientDetails from '../components/ingridient-details/ingridient-details';

import styles from './style.module.css';

export const IngridientPage = () => {

  const { id } = useParams();

  return (
    <div className={styles.modalPage}>
      <h1 className='text text_type_main-large mt-30'>Детали ингредиента</h1>
      <IngridientDetails id={ id }/>
    </div>
  );
  };