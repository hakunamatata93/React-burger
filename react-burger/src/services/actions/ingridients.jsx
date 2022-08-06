import { BASEURL, checkResponse } from '../../utils/constants';

export const GET_INGRIDIENTS_REQUEST = 'GET_INGRIDIENTS_REQUEST';
export const GET_INGRIDIENTS_SUCCESS = 'GET_INGRIDIENTS_SUCCESS';
export const GET_INGRIDIENTS_FAILED = 'GET_INGRIDIENTS_FAILED';

// ActionsCreator
export function getIngridients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGRIDIENTS_REQUEST
    })
    fetch(`${BASEURL}/ingredients`)
    .then(checkResponse)
    .then( res  => {
      if (res && res.success) {
        dispatch({
          type: GET_INGRIDIENTS_SUCCESS,
          ingridients: res.data
        })
      } else {
        dispatch({
          type: GET_INGRIDIENTS_FAILED
        })
      }
    })
    .catch( err => {
      dispatch({
          type: GET_INGRIDIENTS_FAILED,
          payload: err
      })
    })
  }
}