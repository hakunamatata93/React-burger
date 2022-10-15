import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerIngridients from '../components/burger-ingridients/burger-ingridients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';

import appStyles from '../components/app/app.module.css';

export const HomePage = () => {

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={appStyles.main}>
        <BurgerIngridients />
        <BurgerConstructor /> 
      </main>
    </DndProvider>
  );
};