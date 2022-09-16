import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ordersFeedStyles from './orders-feed.module.css';



export const CardOrder = ({card}) => {

  const { name, number, createdAt, ingredients: ingridientsId} = card;

  const { orders } = useSelector(store => store.ws);
  const { ingridients } = useSelector(store => store.ingridients);

  const orderedIngridients = ingridientsId.map(item => {
    return ingridients.find(el => el._id === item);
  });

  return (
    <article className={ordersFeedStyles.card}>

      <div className={ordersFeedStyles.info}>
        <p className="text text_type_digits-default">#{number}</p>
        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
      </div>
              
      <p className="text text_type_main-medium  mt-6 mb-6">{name}</p>

      <div className={ordersFeedStyles.total}>

        <ul className={ordersFeedStyles.icons}>
          { 
            (ingridientsId.length > 5) &&
              ( <div className={ordersFeedStyles.icon} style={{backgroundImage: `url(${orderedIngridients[5].image_mobile})` }}>
                  <p className={`${ordersFeedStyles.lastIcon} text text_type_main-default`}>+{orderedIngridients.length - 5}</p>
                </div>)
          }
          {
            orderedIngridients.slice(0, 5).reverse().map(item => {
              return (
                <li className={ordersFeedStyles.img}>
                  <img src={item.image_mobile} className={ordersFeedStyles.icon}/>
                </li>
              )
            })
          }
        </ul>

        <div className={`${ordersFeedStyles.price} ml-6`}>
          <p className="text text_type_digits-default mr-2">480</p>
          <CurrencyIcon type="primary" />
        </div>

      </div>

    </article>
  )
}


export const OrdersFeed = () => {

  const { orders } = useSelector(store => store.ws);

  return (
    <section>
      <ul className={ordersFeedStyles.cardList}>
        {orders.map(item => {
            return(
              <CardOrder card={item}/>
            )
          })
        }
      </ul>
    </section>
  );
};