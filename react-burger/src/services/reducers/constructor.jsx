import {
    ADD_INGRIDIENT,
    DELETE_INGRIDIENT,
    SHIFT_INGRIDIENT,
    RESET_CONSTRUCTOR
  } from '../actions/constructor';
  
  
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
 
  