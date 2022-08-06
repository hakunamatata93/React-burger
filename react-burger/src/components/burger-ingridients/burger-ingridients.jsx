import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngridientDetails from '../ingridient-details/ingridient-details';
import burgerIngridientsStyles from './burger-ingridients.module.css';
import { cardPropTypes } from '../../utils/prop-types';
import { DataContext } from '../../services/app-context';
import { useSelector, useDispatch } from 'react-redux';
import { OPEN_MODAL, CLOSE_MODAL } from '../../services/actions/currentIngridient';
import { getCurrentIngridient } from '../../services/actions/currentIngridient';
import { useDrag } from "react-dnd";


const BurgerTabs = () => {
  const [current, setCurrent] = useState('one')
    return (
      <div className={burgerIngridientsStyles.tab}>
        <Tab value='one' active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    );
}

const Card = ({ cardData }) => {
  const { image, price, name, type, id } = cardData;
  
  const [modalActive, setModalActive] = useState(false);

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { id, type },

  });
  
  const dispatch = useDispatch();

  const openModal = () => {
    setModalActive(true);
    dispatch(getCurrentIngridient(cardData))
  };

  const closeModal = () => {
    setModalActive(false);
    dispatch({type: CLOSE_MODAL});
  };

  const modalIngridients = (
    <Modal title='Детали ингредиента' closing={closeModal}>
      <IngridientDetails ingridient={cardData}/>
    </Modal >
  );

  return(
    <>
        <article className={burgerIngridientsStyles.card} 
        onClick={openModal}
        ref={dragRef}
        >
        <Counter count={1} size="default" />
        <img src={image} alt={name} className='ml-4 mr-4 mb-1'/>
        <div className={`${burgerIngridientsStyles.priceItem} mt-1 mb-1`}>
          <span className='text text_type_digits-default mr-1'>{price}</span>
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

const MenuList = ({ ingridientData, type }) => {
  const typeData = ingridientData.filter(item => item.type === type);

  return(
    <div className={`${burgerIngridientsStyles.menuItems}`}>
      {typeData.map(item => (
        <Card key={item._id} cardData={item} />
      ))}
    </div>
  );
}

MenuList.propTypes = {
  ingridientData: PropTypes.arrayOf(cardPropTypes).isRequired,
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
};

const BurgerIngridients = () => {

  const ingridients = useSelector(store => store.ingridients.ingridients);

  return(
    <section className={burgerIngridientsStyles.main}>
      <h1 className='mt-10 mb-5 text text_type_main-large'>Соберите бургер</h1>
      <BurgerTabs />
      <div className={`${burgerIngridientsStyles.window} custom-scroll`}>
        <ul className={burgerIngridientsStyles.menu}>
          <li>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Булки</h2>
            <MenuList type='bun' ingridientData={ingridients} />
          </li>
          <li>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Соусы</h2>
            <MenuList type='sauce' ingridientData={ingridients} />
          </li>
          <li>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Начинки</h2>
            <MenuList type='main' ingridientData={ingridients} />
          </li>
        </ul>
      </div>
    </section>
  );
}

export default BurgerIngridients;