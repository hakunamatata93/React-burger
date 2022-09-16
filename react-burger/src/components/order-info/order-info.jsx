import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/wsActions';
import { placeOrderDate } from '../../utils/constants';

import orderInfoStyles from './order-info.module.css';

export const OrderInfo = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();


  useEffect(() => {
    if (location.pathname.includes('feed')) {
        dispatch({ 
          type: WS_CONNECTION_START,
          payload: '/all',
        });
      } else if (location.pathname.includes('profile')) {
        dispatch({ 
          type: WS_CONNECTION_START,
          user: true,
        });
      }
    return () => {
      dispatch({ 
        type: WS_CONNECTION_CLOSED 
      })
    }
  }, [])

  const { orders } = useSelector(store => store.ws);
  const { ingridients } = useSelector(store => store.ingridients);

  const currentOrder = orders.find(order => order._id === id);
  if (!currentOrder) return null;
  const { name, number, createdAt, ingredients: ingridientsId} = currentOrder;
  
  const orderedIngridients = ingridientsId.filter(ingridient => ingridient != null).map(item => {
    return ingridients.find(el => el._id === item);
   })
   
  
  const uniqueIngridients = [...new Set(orderedIngridients)];

  const sumTotal = orderedIngridients.reduce((acc, item) => acc + item.price, 0);
  let status;
  let color;
  switch (currentOrder.status) {
    case 'done':
      status = 'Выполнен';
      color = '#00CCCC';
      break;
    case 'pending':
      status = 'Готовится';
      break;
    case 'created':
      status = 'Создан';
      break;
      default:
  }

  return (
    <main className={orderInfoStyles.main}>
      <div>
        <h2 className={`${orderInfoStyles.number} text text_type_digits-default`}>#{number}</h2>
        <p className={"text text_type_main-medium mt-10 mb-3"}>{name}</p>
        <p className='text text_type_main-default' style={{color}}>{status}</p>
      </div>

      <div className='mt-15 mb-10'>
        <p className="text text_type_main-medium mb-6">Состав:</p>

        <ul className={`${orderInfoStyles.table} custom-scroll`}>
          {
            uniqueIngridients.map((item, index) => {
              return (
                <li key={index} className={`${orderInfoStyles.tableItem} mb-4`}>
                  <img src={item.image_mobile} className={orderInfoStyles.icon} alt='иконка ингредиента'/>
                  <p className="text text_type_main-default mr-4 ml-4">{item.name}</p>
                  <div className={`${orderInfoStyles.quantity} mr-6`}>
                    <p className="text text_type_digits-default mr-2">{orderedIngridients.filter(el => el._id === item._id).length}</p>
                    <p className="text text_type_digits-default mr-2">x {item.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>

      <div className={orderInfoStyles.figures}>
      <p className="text text_type_main-default text_color_inactive">{placeOrderDate(createdAt)}</p>

        <div className={`${orderInfoStyles.price} ml-6`}>
          <p className="text text_type_digits-default mr-2">{sumTotal}</p>
          <CurrencyIcon type="primary" />
        </div>

      </div>
    </main>
  )
}