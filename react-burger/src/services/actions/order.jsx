import { BASEURL, checkResponse, getCookie } from '../../utils/constants';
import { RESET_CONSTRUCTOR } from './constructor';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const RESET_ORDER = 'RESET_ORDER';

// ActionsCreator

export const postOrder = (ingridientData) => {

  const ingridientsId = ingridientData.map(el => el._id);

  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    })
    fetch(`${BASEURL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getCookie('token')
      },
      body: JSON.stringify({
        ingredients: ingridientsId
      })
    })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order.number
        })
        dispatch({ 
          type: RESET_CONSTRUCTOR
        });
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        })
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ORDER_FAILED
      })
    })
  }
};