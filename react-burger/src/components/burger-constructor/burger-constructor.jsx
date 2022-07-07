import React from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data.js';
import burgerConstructorStyles from './burger-constructor.module.css';
import { cardPropTypes } from '../../utils/prop-types';

const ConstructorItem = ({ cardData }) => {
  const { image, price, name } = cardData;
  return(
    <div className={burgerConstructorStyles.item}>
      <DragIcon type="primary"/>
        <ConstructorElement
          // type="top"
          // isLocked={true}
          text={name}
          price={price}
          thumbnail={image}
        />
      </div>
  );
}

ConstructorItem.propTypes = {
  cardData: cardPropTypes.isRequired,
};

const ConstructorItems = () => {
  const bunData = data.filter(item => item.type === 'bun');
  const sauceMainData = data.filter(item => item.type !== 'bun');
  return (    
    <ul className={`${burgerConstructorStyles.items} pl-4`}>
    <li className={`${burgerConstructorStyles.list} ml-5`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={bunData[0].name + ' (верх)'}
        price={bunData[0].price}
        thumbnail={bunData[0].image}
      />
    </li>
    <li className={`${burgerConstructorStyles.list} ${burgerConstructorStyles.window} custom-scroll`}>
      {sauceMainData.map(item => (
      <ConstructorItem key={item._id} cardData={item}/>
      ))}
    </li>
    <li className='ml-3'>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={bunData[0].name + ' (низ)'}
        price={bunData[0].price}
        thumbnail={bunData[0].image}
      />
    </li>
  </ul>
  );
}

const Order = () => {
  const totalPrice = data.reduce((acc, item) => acc + item.price, 0)
  return(
    <div className={`${burgerConstructorStyles.order} mt-25`}>
      <div className={`${burgerConstructorStyles.price} mr-10`}>
        <span className="text text_type_digits-medium mr-4">{totalPrice}</span>
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