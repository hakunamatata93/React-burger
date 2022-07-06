import React from "react";

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';



const BurgerTabs = () => {
  const [current, setCurrent] = React.useState('one')
    return (
      <>
        <div style={{ display: 'flex' }}>
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
      </>
    )
}

const BurgerIngridients = () => {
  return(
    <>
    <h1>Соберите бургер</h1>
    <BurgerTabs />
  </>

  );
}

export default BurgerIngridients;