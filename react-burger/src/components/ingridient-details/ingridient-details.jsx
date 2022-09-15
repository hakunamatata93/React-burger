import ingridientDetailsStyles from "./ingridient-details.module.css";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const IngridientDetails = ({showModal = false}) => {
  const { id } = useParams();
  const ingridients = useSelector(store => store.ingridients.ingridients);
  const currentIngridient = ingridients.find(ingridient => ingridient._id === id);
  if (!currentIngridient) return null;

  return (
    <article className={ingridientDetailsStyles.container}>
      {showModal && <h2 className='text text_type_main-large ml-10 mt-15'>Детали ингредиента</h2>}
      <img src={currentIngridient.image_large} alt={currentIngridient.name} />
      <span className='text text_type_main-medium mt-4 mb-8'>{currentIngridient.name}</span>
      <ul className={`${ingridientDetailsStyles.nutrients} mb-15`}>
        <li className={ingridientDetailsStyles.nutrient}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </p>
          <span className='text text_type_main-default text_color_inactive'>{currentIngridient.calories}</span>
        </li>
        <li className={ingridientDetailsStyles.nutrient}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <span className='text text_type_main-default text_color_inactive'>{currentIngridient.proteins}</span>
        </li>
        <li className={ingridientDetailsStyles.nutrient}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <span className='text text_type_main-default text_color_inactive'>{currentIngridient.fat}</span>
        </li>
        <li className={ingridientDetailsStyles.nutrient}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <span className='text text_type_main-default text_color_inactive'>{currentIngridient.carbohydrates}</span>

        </li>
      </ul>
    </article>
  );
};

export default IngridientDetails;
