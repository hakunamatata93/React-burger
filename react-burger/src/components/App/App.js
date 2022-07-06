import React from "react";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

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