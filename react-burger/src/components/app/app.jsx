import React, { useEffect, useState } from "react";
import BurgerIngridients from "../burger-ingridients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppHeader from "../app-header/app-header";


import appStyles from './app.module.css';

const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
    .then(checkResponse)
    .then((data) => {
      console.log(data);
    })
  }, [])
  
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
