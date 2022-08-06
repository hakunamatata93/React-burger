import { combineReducers } from 'redux';
import { ingridientsReducer, orderReducer } from './index';

export const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  order: orderReducer,
  // constructorReducer
  // currentIngridientReducer
  // orderReducer
});