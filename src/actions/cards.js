import uuid from "uuid/v4";

import { domain } from '../constants';

import * as actionTypes from "actions/types";
import Axios from "axios";

export const createCardAsync = content => {
  return dispatch => {
    const data = {
      id: uuid(),
      editing: false,
      content: content.content,
      heading: content.heading,
      labels: []
    }; 
    return Axios.post(`${domain}/card/create`, data)
    .then(res => {
      if (res.status == 200) {
        dispatch(createCard(data));
        return createCard(data);
      }
    })
    .catch(err => {
      console.error(err);
      return null;
    });
  }
}

export const createCard = content => {
  return {
    type: actionTypes.CREATE_CARD,
    payload: {
      ...content
    }
  };
};

export const updateCardAsync = card => {
  return dispatch => {
    const data = {
      ...card
    };
    return Axios.post(`${domain}/card/update`, data)
    .then(res => {
      if (res.status === 200){
        dispatch(updateCard(data));
        return updateCard(data);
      }
    })
    .catch(err => {
      console.error(err);
    });
    
  }
}

export const updateCard = card => {
  return {
    type: actionTypes.UPDATE_CARD,
    payload: card
  };
};

export const deleteCardAsync = (listId, cardId) => {
  return dispatch => {
    const data = {
      cardId,
      listId
    };
    return Axios.post(`${domain}/card/delete`, data)
    .then(res => {
      if (res.status == 200) {
        dispatch(deleteCard(data));
        return deleteCard(data)
      }
    })
    .catch(err => {
      console.error(err);
    });
    
  }
}

export const deleteCard = (data) => {
  return {
    type: actionTypes.DELETE_CARD,
    payload: data
  };
};

export const deleteAllListCards = cardIds => {
  return dispatch => {
    return Axios.post(`${domain}/card/del-all-cards`, cardIds)
      .then(res => {
        if (res.data == 200) {
          dispatch({ type: actionTypes.DELETE_FROM_LIST, payload: cardIds });
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export const uploadFileAsync = (file, cardId) => {
  const data = {
    file,
    cardId
  };
  let formData = new FormData();
  formData.append('cardImage', file, file.name);
  formData.append('cardId', cardId);
  return dispatch => {
    return Axios({
      method: "post",
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      url: `${domain}/card/upload`,
      data: formData
    })
    .then(res => {
      console.log(res);
      if (res.status === 200) {
        dispatch({ type: actionTypes.IMAGE_UPLOAD, payload: data });
        return true;
      }
    })
    .catch(err => {
      alert("Error occured. Maybe the file size is too large.");
    });
  }
};
