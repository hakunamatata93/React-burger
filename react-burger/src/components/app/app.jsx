import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Router, Route, Switch, useLocation, useHistory } from 'react-router-dom';

import { AppHeader } from '../app-header/app-header';
import { getIngridients } from '../../services/actions/ingridients';
import { getUser } from '../../services/actions/auth';
import { CLOSE_MODAL } from '../../services/actions/currentIngridient';
import { getCookie } from '../../utils/constants';
import { HomePage, 
         LoginPage, 
         RegisterPage, 
         ProfilePage, 
         ForgotPasswordPage, 
         ResetPasswordPage,
         IngridientPage, 
         NotFound,
         ProfileOrdersPage,
         FeedPage,
         OrderPage} from '../../pages';
import { ProtectedRoute } from '../protected-route/protected-route';
import Modal from '../modal/modal';
import IngridientDetails from '../ingridient-details/ingridient-details';
import OrderDetails from '../order-details/order-details';
import { AUTH_CHECKED } from '../../services/actions/auth';


import appStyles from './app.module.css';

const App = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const background = location.state && location.state.background;
  
  useEffect(() => {
      dispatch(getIngridients());
    },
    []
  ); 

  // при монтировании приложения проверяем, есть ли accessToken, 
  // и если есть, выполняем запрос для получения данных пользователя
  useEffect(() => {
    const accessToken = getCookie('token');
    if (accessToken) {
      dispatch(getUser());
    } else {
      dispatch({type: AUTH_CHECKED});
    }
  }, []);




  const closeModal = () => {
    history.goBack();
  };

  return (
    
      <div className={appStyles.app}>
        <AppHeader />
        <Switch location={ background || location }>

          <Route path='/' exact={true}>
            <HomePage />
          </Route>

          <Route path='/login' exact={true}>
            <LoginPage />
          </Route>

          <Route path='/register' exact={true}>
            <RegisterPage />
          </Route>

          <ProtectedRoute path='/profile' exact={true}>
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute path='/profile/orders' exact={true}>
            <ProfileOrdersPage/>
          </ProtectedRoute>

          <ProtectedRoute path='/profile/orders/:id' exact={true}>
            <OrderPage />
          </ProtectedRoute>

          <Route path='/ingridients/:id'>
            <IngridientPage />
          </Route>

          <Route path='/forgot-password' exact={true}>
            <ForgotPasswordPage />
          </Route>

          <Route path='/reset-password' exact={true}>
            <ResetPasswordPage />
          </Route>

          <Route path='/feed' exact={true}>
            <FeedPage />
          </Route>

          <Route path='/feed/:id' exact={true}>
            <OrderPage />
          </Route>

          <Route path='*'>
            <NotFound />
          </Route>
        
        </Switch>

        { background && (
          <Route path='/ingridients/:id'>
            <Modal closing={closeModal} showModal={true}>
              <IngridientDetails showModal={true}/>
            </Modal>
          </Route>
        )}

        { background && (
          <Route path='/order-details:id'>
            <Modal closing={closeModal} showModal={true}>
              <OrderDetails showModal={true}/>
            </Modal>
          </Route>
        )}

        { background && (
          <Route path='/feed/:id'>
            <Modal closing={closeModal} showModal={true}>
              <OrderPage />
            </Modal>
          </Route>
        )}

        { background && (
          <Route path='/profile/orders/:id'>
            <Modal closing={closeModal} showModal={true}>
              <OrderPage />
            </Modal>
          </Route>
        )}

      </div>
    
  );
}

export default App;