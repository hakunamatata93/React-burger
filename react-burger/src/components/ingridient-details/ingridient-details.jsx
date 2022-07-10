import React from 'react';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ingridientDetailsStyles from './ingridient-details.module.css';

const IngridientDetails = ({ ingridients }) => {
  const { image_large, name, calories, proteins, fat, carbohydrates } = ingridients;
  console.log(ingridients[0]);


  return(
    <article className={`${ingridientDetailsStyles.container} p-10`}>
      <h1 className={`${ingridientDetailsStyles.title} text text_type_main-large mt-3`}>Детали ингредиента</h1>
      <img src={image_large} alt={name} />
      <span className={'text text_type_main-medium mt-4 mb-8'}>{name}</span>
      <ul className={ingridientDetailsStyles.nutrients}>
        <li className={ingridientDetailsStyles.nutrient}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</p>
          <span className='text text_type_main-default text_color_inactive'>{calories}</span>
        </li>
        <li className={ingridientDetailsStyles.nutrient}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
          <span className='text text_type_main-default text_color_inactive'>{proteins}</span>
        </li>
        <li className={ingridientDetailsStyles.nutrient}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
          <span className='text text_type_main-default text_color_inactive'>{fat}</span>
        </li>
        <li className={ingridientDetailsStyles.nutrient}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
          <span className='text text_type_main-default text_color_inactive'>{carbohydrates}</span>
        </li>
      </ul>
      <button className={ingridientDetailsStyles.button} type='button'>
        <CloseIcon type="primary" />
      </button>
    </article>
  );
}

export default IngridientDetails; 