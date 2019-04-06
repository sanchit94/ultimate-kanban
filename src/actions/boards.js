import uuid from "uuid/v4";

import { domain } from '../constants';

import * as actionTypes from "actions/types";
import Axios from "axios";

export const createBoardAsync = content => {
  return dispatch => {
    const data = {
      boardId: uuid(),
      name: content,
      listIds: [],
      editing: false
    };
    Axios.post(`${domain}/board/create`, data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
      return dispatch(createBoard(data));
  }
}

export const createBoard = content => {
  return {
    type: actionTypes.CREATE_BOARD,
    payload: content
  };
};

export const attachToBoardAsync = (boardId, listId) => {
  return dispatch => {
    const data = {
      boardId,
      listId
    };
    Axios.post(`${domain}/board/attach`, data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.error(err);
    });
    dispatch(attachToBoard(data));
    return attachToBoard(data);
  }
}

export const attachToBoard = data => {
  return {
    type: actionTypes.ATTACH_TO_BOARD,
    payload: data
  };
};

export const updateBoardAsync = (boardId, name, editing = false) => {
  return dispatch => {
    const data = {
      boardId,
      name,
      editing
    };
    Axios.post(`${domain}/board/update`, data)
    .then(res => {      
      console.log(res.data);
    })
    .catch(err => {
      console.error(err);
    });
    return dispatch(updateBoard(data));
  }
}

export const updateBoard = data => {
  return {
    type: actionTypes.UPDATE_BOARD,
    payload: data
  };
};
