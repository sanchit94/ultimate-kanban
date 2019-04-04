import uuid from "uuid/v4";

import { domain } from '../constants';

import * as actionTypes from "actions/types";
import Axios from "axios";

export const createCardAsync = content => {
  return dispatch => {
    Axios.post(`${domain}/card/create`, {
      id: uuid(),
      editing: false,
      content,
      labels: []
    })
    .then(res => {
      dispatch(createCard(res.data));
    })
    .catch(err => {
      console.error(err);
    });
  }
}

export const createCard = content => {
  return {
    type: actionTypes.CREATE_CARD,
    payload: content
  };
};

export const updateCardAsync = card => {
  return dispatch => {
    Axios.post(`${domain}/card/update`, {
      card
    })
    .then(res => {
      dispatch(updateCard(res.data));
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
    Axios.post(`${domain}/card/delete`, {
      cardId,
      listId
    })
    .then(res => {
      dispatch(deleteCard(res.data));
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
