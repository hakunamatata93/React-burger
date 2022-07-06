import BurgerIngridients from "../burger-ingridients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppHeader from "../app-header/app-header";
import { data } from '../../utils/data.js';

import appStyles from './app.module.css';

const App = () => {
  return(
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngridients data={data}/>
        <BurgerConstructor data={data}/>
      </main>
    </>
  );
};
export default App;
