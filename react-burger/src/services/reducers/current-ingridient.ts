import { 
    CLOSE_MODAL, 
    OPEN_MODAL 
  } from '../actions/currentIngridient';
  
  
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