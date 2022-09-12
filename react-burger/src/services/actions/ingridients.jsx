import { BASEURL, checkResponse } from '../../utils/constants';

export const GET_INGRIDIENTS_REQUEST = 'GET_INGRIDIENTS_REQUEST';
export const GET_INGRIDIENTS_SUCCESS = 'GET_INGRIDIENTS_SUCCESS';
export const GET_INGRIDIENTS_FAILED = 'GET_INGRIDIENTS_FAILED';

// ActionsCreator
export const getLoadingIngridients = () => (
  {
    type: GET_INGRIDIENTS_REQUEST,
  }
);

export const setReceivedIngridients = (value) => (
  {
    type: GET_INGRIDIENTS_SUCCESS,
    payload: value
  }
);

export const getNonresponseIngridients = () => (
  {
    type: GET_INGRIDIENTS_FAILED
  }
);

export const getIngridients = () => {
  return function(dispatch) {
    dispatch(getLoadingIngridients())
    fetch(`${BASEURL}/ingredients`)
    .then(checkResponse)
    .then(res  => {
      if (res && res.success) {
        dispatch(setReceivedIngridients(res.data))
      } else {
        dispatch(getNonresponseIngridients)
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(getNonresponseIngridients)
    })
  }
};