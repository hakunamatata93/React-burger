import {
    GET_INGRIDIENTS_REQUEST,
    GET_INGRIDIENTS_SUCCESS,
    GET_INGRIDIENTS_FAILED,
  } from '../actions/ingridients';
  import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
  } from '../actions/order';
  
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

  const initialState2 = {
    order: null,
    orderRequest: false,
    orderFailed: false,
  };
  
  export const orderReducer = (state = initialState2, action) => {
  
    switch (action.type) {
      case GET_ORDER_REQUEST: {
        return {
          ...state,
          orderRequest: true,
        }
      }
      case GET_ORDER_SUCCESS: {
        return {
          ...state,
          orderRequest: false,
          orderFailed: false,
          order: action.order,
        }
      }
      case GET_ORDER_FAILED: {
        return {
          ...state,
          orderFailed: true,
          orderRequest: false,
        }
      }
      default:
        return state;
    }
  }