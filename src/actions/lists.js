import uuid from "uuid/v4";

import { domain } from '../constants';

import * as actionTypes from "actions/types";
import Axios from "axios";

export const createListAsync = name => {
  return dispatch => {
    Axios.post(`${domain}/list/add`, {
      id: uuid(),
      name,
      editing: false,
      cardIds: []
    })
    .then(res => {
      dispatch(createList(res.data));
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export const createList = data => {
  return {
    type: actionTypes.CREATE_LIST,
    payload: data
  };
};

export const deleteListAsync = (boardId, listId) => {
  return dispatch => {
    Axios.post(`${domain}/list/delete`, { 
      boardId,
      listId 
    })
    .then(res => {
      dispatch(deleteList(res.data));
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export const deleteList = data => {
  return {
    type: actionTypes.DELETE_LIST,
    payload: data
  };
};

export const updateListAsync = (listId, name, editing = false) => {
  return dispatch => {
    Axios.post(`${domain}/list/update`, {
      listId,
      name,
      editing
    })
    .then(res => {
      dispatch(updateList(res.data));
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export const updateList = data => {
  return {
    type: actionTypes.UPDATE_LIST,
    payload: data
  };
};

export const attachToListAsync = (listId, cardId) => {
  return dispatch => {
    Axios.post(`${domain}/list/attach`, {
      cardId,
      listId
    })
    .then(res => {
      dispatch(attachToList(res.data));
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export const attachToList = data => {
  return {
    type: actionTypes.ATTACH_TO_LIST,
    payload: data
  };
};

export const detachFromListAsync = (listId, cardId) => {
  return dispatch => {
    Axios.post(`${domain}/list/detach`, {
      cardId,
      listId
    })
    .then(res => {
      dispatch(detachFromList(res.data));
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export const detachFromList = data => {
  return {
    type: actionTypes.DETACH_FROM_LIST,
    payload: data
  };
};
