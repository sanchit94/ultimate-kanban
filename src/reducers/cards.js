import * as actionTypes from "actions/types";

import axios from 'axios';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.CREATE_CARD: {
      axios({
        method: 'post',
        url: '/card/add',
        data: action.payload
      });
      return [...state, action.payload];
    }

    case actionTypes.UPDATE_CARD: {
      const newState = state.slice(0);
      const index = newState.findIndex(card => card.id === action.payload.id);
      newState[index] = { ...newState[index], ...action.payload };
      axios({
        method: 'post',
        url: '/card/update',
        data: newState
      });
      return newState;
    }

    case actionTypes.DELETE_CARD: {
      const newState = state.slice(0);
      const index = newState.findIndex(
        card => card.id === action.payload.cardId
      );
      newState.splice(index, 1);
      axios({
        method: 'post',
        url: '/card/delete',
        data: newState
      });
      return newState;
    }

    default:
      return state;
  }
};
