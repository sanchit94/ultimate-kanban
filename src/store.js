import throttle from "lodash/throttle";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "reducers";
import { loadState, saveState } from "./localStorage";
const persistedState = loadState();
console.log(persistedState)
const store = createStore(reducers, persistedState, compose(applyMiddleware(thunk), composeWithDevTools()));

store.subscribe(
  throttle(() => {
    const { boards, lists, cards } = store.getState();
    console.log(store.getState());
    saveState({
      boards,
      lists,
      cards
    });
  }, 1000)
);

export default store;
