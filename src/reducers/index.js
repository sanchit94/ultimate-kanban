import { combineReducers } from "redux";

import boardReducer from "reducers/boards";
import listsReducer from "reducers/lists";
import cardsReducer from "reducers/cards";
import uiReducer from "reducers/ui";

import * as asyncInitialState from 'redux-async-initial-state';

export default asyncInitialState.outerReducer(combineReducers({
  boards: boardReducer,
  lists: listsReducer,
  cards: cardsReducer,
  ui: uiReducer,
}));
