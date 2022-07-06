import React from "react";

import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngridientsStyles from './burger-ingridients.module.css';

import bun02 from '../../images/bun-02.png'

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

const Card = ({image, price, name }) => {
  return(
    <>
      <Counter />
      <article className={burgerIngridientsStyles.card}>
        <img src={bun02} alt={name} className='ml-4 mr-4 mb-1'/>
        <div className={`${burgerIngridientsStyles.priceItem} mt-1 mb-1`}>
          <span className='mr-1'>{price}20</span>
          <CurrencyIcon type='primary' />
        </div>
        <span className={burgerIngridientsStyles.name}>{name}Краторная булка</span>
        <Counter count={1} size="default" />
    </article>
    </>
  );
  }
const BurgerIngridients = ({data}) => {
  return(
    <>
    <h1>Соберите бургер</h1>
    <BurgerTabs />
    <h2>Булки</h2>
      <Card />
  </>
  )
}

export default BurgerIngridients;
