import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { DropTarget } from "react-dnd";
import { Icon, Confirm } from "semantic-ui-react";
import _ from 'underscore';

import Card from "components/card/Card";
import AddCardButton from "components/AddCardButton";
import { createCardAsync, updateCardAsync, updateCard, deleteCardAsync } from "actions/cards";
import { attachToListAsync, detachFromListAsync } from "actions/lists";
import * as ItemTypes from "constants/ItemTypes";

class List extends React.Component {
  state = {
    open: false
  }

  handleCreateCard = async content => {
    const card = await this.props.createCardAsync(content);
    if (card) {
      this.props.attachToListAsync(this.props.id, card.payload.id);
    }
    
  };

  handleDeleteCard = cardId => {
    _.throttle((listId, cardId) => {
      this.props.deleteCardAsync(listId, cardId);
    }, 2000)(this.props.id, cardId);    
  };

  handleUpdateCard = (id, content, editing = false) => {
    const card = {
      id,
      editing,
      ...content
    };
    this.props.updateCardAsync(card);
  };

  handleClick = id => {
    const card = this.props.cards.find(card => card.id === id);
    card.editing = true;
    this.props.updateCard(card);
  };

  showConfirmModal = e => {
    e.stopPropagation();
    this.setState({
      open: true
    });
  }

  hideConfirmModal = e => {
    e.stopPropagation();
    this.setState({
      open: false
    });
  }

  renderCards = () => {
    return this.props.cardIds.map(cardId => {
      console.log(cardId, "CardId")
      const cardProps = this.props.cards.find(card => card.id === cardId);
      console.log("CardProps", cardProps);
      return (
        <Card
          key={cardId}
          onDelete={this.handleDeleteCard}
          onUpdate={this.handleUpdateCard}
          onClick={this.handleClick}
          listId={this.props.id}
          {...cardProps}
        />
      );
    });
  };
  render() {
    const { connectDropTarget, onDelete, id } = this.props;
    return (
      connectDropTarget(
      <div className="list">
        <div
          className={`list__dragging-over ${this.props.isOver &&
            "list__dragging-over--active"}`}
        />
        <div className="list__header">
          {this.props.children}
          <div className="list__header__close" onClick={this.showConfirmModal}>
            <Icon name="times" />
          </div>
          <Confirm open={this.state.open} header='Delete this entire list along with all cards?' onCancel={this.hideConfirmModal} onConfirm={() => onDelete(id)} />
        </div>
        <div className="list__content">
          {this.renderCards()}
          <AddCardButton
            open={this.props.addCardEditor.open && id === this.props.addCardEditor.listId}
            onCreateCard={this.handleCreateCard}
            listId={id}
          />

        </div>
      </div>
    )
    );

  }

  
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
    if (listId === props.id) {
      return;
    }

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
    updateCard,
    deleteCardAsync,
    attachToListAsync,
    detachFromListAsync
  }
)(DropTarget(ItemTypes.CARD, cardTarget, collect)(List));
