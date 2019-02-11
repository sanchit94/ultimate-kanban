import uuid from "uuid/v4";

import * as actionTypes from "actions/types";

export const attachToBoard = (boardId, listId) => {
  return {
    type: actionTypes.ATTACH_TO_BOARD,
    payload: {
      boardId,
      listId
    }
  };
};

export const updateBoard = (boardId, name, editing = false) => {
  return {
    type: actionTypes.UPDATE_BOARD,
    payload: {
      boardId,
      name,
      editing
    }
  };
};
