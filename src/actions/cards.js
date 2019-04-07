import uuid from "uuid/v4";

import { domain } from '../constants';

import * as actionTypes from "actions/types";
import Axios from "axios";

export const createCardAsync = content => {
  return dispatch => {
    const data = {
      id: uuid(),
      editing: false,
      content,
      labels: []
    }; 
    return Axios.post(`${domain}/card/create`, data)
    .then(res => {
      if (res.status == 200) {
        dispatch(createCard(data));
        return createCard(data);
      }
    })
    .catch(err => {
      console.error(err);
    });
  }
}

export const createCard = content => {
  return {
    type: actionTypes.CREATE_CARD,
    payload: {
      ...content
    }
  };
};

export const updateCardAsync = card => {
  return dispatch => {
    const data = {
      ...card
    };
    return Axios.post(`${domain}/card/update`, data)
    .then(res => {
      if (res.status == 200){
        dispatch(updateCard(data));
        return updateCard(data);
      }
    })
    .catch(err => {
      console.error(err);
    });
    
  }
}

export const updateCard = card => {
  return {
    type: actionTypes.UPDATE_CARD,
    payload: card
  };
};

export const deleteCardAsync = (listId, cardId) => {
  return dispatch => {
    const data = {
      cardId,
      listId
    };
    return Axios.post(`${domain}/card/delete`, data)
    .then(res => {
      if (res.status == 200) {
        dispatch(deleteCard(data));
        return deleteCard(data)
      }
    })
    .catch(err => {
      console.error(err);
    });
    
  }
}

export const deleteCard = (data) => {
  return {
    type: actionTypes.DELETE_CARD,
    payload: data
  };
};

export const deleteAllListCards = cardIds => {
  return dispatch => {
    return Axios.post(`${domain}/card/del-all-cards`, cardIds)
      .then(res => {
        if (res.data == 200) {
          dispatch({ type: actionTypes.DELETE_FROM_LIST, payload: cardIds });
        }
      })
  }
}
