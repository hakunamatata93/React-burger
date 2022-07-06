import React from "react";

import AppHeader from "../app-header/app-header";
import BurgerIngridients from "../burger-ingridients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const App = () => {
  return(
    <>
      <AppHeader />
      <BurgerIngridients />
      <BurgerConstructor />
    </>
  );
}

export default App;