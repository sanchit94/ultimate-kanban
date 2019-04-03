import * as actionTypes from "actions/types";
import { id0, id1, id2 } from "./lists";

import axios from 'axios';

const defaultState = {
  boards: {
    0: {
      id: 0,
      name: "Development",
      listIds: [id0, id1, id2],
      editing: false
    },
    1: {
      id: 1,
      name: "Personal Project",
      listIds: [id0],
      editing: false
    }
  },
  boardIds: [0, 1]
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_BOARD: {
      const { boardId } = action.payload;
      const newState = Object.assign({}, state);
      if (!newState.boards[boardId]) {
        newState.boardIds.push(boardId);
        newState.boards[boardId] = action.payload;
        axios({
          method: 'post',
          url: '/board/add',
          data: action.payload
        });
      }
      return newState;
    }

    case actionTypes.DELETE_LIST: {
      const { boardId, listId } = action.payload;
      const newBoards = Object.assign({}, state.boards);
      if (newBoards[boardId]) {
        const index = newBoards[boardId].listIds.indexOf(listId);
        newBoards[boardId].listIds.splice(index, 1);
        axios({
          method: 'post',
          url: '/board/delete',
          data: newBoards
        });
      }
      return { ...state, boards: newBoards };
    }

    case actionTypes.ATTACH_TO_BOARD: {
      const { boardId, listId } = action.payload;
      const newState = Object.assign({}, state);
      if (newState.boards[boardId]) {
        newState.boards[boardId].listIds.push(listId);
        axios({
          method: 'post',
          url: '/board/attach',
          data: newState
        });
      }
      return newState;
    }

    case actionTypes.UPDATE_BOARD: {
      const { boardId, name, editing } = action.payload;
      const newState = Object.assign({}, state);
      if (newState.boards[boardId]) {
        newState.boards[boardId].name = name;
        newState.boards[boardId].editing = editing;
        axios({
          method: 'post',
          url: '/board/update',
          data: newState
        });
      }
      return newState;
    }

    default:
      return state;
  }
};
