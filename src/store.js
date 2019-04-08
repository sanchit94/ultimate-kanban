import throttle from "lodash/throttle";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "reducers";
import { saveState, loadStore } from "./localStorage";
import * as asyncInitialState from 'redux-async-initial-state';

const store = createStore(reducers, compose(applyMiddleware(thunk, asyncInitialState.middleware(loadStore)), composeWithDevTools()));

store.subscribe(
  throttle(() => {
    const { boards, lists, cards } = store.getState();
    saveState({
      boards,
      lists,
      cards
    });
  }, 1000)
);

export default store;
