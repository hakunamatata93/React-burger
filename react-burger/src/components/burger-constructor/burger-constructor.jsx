import React from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
//import { data } from '../../utils/data.js';
import burgerConstructorStyles from './burger-constructor.module.css';
import { cardPropTypes } from '../../utils/prop-types';
import Modal from '../modal/modal';
import bun02 from '../../images/bun-02.png'
import OrderDetails from '../order-details/order-details'

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
  const sauceMainData = props.ingridients.filter(item => item.type !== 'bun');
  return (    
    <ul className={`${burgerConstructorStyles.items} pl-4`}>
      <li className={`${burgerConstructorStyles.list} ml-6`}>
          <ConstructorElement
        type="top"
        isLocked={true}
        text='Краторная булка N-200i (верх)'
        price={20}
        thumbnail={bun02}
        />
    </li>
    <li className={`${burgerConstructorStyles.list} ${burgerConstructorStyles.window} custom-scroll`}>
      {sauceMainData.map(item => (
      <ConstructorItem key={item._id} cardData={item}/>
      ))}
    </li>
    <li className={`${burgerConstructorStyles.list} ml-6`}>
          <ConstructorElement
        type="bottom"
        isLocked={true}
        text='Краторная булка N-200i (низ)'
        price={20}
        thumbnail={bun02}
      />
    </li>
  </ul>
  );
}

ConstructorItems.propTypes = {
  ingridients: PropTypes.arrayOf(cardPropTypes).isRequired,
};

const Order = (props) => {
  const [modalActive, setModalActive] = React.useState(false);

  const openModal = () => {
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const modalOrder = (
    <Modal closing={closeModal}>
      <OrderDetails  />
    </Modal>
  );
  const totalPrice = props.ingridients.reduce((acc, item) => acc + item.price, 0)
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

const BurgerConstructor = (props) => {
  
  return(
    <section className={`${burgerConstructorStyles.main} mt-25`}>
      <ConstructorItems ingridients={props.ingridients} />
      <Order ingridients={props.ingridients} />
    </section>
  );
}
BurgerConstructor.propTypes = {
  ingridients: PropTypes.arrayOf(cardPropTypes).isRequired,
};

export default BurgerConstructor;