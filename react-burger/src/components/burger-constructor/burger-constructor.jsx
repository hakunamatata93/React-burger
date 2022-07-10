import React from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
//import { data } from '../../utils/data.js';
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

const ConstructorItems = (props) => {
  const bunData = props.ingridients.filter(item => item.type === 'bun');
  const sauceMainData = props.ingridients.filter(item => item.type !== 'bun');
  return (    
    <ul className={`${burgerConstructorStyles.items} pl-4`}>
  <li className={`${burgerConstructorStyles.list} ml-3`}>
        {bunData.map(item => (
          <ConstructorElement
        type="top"
        isLocked={true}
        text={item.name + ' (верх)'}
        price={item.price}
        thumbnail={item.image}
        key={item._id}
      />
      ))}
    </li>
    <li className={`${burgerConstructorStyles.list} ${burgerConstructorStyles.window} custom-scroll`}>
      {sauceMainData.map(item => (
      <ConstructorItem key={item._id} cardData={item}/>
      ))}
    </li>
    <li className={`${burgerConstructorStyles.list} ml-3`}>
        {bunData.map(item => (
          <ConstructorElement
        type="bottom"
        isLocked={true}
        text={item.name + ' (низ)'}
        price={item.price}
        thumbnail={item.image}
        key={item._id}
      />
      ))}
    </li>
  </ul>
  );
}

const Order = (props) => {
  const totalPrice = props.ingridients.reduce((acc, item) => acc + item.price, 0)
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

const BurgerConstructor = (props) => {
  
  return(
    <section className={`${burgerConstructorStyles.main} mt-25`}>
      <ConstructorItems ingridients={props.ingridients} />
      <Order ingridients={props.ingridients} />
    </section>
  );
}

export default BurgerConstructor;