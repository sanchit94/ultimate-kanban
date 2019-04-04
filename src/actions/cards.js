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
    Axios.post(`${domain}/card/create`, data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.error(err);
    });
    return dispatch(createCard(data));
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
      card
    };
    Axios.post(`${domain}/card/update`, data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.error(err);
    });
    return dispatch(updateCard(data));
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
    Axios.post(`${domain}/card/delete`, data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.error(err);
    });
    return dispatch(deleteCard(data));
  }
}

export const deleteCard = (data) => {
  return {
    type: actionTypes.DELETE_CARD,
    payload: data
  };
};
