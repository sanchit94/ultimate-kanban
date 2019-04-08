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
    return Axios.post(`${domain}/board/create`, data)
      .then(res => {
        if (res.status == 200) {
          dispatch(createBoard(data));
          return createBoard(data);
        }
      })
      .catch(err => {
        console.log(err.message);
      });   
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
    return Axios.post(`${domain}/board/attach`, data)
    .then(res => {
      if (res.status == 200) {
        dispatch(attachToBoard(data));
        return attachToBoard(data);
      }
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
    const data = {
      boardId,
      name,
      editing
    };
    return Axios.post(`${domain}/board/update`, data)
    .then(res => {      
      if (res.status == 200) {
        dispatch(updateBoard(data));
        return updateBoard(data);
      }
    })
    .catch(err => {
      console.error(err);
    });
    
  }
}

export const updateBoard = data => {
  return {
    type: actionTypes.UPDATE_BOARD,
    payload: data
  };
};
