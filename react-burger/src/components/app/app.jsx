import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';

import { AppHeader } from '../app-header/app-header';
import { getIngridients } from '../../services/actions/ingridients';
import { getUser } from '../../services/actions/auth';
import { getCookie } from '../../utils/constants';
import { HomePage, 
         LoginPage, 
         RegisterPage, 
         ProfilePage, 
         ForgotPasswordPage, 
         ResetPasswordPage,
         IngridientPage, 
         NotFound } from '../../pages';
import { ProtectedRoute } from '../protected-route/protected-route';
import  Modal  from '../modal/modal';
import  IngridientDetails  from '../ingridient-details/ingridient-details';

import appStyles from './app.module.css';

const App = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  const background = location.state && location.state.background;
  
  useEffect(() => {
      dispatch(getIngridients());
    },
    []
  ); 

  // при монтировании приложения проверяем, есть ли accessToken, 
  // и если есть, выполняем запрос для получения данных пользователя
  useEffect(() => {
      const accessToken = getCookie('token')
      if (accessToken) {
        dispatch(getUser())
      }
    }, 
    []
  );

  return (
    <Router>
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
          </ProtectedRoute>

          <Route path='/ingridients/:id' exact={true}>
            <IngridientPage />
          </Route>

          <Route path='/forgot-password' exact={true}>
            <ForgotPasswordPage />
          </Route>

          <Route path='/reset-password' exact={true}>
            <ResetPasswordPage />
          </Route>

          <Route path='*'>
            <NotFound />
          </Route>

        </Switch>

        { background && (
          <Route path='/ingredients/:id'>
            <Modal>
              <IngridientDetails />
            </Modal>
          </Route>
        )}

      </div>
    </Router>
  );
}

export default App;
