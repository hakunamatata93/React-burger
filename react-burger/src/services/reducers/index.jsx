import {
    GET_INGRIDIENTS_REQUEST,
    GET_INGRIDIENTS_SUCCESS,
    GET_INGRIDIENTS_FAILED,
  } from '../actions/ingridients';
  
  const initialState = {
    ingridients: [],
    ingridientsRequest: false,
    ingridientsFailed: false,
  };
  
  export const ingridientsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_INGRIDIENTS_REQUEST: {
        return {
          ...state,
          ingridientsRequest: true,
        }
      }
      case GET_INGRIDIENTS_SUCCESS: {
        return {
          ...state,
          ingridientsRequest: false,
          ingridientsFailed: false,
          ingridients: action.ingridients,
        }
      }
      case GET_INGRIDIENTS_FAILED: {
        return {
          ...state,
          ingridientsFailed: true,
          ingridientsRequest: false,
        }
      }
      default:
        return state;
    }
  }