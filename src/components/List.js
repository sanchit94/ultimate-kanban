import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { DropTarget } from "react-dnd";
import { Icon } from "semantic-ui-react";

import Card from "components/card/Card";
import AddCardButton from "components/AddCardButton";
import { createCardAsync, updateCardAsync, deleteCardAsync } from "actions/cards";
import { attachToListAsync, detachFromListAsync } from "actions/lists";
import * as ItemTypes from "constants/ItemTypes";

const List = props => {
  const { cardIds, onDelete, connectDropTarget, id } = props;

  const handleCreateCard = content => {
    const card = props.createCardAsync(content);
    console.log(card);
    console.log("id", props.id);
    props.attachToListAsync(props.id, card.payload.id);
  };

  const handleDeleteCard = cardId => {
    props.deleteCardAsync(props.id, cardId);
  };

  const handleUpdateCard = (id, content, editing = false) => {
    const card = {
      id,
      content,
      editing
    };
    props.updateCardAsync(card);
  };

  const handleClick = id => {
    const card = props.cards.find(card => card.id === id);
    card.editing = true;
    props.updateCardAsync(card);
  };

  const renderCards = () => {
    return cardIds.map(cardId => {
      const cardProps = props.cards.find(card => card.id === cardId);
      return (
        <Card
          key={cardId}
          onDelete={handleDeleteCard}
          onUpdate={handleUpdateCard}
          onClick={handleClick}
          listId={props.id}
          {...cardProps}
        />
      );
    });
  };

  return connectDropTarget(
    <div className="list">
      <div
        className={`list__dragging-over ${props.isOver &&
          "list__dragging-over--active"}`}
      />
      <div className="list__header">
        {props.children}
        <div className="list__header__close" onClick={() => onDelete(id)}>
          <Icon name="times" />
        </div>
      </div>
      <div className="list__content">
        {renderCards()}
        <AddCardButton
          open={props.addCardEditor.open && id === props.addCardEditor.listId}
          onCreateCard={handleCreateCard}
          listId={id}
        />
      </div>
    </div>
  );
};

List.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired
};

const cardTarget = {
  drop(props, monitor) {
    const cardId = monitor.getItem().id;
    const listId = monitor.getItem().listId;

    props.detachFromListAsync(listId, cardId);
    props.attachToListAsync(props.id, cardId);
  }
};

const collect = (dndConnect, monitor) => {
  return {
    connectDropTarget: dndConnect.dropTarget(),
    isOver: monitor.isOver()
  };
};

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  addCardEditor: state.ui.addCardEditor
});

export default connect(
  mapStateToProps,
  {
    createCardAsync,
    updateCardAsync,
    deleteCardAsync,
    attachToListAsync,
    detachFromListAsync
  }
)(DropTarget(ItemTypes.CARD, cardTarget, collect)(List));
