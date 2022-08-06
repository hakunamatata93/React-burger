export const OPEN_MODAL ='OPEN_MODAL';
export const CLOSE_MODAL ='CLOSE_MODAL';

export function getCurrentIngridient(cardData) {
    return function(dispatch) {
      dispatch({
      type: OPEN_MODAL,
      cardData: cardData
      })
    };
  };