import uuid from "uuid/v4";

import { domain } from '../constants';

import * as actionTypes from "actions/types";
import Axios from "axios";

export const createListAsync = name => {
  return dispatch => {
    const data = {
      id: uuid(),
      name,
      editing: false,
      cardIds: []
    };
    Axios.post(`${domain}/list/add`, data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
    dispatch(createList(data))
    return createList(data)
  }
}

const createList = data => {
  return {
    type: actionTypes.CREATE_LIST,
    payload: data
  };
};

export const deleteListAsync = (boardId, listId) => {
  return dispatch => {
    const data = { 
      boardId,
      listId 
    };
    Axios.post(`${domain}/list/delete`, data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
    return dispatch(deleteList(data));
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
    const data = {
      listId,
      name,
      editing
    };
    Axios.post(`${domain}/list/update`, data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
    return dispatch(updateList(data));
  }
}

export const updateList = data => {
  return {
    type: actionTypes.UPDATE_LIST,
    payload: data
  };
};

export const attachToListAsync = (listId, cardId) => {
  return (dispatch) => {
    const data = {
      cardId,
      listId
    };
    Axios.post(`${domain}/list/attach`, data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
    return dispatch(attachToList(data));
  }
}

export const attachToList = data => {
  console.log("Yoyo")
  return {
    type: actionTypes.ATTACH_TO_LIST,
    payload: data
  };
};

export const detachFromListAsync = (listId, cardId) => {
  return dispatch => {
    const data = {
      cardId,
      listId
    };
    Axios.post(`${domain}/list/detach`, data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
    return dispatch(detachFromList(data));
  }
}

export const detachFromList = data => {
  return {
    type: actionTypes.DETACH_FROM_LIST,
    payload: data
  };
};
