import { combineReducers } from 'redux';
import { ingridientsReducer } from './index';

export const rootReducer = combineReducers({
  ingredients: ingridientsReducer,
  // constructorReducer
  // currentIngredientReducer
  // orderReducer
});