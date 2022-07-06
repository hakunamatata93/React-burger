import React from "react";

import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngridientsStyles from './burger-ingridients.module.css';

import { data } from '../../utils/data.js';

const BurgerTabs = () => {
  const [current, setCurrent] = React.useState('one')
    return (
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
    )
}

const Card = ({cardData}) => {
  const { image, price, name } = cardData;
  return(
    <>
      <Counter />
      <article className={burgerIngridientsStyles.card}>
        <img src={image} alt={name} className='ml-4 mr-4 mb-1'/>
        <div className={`${burgerIngridientsStyles.priceItem} mt-1 mb-1`}>
          <span className='mr-1'>{price}</span>
          <CurrencyIcon type='primary' />
        </div>
        <span className={burgerIngridientsStyles.name}>{name}</span>
        <Counter count={1} size="default" />
    </article>
    </>
  );
  }

  const MenuList = (props) => {
    const typeData = data.filter(item => item.type === props.type);
    return(
      <ul className={burgerIngridientsStyles.menuItems}>
        {typeData.map(item => (
          <Card key={item._id} cardData={item} />
        ))}
      </ul>
    )
  }

const BurgerIngridients = ({}) => {
  return(
    <div className={burgerIngridientsStyles.main}>
    <h1>Соберите бургер</h1>
    <BurgerTabs />
    <ul className={burgerIngridientsStyles.menuList}>
        <li>
          <h2>Булки</h2>
          <MenuList type='bun' />
        </li>
        <li>
          <h2>Соусы</h2>
          <MenuList type='sauce' />
        </li>
        <li>
          <h2>Начинки</h2>
          <MenuList type='main' />
        </li>
      </ul>
  </div>
  )
}

export default BurgerIngridients;
