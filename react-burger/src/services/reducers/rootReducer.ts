import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingridients';
import { orderReducer } from './order';
import { currentIngredientReducer } from './current-ingridient';
import { constructorReducer } from './constructor';
import { userReducer } from './auth';
import { forgotPasswordReducer } from './forgot-password';
import { resetPasswordReducer } from './reset-password';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
  ingridients: ingredientsReducer,
  order: orderReducer,
  currentIngridient: currentIngredientReducer,
  constructorItems: constructorReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  ws: wsReducer,
});