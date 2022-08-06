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
  import { CLOSE_MODAL, OPEN_MODAL } from '../actions/currentIngridient';
  import {
    ADD_INGRIDIENT,
    DELETE_INGRIDIENT,
    RESET_INGRIDIENT,
  } from '../actions/constructor';
  
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
  const initialState3 = {
    currentIngridient: null,
  
  };
  export const currentIngridientReducer = (state = initialState3, action) => {

    switch (action.type) {
      case OPEN_MODAL: {
        return {
          ...state,
          currentIngridient: action.cardData
        }
      }
      case CLOSE_MODAL: {
        return {
          ...state,
          currentIngridient: ''
        }
      }
  
      default:
        return state;
    }
  }

  const initialState4 = {
    constructor: [], 
  };
  
  
  export const constructorReducer = (state = initialState4, action) => {
  
    switch (action.type) {
      case ADD_INGRIDIENT: {
        return {
          ...state,
          //
        }
      }
      case DELETE_INGRIDIENT: {
        return {
          ...state,
          //
        }
      }
      case RESET_INGRIDIENT: {
        return {
          ...state,
          //
        }
      }
      default:
        return state;
    }
  }