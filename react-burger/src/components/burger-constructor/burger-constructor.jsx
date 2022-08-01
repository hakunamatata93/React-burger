import React from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, useMemo } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import { cardPropTypes } from '../../utils/prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details'


const BASEURL= 'https://norma.nomoreparties.space/api';

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const ConstructorItem = ({ cardData }) => {
  const { image, price, name } = cardData;
  return(
    <div className={burgerConstructorStyles.item}>
      <DragIcon type="primary"/>
        <ConstructorElement
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

const ConstructorItems = ({ingridientData}) => {
  const bunData = ingridientData.find(item => item.type === 'bun');
  const sauceMainData = ingridientData.filter(item => item.type !== 'bun');
  return (    
    <ul className={`${burgerConstructorStyles.items} pl-4`}>
            <li className={`${burgerConstructorStyles.list} ml-5`}>
        {bunData
        ? 
          <ConstructorElement
          type="top"
          isLocked={true}
          text={bunData.name + ' (верх)'}
          price={bunData.price}
          thumbnail={bunData.image}
          key={bunData._id}
        />
        : ''}
    </li>
    <li className={`${burgerConstructorStyles.list} ${burgerConstructorStyles.window} custom-scroll`}>
      {sauceMainData.map(item => (
      <ConstructorItem key={item._id} cardData={item}/>
      ))}
    </li>
    <li className={`${burgerConstructorStyles.list} ml-5`}>
        {bunData
        ? 
          <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bunData.name + ' (низ)'}
          price={bunData.price}
          thumbnail={bunData.image}
          key={bunData._id}
      />
      : ''}
    </li>
  </ul>
  );
}

ConstructorItems.propTypes = {
  ingridientData: PropTypes.arrayOf(cardPropTypes).isRequired,
};

const OrderData = ({ingridientData}) => {
  const [modalActive, setModalActive] = useState(false);
  const [order, setOrder] = useState(null);

  const placeOrder = () => {
    fetch(`${BASEURL}/orders`, {
      method: 'POST',
      body: JSON.stringify({
        ingredients: ingridientData
      })
    })
    .then(checkResponse)
    .then((res) => {
      setOrder(res.order.number);
    })
    .catch((err) => console.log(err))
  };

  const openModal = () => {
    setModalActive(true);
    placeOrder();
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const modalOrder = (
    <Modal closing={closeModal}>
      <OrderDetails  />
    </Modal>
  );
  const totalPrice = useMemo(
    () => 
    ingridientData.reduce((acc, item) => acc + item.price, 0),
    [ingridientData]
  );
  return(
    <>
      <div className={`${burgerConstructorStyles.order} mt-10`}>
        <div className={`${burgerConstructorStyles.price} mr-10`}>
          <span className="text text_type_digits-medium mr-4">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {modalActive && modalOrder}
    </>

  );
}

OrderData.propTypes = {
  ingridientData: PropTypes.arrayOf(cardPropTypes).isRequired,
};
const BurgerConstructor = ({ ingridients }) => {
  
  return(
    <section className={`${burgerConstructorStyles.main} mt-25`}>
      <ConstructorItems ingridientData={ingridients} />
      <OrderData ingridientData={ingridients} />
    </section>
  );
}
BurgerConstructor.propTypes = {
  ingridients: PropTypes.arrayOf(cardPropTypes).isRequired,
};

export default BurgerConstructor;