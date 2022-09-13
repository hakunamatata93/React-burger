import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/constants';

import { useDispatch } from "react-redux";
import { getIngridients } from "../../services/actions/ingridients";
import { HomePage, 
  LoginPage, 
  RegisterPage, 
  ProfilePage, 
  ForgotPasswordPage, 
  ResetPasswordPage, 
  NotFound } from '../../pages';

import appStyles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngridients());
  }, []
  );

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
      <Switch>
        <Route path='/' exact={true}>
          <HomePage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginPage />
        </Route>
        <Route path='/register' exact={true}>
          <RegisterPage />
        </Route>
        <Route path='/profile' exact={true}>
          <ProfilePage />
        </Route>
        <Route path='/forgot-password' exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path='/reset-password' exact={true}>
          <ResetPasswordPage />
        </Route>
        <Route path='/page404' exact={true}>
          <NotFound />
        </Route>
      </Switch>
    </div>
  </Router>
  );
};

export default App;
