import React from "react";

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data.js';
import icon from '../../images/burger-constructor_icon.svg';
import burgerConstructorStyles from './burger-constructor.module.css';

const ConstructorItem = ({ cardData }) => {
  const { image, price, name } = cardData;
  return(
    <li className={burgerConstructorStyles.item}>
        <img src={icon} alt='иконка меню' className={`${burgerConstructorStyles.icon} mr-2`}/>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={name}
          price={price}
          thumbnail={image}
        />
      </li>
  );
}

const ConstructorItems = () => {
  return (
    <ul className={burgerConstructorStyles.items}>
      {data.map(item => (
        <ConstructorItem key={item._id} cardData={item}/>
        ))}
    </ul>
  );
}

const Order = () => {
  return(
    <div className={`${burgerConstructorStyles.main} mt-25`}>
      <div className={`${burgerConstructorStyles.price} mr-10`}>
        <span className="text text_type_digits-medium mr-4">610</span>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large">
        Оформить заказ
      </Button>
    </div>

  );
}

const BurgerConstructor = () => {
  return(
    <section className={`${burgerConstructorStyles.main} mt-25`}>
      <ConstructorItems />
      <Order />
    </section>
  );
}

export default BurgerConstructor;