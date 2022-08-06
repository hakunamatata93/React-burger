import { combineReducers } from 'redux';
import { ingridientsReducer, orderReducer, currentIngridientReducer } from './index';

export const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  order: orderReducer,
  currentIngridient: currentIngridientReducer,
  // constructorReducer
  
  
});