import React from 'react';

import { cardPropTypes } from '../../utils/prop-types';

import ingridientDetailsStyles from './ingridient-details.module.css';

const IngridientDetails = ({ ingridient}) => {
  const { image_large, name, calories, proteins, fat, carbohydrates } = ingridient;
 
  return(
    <article className={ingridientDetailsStyles.container}>
      <img src={image_large} alt={name} />
      <span className='text text_type_main-medium mt-4 mb-8'>{name}</span>
      <ul className={`${ingridientDetailsStyles.nutrients} mb-15`}>
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
    
    </article>
  );
}

IngridientDetails.propTypes = {
    ingridient: cardPropTypes.isRequired,
  };

export default IngridientDetails;