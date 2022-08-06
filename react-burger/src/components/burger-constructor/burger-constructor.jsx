import { useState, useMemo, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import { cardPropTypes } from '../../utils/prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { PlaceOrderContext } from '../../services/burger-constructor-context';
import { DataContext } from '../../services/app-context';
import { BASEURL, checkResponse } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { postOrder } from '../../services/actions/order';
import { ADD_INGRIDIENT, DELETE_INGRIDIENT, REPLACE_BUN } from '../../services/actions/constructor';
import { useDrag, useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';


const ConstructorItem = ({ cardData, cardKey, index, moveCard }) => {
  const { image, price, name, type } = cardData;

  /*
  const [, dragRef] = useDrag({
    type: 'item',
    item: { card, index },
    
  });
  */


  const dispatch = useDispatch();

  const deleteIngridient = () => {
    dispatch({
      type: DELETE_INGRIDIENT,
      key: cardKey
    })
  };

  return(
    <div 
    //ref={dragRef}
      className={burgerConstructorStyles.item}>
        <DragIcon type="primary"/>
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
          //_id={_id}
          index={index}
          handleClose={() => deleteIngridient()}
        />
    </div> 
  )
}


const ConstructorItems = () => {

  const { ingridients } = useSelector(store => store.ingridients);
  const { constructorItems, constructorBun } = useSelector(store => store.constructorItems);
  console.log(constructorItems)
  console.log(constructorBun)
  
  const bunData = ingridients.find(item => item.type === 'bun');


  const dispatch = useDispatch();

  const onDropHandler = (item) => {
    console.log(item)
    const isBun = item.type === 'bun';
    dispatch({ 
      type: isBun ? REPLACE_BUN : ADD_INGRIDIENT, 
      id: item.id,
      key: uuidv4()
    });
  };

  const [, dropTarget] = useDrop({
    accept: 'ingridient',
    drop(item) {
      onDropHandler(item);
    },
  });

  /*
  const sauceMainData = constructorItems.filter(item => item.type !== 'bun');
  */

  const sauceMainData = constructorItems.map((item, index) => {
    const ingridient = ingridients.find(
      el => el.type !== 'bun' && el._id === item.id
    );
    return (
      ingridient &&
      <ConstructorItem
        key={item.key}
        card={ingridient}
        cardKey={item.key}
        index={index}
      />
    )
  });


  return (
    <ul className={`${burgerConstructorStyles.items} pl-4`} ref={dropTarget}>
      <li className={`${burgerConstructorStyles.list} ml-5`}>
        {bunData
        ? 
          <ConstructorElement
            type='top'
            isLocked={true}
            text={bunData.name + ' (верх)'}
            price={bunData.price}
            thumbnail={bunData.image}
            key={bunData._id}
          />
          : ''}
      </li>
      
      
      <li className={`${burgerConstructorStyles.list} ${burgerConstructorStyles.window} custom-scroll`}>
        {sauceMainData}
      </li>
      

      <li className={`${burgerConstructorStyles.list} ml-5`}>
        {bunData
        ? 
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={bunData.name + ' (низ)'}
            price={bunData.price}
            thumbnail={bunData.image}
            //key={bunData._id}
            key={bunData._id + 'bottom'}
        />
        : ''}
      </li>
    </ul>
  );
}


const OrderTotal = () => {

  const ingridients = useSelector(store => store.ingridients.ingridients);
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setModalActive(true);
    dispatch(postOrder(ingridients)); // отправляем данные заказа
  };

  const closeModal = () => {
    setModalActive(false);
  };
  
  const modalOrder = (
    <Modal closing={closeModal}>
        <OrderDetails  />
    </Modal >
  );

  const bunData = ingridients.find(item => item.type === 'bun');
  const sauceMainData = ingridients.filter(item => item.type !== 'bun');
  
  const bunDataPrice = bunData ? bunData.price*2 : 0;

  const total = useMemo(
    () => 
    sauceMainData.reduce((acc, item) => acc + item.price, 0) + bunDataPrice,
  [sauceMainData, bunDataPrice]
  )

  return(
    <>
      <div className={`${burgerConstructorStyles.order} mt-10`}>
        <div className={`${burgerConstructorStyles.price} mr-10`}>
          <span className="text text_type_digits-medium mr-4">{total}</span>
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


const BurgerConstructor = () => {

  //const ingridients = useContext(DataContext);
  //const ingridients = useSelector(store => store.ingridients.ingridients);

  return(
    <section className={`${burgerConstructorStyles.main} mt-25`}>
      <ConstructorItems />
      <OrderTotal />
    </section>
  );
}


export default BurgerConstructor;