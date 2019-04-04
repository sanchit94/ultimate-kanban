import uuid from "uuid/v4";

import { domain } from '../constants';

import * as actionTypes from "actions/types";
import Axios from "axios";

export const createBoardAsync = content => {
  return dispatch => {
    return Axios.post(`${domain}/board/create`, {
        boardId: uuid(),
        name: content,
        listIds: [],
        editing: false
      })
      .then(res => {
        dispatch(createBoard(res.data));
        return res.data;
      })
      .catch(err => {
        dispatch(createBoardFailure(err.message));
      });
  }
}

export const createBoard = content => {
  return {
    type: actionTypes.CREATE_BOARD,
    payload: content
  };
};

const createBoardFailure = error => {
  return {
    type: actionTypes.CREATE_BOARD_FAILED,
    payload: {
      error
    }
  }
}

export const attachToBoardAsync = (boardId, listId) => {
  return dispatch => {
    Axios.post(`${domain}/board/attach`, {
      boardId,
      listId
    })
    .then(res => {
      dispatch(attachToBoard(res.data));
    })
    .catch(err => {
      console.error(err);
    });
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
    Axios.post(`${domain}/board/update`, {
      boardId,
      name,
      editing
    })
    .then(res => {
      dispatch(updateBoard(res.data));
    })
    .catch(err => {
      console.error(err);
    })
  }
}

export const updateBoard = data => {
  return {
    type: actionTypes.UPDATE_BOARD,
    payload: data
  };
};
