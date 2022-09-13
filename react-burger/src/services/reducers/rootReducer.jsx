import { combineReducers } from 'redux';
import { ingridientsReducer, 
        orderReducer, 
        currentIngridientReducer,
        constructorReducer,
} from './index';

import { 
  userReducer 
} from './auth';

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
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
});