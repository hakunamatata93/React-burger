import { combineReducers } from 'redux';
import { ingridientsReducer } from './ingridients';
import { orderReducer } from './order';
import { currentIngridientReducer } from './current-ingridient';
import { constructorReducer } from './constructor';
import { userReducer } from './auth';
import { forgotPasswordReducer } from './forgot-password';
import { resetPasswordReducer } from './reset-password';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  order: orderReducer,
  currentIngridient: currentIngridientReducer,
  constructorItems: constructorReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  ws: wsReducer,
});