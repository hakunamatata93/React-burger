import { 
    CLOSE_MODAL, 
    OPEN_MODAL 
  } from '../actions/currentIngridient';
  
  import {
    GET_INGRIDIENTS_REQUEST,
    GET_INGRIDIENTS_SUCCESS,
    GET_INGRIDIENTS_FAILED,
  } from '../actions/ingridients';
  
  import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    RESET_ORDER,
  } from '../actions/order';
  
  import {
    ADD_INGRIDIENT,
    DELETE_INGRIDIENT,
    SHIFT_INGRIDIENT,
    RESET_CONSTRUCTOR
  } from '../actions/constructor';
  
  // ingridientsReducer
  
  const initialIngridientsState = {
    ingridients: [],
    ingridientsRequest: false,
    ingridientsFailed: false,
  };
  
  export const ingridientsReducer = (state = initialIngridientsState, action) => {
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
  
  // orderReducer
  
  const initialOrderState = {
    order: null,
    orderRequest: false,
    orderFailed: false,
  };
  
  export const orderReducer = (state = initialOrderState, action) => {
  
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
      case RESET_ORDER: {
        return {
          ...state,
          order: null,
          orderFailed: true,
          orderRequest: false,
        }
      }
      default:
        return state;
    }
  }
  
  // currentIngridientReducer
  
  const initialCurrentIngridientState = {
    currentIngridient: null, 
  };
  
  export const currentIngridientReducer = (state = initialCurrentIngridientState, action) => {
  
    switch (action.type) {
      case OPEN_MODAL: {
        return {
          ...state,
          currentIngridient: action.payload
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
  
  // constructorReducer
  
  const initialConstructorState = {
    constructorItems: [], 
    bun: null,
  };
  
  export const constructorReducer = (state = initialConstructorState, action) => {
  
    switch (action.type) {
      case ADD_INGRIDIENT: {
        if (action.payload.type === 'bun') {
          return {...state, bun: action.payload}
        }
        return {
          ...state,
          constructorItems:[...state.constructorItems, action.payload],
        };
      }
      case DELETE_INGRIDIENT: {
        return {
          ...state,
          constructorItems: [...state.constructorItems].filter((_, index) => index !== action.payload),
        };
      }
      case SHIFT_INGRIDIENT: {
        const array = [...state.constructorItems];
        array.splice(action.payload.to, 0, ...array.splice(action.payload.from, 1))
        return {
          ...state,
          constructorItems: [...array],
        }
      }
      case RESET_CONSTRUCTOR: {
        return {
          constructorItems: [], 
          bun: null
        }
      }
      default:
        return state;
    }
  }