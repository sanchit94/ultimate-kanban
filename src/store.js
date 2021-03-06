import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "reducers";
import { loadStore } from "./localStorage";
import * as asyncInitialState from 'redux-async-initial-state';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, asyncInitialState.middleware(loadStore))));

// store.subscribe(
//   throttle(() => {
//     const { boards, lists, cards } = store.getState();
//     saveState({
//       boards,
//       lists,
//       cards
//     });
//   }, 1000)
// );

export default store;
