export const OPEN_MODAL ='OPEN_MODAL';
export const CLOSE_MODAL ='CLOSE_MODAL';

// ActionsCreator
export const getCard = (value) => (
  {
    type: OPEN_MODAL,
    payload: value
  }
);

export const getCurrentIngridient = (cardData) => {
  return function(dispatch) {
    dispatch(getCard(cardData))
  };
};