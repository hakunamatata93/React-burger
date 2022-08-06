import { combineReducers } from 'redux';
import { ingridientsReducer, orderReducer, currentIngridientReducer,constructorReducer } from './index';

export const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  order: orderReducer,
  currentIngridient: currentIngridientReducer,
  constructor: constructorReducer
  
  
});