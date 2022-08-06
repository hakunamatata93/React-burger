import { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css';
import { useDispatch } from 'react-redux';
import { getIngridients } from '../../services/actions/ingridients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngridients());
    },
    [dispatch]
  ); 

  return(
    <div className={appStyles.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={appStyles.main}>
          <BurgerIngridients />
          <BurgerConstructor /> 
        </main>
      </DndProvider>
    </div>
  );
}

export default App;