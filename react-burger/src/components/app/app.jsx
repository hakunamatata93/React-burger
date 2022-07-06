import BurgerIngridients from "../burger-ingridients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppHeader from "../app-header/app-header";


import appStyles from './app.module.css';

const App = () => {
  return(
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngridients />
        <BurgerConstructor />
      </main>
    </div>
  );
};
export default App;
