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
    return Axios.post(`${domain}/list/add`, data)
    .then(res => {
      if (res.status === 200) {
        dispatch(createList(data))
        return createList(data)
      }
    })
    .catch(err => {
      console.log(err);
    });
    
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
    return Axios.post(`${domain}/list/delete`, data)
    .then(res => {
      if (res.status === 200) {
        dispatch(deleteList(data));
        return deleteList(data);
      }
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
    const data = {
      listId,
      name,
      editing
    };
    return Axios.post(`${domain}/list/update`, data)
    .then(res => {
      if (res.status === 200) {
        dispatch(updateList(data));
        return updateList(data);
      }
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
  return (dispatch) => {
    const data = {
      cardId,
      listId
    };
    return Axios.post(`${domain}/list/attach`, data)
    .then(res => {
      if (res.status === 200) {
        dispatch(attachToList(data));
        return attachToList(data);
      }
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
    const data = {
      cardId,
      listId
    };
    return Axios.post(`${domain}/list/detach`, data)
    .then(res => {
      if (res.status === 200) {
        dispatch(detachFromList(data));
        return detachFromList(data);
      }
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
