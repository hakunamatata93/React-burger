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
import { useDrag, useDrop } from "react-dnd";


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
  const { image, price, name, type, _id: id, __v } = cardData;
  const { constructorItems, constructorBun } = useSelector(store => store.constructorItems);
  const { ingridients } = useSelector(store => store.ingridients);
  

  const [, dragRef] = useDrag({
    type: 'ingridient',
    item: { id, type },
  });
  const [modalActive, setModalActive] = useState(false);

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
      <IngridientDetails/>
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

const MenuList = ({  type }) => {
  const { ingridients } = useSelector(store => store.ingridients);
  const typeData = ingridients.filter(item => item.type === type);

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
  const [, drop] = useDrop(() => ({ accept: 'item' }));

  return(
    <section className={burgerIngridientsStyles.main} ref={drop}>
      <h1 className='mt-10 mb-5 text text_type_main-large'>Соберите бургер</h1>
      <BurgerTabs />
      <div className={`${burgerIngridientsStyles.window} custom-scroll`}>
        <ul className={burgerIngridientsStyles.menu}>
          <li>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Булки</h2>
            <MenuList type='bun' />
          </li>
          <li>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Соусы</h2>
            <MenuList type='sauce'/>
          </li>
          <li>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Начинки</h2>
            <MenuList type='main'/>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default BurgerIngridients;