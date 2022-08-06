import { BASEURL, checkResponse } from '../../utils/constants';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function postOrder(ingridientData) {

  const ingridientsId = ingridientData.map(el => el._id);

  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    })
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
    .then( res  => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order.number

        })
        console.log(res.order.number)
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        })
      }
    })
    .catch( err => {

      dispatch({
          type: GET_ORDER_FAILED
      })
    })
  }
};