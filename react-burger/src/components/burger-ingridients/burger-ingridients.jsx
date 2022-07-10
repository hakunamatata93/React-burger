import React from "react";
import PropTypes from 'prop-types';

import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngridientsStyles from './burger-ingridients.module.css';
import Modal from '../modal/modal';
import IngridientDetails from '../ingridient-details/ingridient-details';

//import { data } from '../../utils/data.js';
import { cardPropTypes } from '../../utils/prop-types';

const BurgerTabs = () => {
  const [current, setCurrent] = React.useState('one')
    return (
      <div className={burgerIngridientsStyles.tab}>
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

  const [modalActive, setModalActive] = React.useState(false);

  const openModal = () => {
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const modalIngridients = (
    <Modal closing={closeModal}>
      <IngridientDetails ingridients={cardData}/>
    </Modal >
  );
  return(
    <>
     <article className={burgerIngridientsStyles.card} onClick={openModal}>
        <Counter count={1} size="default" />
        <img src={image} alt={name} className='ml-4 mr-4 mb-1'/>
        <div className={`${burgerIngridientsStyles.priceItem} mt-1 mb-1`}>
          <span className='mr-1'>{price}</span>
          <CurrencyIcon type='primary' />
        </div>
        <span className={burgerIngridientsStyles.name}>{name}</span>
      </article>
      {modalActive && modalIngridients}
    </>
  );
  }

  Card.propTypes = {
    cardData: cardPropTypes.isRequired,
  };

  const MenuList = (props) => {
    const typeData = props.ingridients.filter(item => item.type === props.type);
    return(
      <ul className={`${burgerIngridientsStyles.menuItems} pl-4 pr-4`}>
        {typeData.map(item => (
          <Card key={item._id} cardData={item} />
        ))}
      </ul>
    )
  }

const BurgerIngridients = (props) => {
  return(
    <div className={burgerIngridientsStyles.main}>
    <h1 className='mt-10 mb-5 text text_type_main-large'>Соберите бургер</h1>
    <BurgerTabs />
    <div className={`${burgerIngridientsStyles.window} custom-scroll`}>
      <ul className={burgerIngridientsStyles.menu}>
        <li>
          <h2 className='text text_type_main-medium mt-10 mb-6'>Булки</h2>
          <MenuList type='bun' ingridients={props.ingridients}/>
        </li>
        <li>
          <h2 className='text text_type_main-medium mt-10 mb-6'>Соусы</h2>
          <MenuList type='sauce' ingridients={props.ingridients}/>
        </li>
        <li>
          <h2 className='text text_type_main-medium mt-10 mb-6'>Начинки</h2>
          <MenuList type='main' ingridients={props.ingridients}/>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default BurgerIngridients;
