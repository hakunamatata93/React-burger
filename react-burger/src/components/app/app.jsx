import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css';
import { DataContext } from '../../services/app-context';
import { BASEURL, checkResponse } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { getIngridients } from '../../services/actions/ingridients';

const App = () => {
  //const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngridients());
    },
    [dispatch]
  ); 

  return(
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngridients />
        <BurgerConstructor /> 
      </main>
    </div>
  );
}

export default App;