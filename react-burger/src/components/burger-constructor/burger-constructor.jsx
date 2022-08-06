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


const ConstructorItem = ({ cardData }) => {
  const { image, price, name } = cardData;
  return(
    <div 
      className={burgerConstructorStyles.item}>
        <DragIcon type="primary"/>
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
        />
    </div> 
  )
}

ConstructorItem.propTypes = {
  cardData: cardPropTypes.isRequired,
};


const ConstructorItems = ({ ingridientData }) => {

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


const OrderTotal = ({ ingridientData }) => {

  const [modalActive, setModalActive] = useState(false);
  const [order, setOrder] = useState(null);

  /*
  const PlaceOrder = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getOrder());
      },
      [dispatch]
    ); 
  };
  const placeOrder = () => {
    const ingridientsId = ingridientData.map(el => el._id);
    fetch(`${BASEURL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingridients: ingridientsId
      })
    })
    .then(checkResponse)
    .then((res) => {
      setOrder(res.order.number);
      console.log(res)
    })
    .catch((err) => console.log(err))
  };
  */

  const dispatch = useDispatch();

  const openModal = () => {
    setModalActive(true);
    dispatch(postOrder(ingridientData));; // отправляем данные заказа
  };

  const closeModal = () => {
    setModalActive(false);
  };
  
  // сюда передаю контекст-провайдер заказа
  const modalOrder = (
    <Modal closing={closeModal}>
      
        <OrderDetails  />
     
    </Modal >
  );

  const bunData = ingridientData.find(item => item.type === 'bun');
  const sauceMainData = ingridientData.filter(item => item.type !== 'bun');
  
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

OrderTotal.propTypes = {
  ingridientData: PropTypes.arrayOf(cardPropTypes).isRequired,
};

const BurgerConstructor = () => {

  // const ingridients = useContext(DataContext);

  const ingridients = useSelector(store => store.ingridients.ingridients);

  return(
    <section className={`${burgerConstructorStyles.main} mt-25`}>
      <ConstructorItems ingridientData={ingridients} />
      <OrderTotal ingridientData={ingridients} />
    </section>
  );
}


export default BurgerConstructor;