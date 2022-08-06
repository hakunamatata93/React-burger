import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngridientDetails from '../ingridient-details/ingridient-details';
import burgerIngridientsStyles from './burger-ingridients.module.css';
import { cardPropTypes } from '../../utils/prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_MODAL } from '../../services/actions/currentIngridient';
import { getCurrentIngridient } from '../../services/actions/currentIngridient';
import { useDrag } from 'react-dnd';


const Card = ({ cardData, count }) => {
  const { image, price, name, _id: id } = cardData;
  
  const [, dragRef] = useDrag({
    type: 'ingridient',
    item: cardData,
  });

  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setModalActive(true);
    dispatch(getCurrentIngridient(cardData))    
  };

  const closeModal = () => {
    setModalActive(false);
    dispatch({
      type: CLOSE_MODAL
    }); 
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
        {(count > 0) && (<Counter count={count} size="default" />)}
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
};

Card.propTypes = {
  cardData: cardPropTypes.isRequired,
  count: PropTypes.number,
};


const MenuList = ({ type }) => {

  const { constructorItems, bun } = useSelector(store => store.constructorItems);

  const counter = useMemo(() => {
    const counts = {};

    constructorItems.forEach((item) => {
      if (!counts[item._id]) {
        counts[item._id] = 0;
      }
      counts[item._id]++;
    });
      if (bun) {
        counts[bun._id] = 2;
      }
      return counts;
  }, [constructorItems, bun]);

  const { ingridients } = useSelector(store => store.ingridients);
  const typeData = ingridients.filter(item => item.type === type);

  return(
    <div className={`${burgerIngridientsStyles.menuItems}`}>
      {typeData.map(item => (
        <Card key={item._id} cardData={item} count={counter[item._id]}/>
      ))}
    </div>
  );
}

MenuList.propTypes = {
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
};

const BurgerIngridients = () => {
  const [current, setCurrent] = useState('Булки')

  const setTabScroll = (evt) => {
    const scrollTop = evt.target.scrollTop;
   
    if (scrollTop <= 250) {
        setCurrent('Булки');
    }
    else if (scrollTop > 250 && scrollTop <= 750) {
        setCurrent('Соусы');
    }
    else {
        setCurrent('Начинки');
    }
  }

  return(
    <section className={burgerIngridientsStyles.main}>
      <h1 className='mt-10 mb-5 text text_type_main-large'>Соберите бургер</h1>
      
      <div className={burgerIngridientsStyles.tab}>
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${burgerIngridientsStyles.window} custom-scroll`} onScroll={setTabScroll}>
        <ul className={burgerIngridientsStyles.menu}>
          <li>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Булки</h2>
            <MenuList type='bun' />
          </li>
          <li>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Соусы</h2>
            <MenuList type='sauce' />
          </li>
          <li>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Начинки</h2>
            <MenuList type='main' />
          </li>
        </ul>
      </div>
    </section>
  );
}

export default BurgerIngridients;