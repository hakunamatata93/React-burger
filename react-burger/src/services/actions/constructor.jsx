import { v4 as uuid4 } from 'uuid';

export const ADD_INGRIDIENT ='ADD_INGRIDIENT';
export const DELETE_INGRIDIENT ='DELETE_INGRIDIENT';
export const SHIFT_INGRIDIENT ='SHIFT_INGRIDIENT';
export const RESET_CONSTRUCTOR ='RESET_CONSTRUCTOR';

// ActionsCreator
export const addToConstructor = (ingridient, index) => {
  return {
    type: ADD_INGRIDIENT,
    payload: {
      ...ingridient,
      id: uuid4(),
      index
    }
  };
};

export const sortIngridient = (fromIndex, toIndex) => (
  {
    type: SHIFT_INGRIDIENT,
    payload: {
      from: fromIndex, 
      to: toIndex,
    },
  }
)

export const deleteIngridient = (index) => (
  {
    type: DELETE_INGRIDIENT,
    payload: index
  }
);