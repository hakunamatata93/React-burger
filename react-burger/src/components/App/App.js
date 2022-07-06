import BurgerIngridients from "../burger-ingridients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppHeader from "../app-header/app-header";

import appStyles from './app.module.css';

const App = () => {
  return(
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngridients />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App; 
