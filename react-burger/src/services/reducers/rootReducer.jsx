import { combineReducers } from "redux";
import {
  ingridientsReducer,
  orderReducer,
  currentIngridientReducer,
  constructorReducer,
} from "./index";
import { 
  registerReducer 
} from './register';
import { 
  forgotPasswordReducer 
} from './forgot-password';
import { 
  resetPasswordReducer 
} from './reset-password';

export const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  order: orderReducer,
  currentIngridient: currentIngridientReducer,
  constructorItems: constructorReducer,
  register: registerReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer
});
