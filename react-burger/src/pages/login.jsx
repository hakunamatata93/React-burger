import { useState, useRef } from "react";
import { Link } from 'react-router-dom';

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './style.module.css';

export const LoginPage = () => {

    const [value, setValue] = useState('value');
    const inputRef = useRef(null);

  return (
    <main className={styles.container}>
      <form className={`${styles.form} mb-20`}>
        <h2 className='text text_type_main-medium mb-6'>Вход</h2>
        <fieldset className={styles.fieldset}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={e => setValue(e.target.value)}
            value={''}
            name={'email'}
            ref={inputRef}
            errorText={"Ошибка"}
          />
          <PasswordInput 
            onChange={e => setValue(e.target.value)} 
            value={''} 
            name={'password'}
          />
        </fieldset>
        <Button type="primary" size="large"> 
          Войти
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive mb-4">Вы - новый пользователь?
        <Link to='/register' className={`${styles.link} ml-3`}>Зарегистрироваться</Link></p>
      <p className="text text_type_main-default text_color_inactive">Забыли пароль?
        <Link to='/forgot-password' className={`${styles.link} ml-3`}>Восстановить пароль</Link></p>
    </main>
  );
};