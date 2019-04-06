import axios from 'axios';
import { domain } from './constants';

import _ from 'underscore';

export const loadStore = () => {
  return new Promise(resolve => {
    axios(`${domain}/state`)
    .then(res => {
      res = res.data;
      var boardLocal = {}, listLocal = {};
      boardLocal.boardIds = [];
      boardLocal.boards = {};
      res.boards.map(board => {
        boardLocal.boardIds.push(board.id);
        boardLocal.boards[board.id] = {
          boardId: board.id,
          editing: false,
          listIds: board.listIds,
          name: board.name
        };
      });
      res.boards = {
        boards: boardLocal.boards,
        boardIds: boardLocal.boardIds
      };
      listLocal = _.indexBy(res.lists, 'id');
      res.lists = listLocal;
      console.log(res)
      return res;
    })
      .then(resolve);
  });
}

export const loadState = async () => {
  try {
     const loadFromServer = () => {
       axios.get(`${domain}/state`)
        .then(res => {
          res = res.data;
          var boardLocal = {}, listLocal = {};
          boardLocal.boardIds = [];
          boardLocal.boards = {};
          res.boards.map(board => {
            console.log(board.id)
            boardLocal.boardIds.push(board.id);
            boardLocal.boards[board.id] = {
              boardId: board.id,
              editing: false,
              listIds: board.listIds,
              name: board.name
            };
          });
          res.boards = {
            boards: boardLocal.boards,
            boardIds: boardLocal.boardIds
          };
          listLocal = _.indexBy(res.lists, 'id');
          res.lists = listLocal;
          console.log(res);
          return res;
        });
      }
      const data = await loadFromServer();
      return data;
    // const serializedState = localStorage.getItem("state");
    // if (serializedState === null) {
    //   return undefined;
    // }
    // console.log(JSON.parse(serializedState));    
  } catch (e) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    alert(`Failed to save state: ${e}`);
  }
};
