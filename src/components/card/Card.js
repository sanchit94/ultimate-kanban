import React from "react";
import { DragSource } from "react-dnd";
import { connect } from 'react-redux';
import { Icon, Modal, Form, Button } from "semantic-ui-react";

import * as ItemTypes from "constants/ItemTypes";
import CardEditor from "./CardEditor";
import Overlay from "../ui/Overlay";

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      listId: props.listId
    };
  },
  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDraggin: monitor.isDragging()
  };
};

class Card extends React.Component {
  cardRef = React.createRef();

  // getLocation = () => {
  //   const { x, y } = this.cardRef.current.getClientRects()[0];
  //   return { x, y };
  // };

  constructor(props) {
    super(props);
    const index = this.props.cards.findIndex(
      card => card.id === this.props.id
    );

    this.state = {
      heading: this.props.cards[index].heading,
      content: this.props.cards[index].content,
      imageUrl: "",
      showModal: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit = e => {
    e && e.preventDefault();
    const content = this.state;
    this.props.onUpdate(this.props.id, content);
    this.setState({
      showModal: false
    })
  }

  hideModal = () => {
    const content = this.state;
    this.props.onUpdate(this.props.id, content, false);
  }

  renderEditor = () => {
    // const location = this.getLocation();
    return (
      <Overlay onDismiss={() => null}>
         <Modal size="tiny" open={this.props.editing}>
    <Modal.Header>Edit Card Details</Modal.Header>
    <Modal.Content>
      <Form onSubmit={this.handleSubmit}>
      <Form.Field>
        <label>Heading</label>
        <input placeholder='First Name' name='heading' value={this.state.heading} onChange={this.handleChange} />
      </Form.Field>
      <Form.Field>
        <label>Description</label>
        <textarea placeholder='Last Name' name='content' value={this.state.content} onChange={this.handleChange} />
      </Form.Field>
      <Form.Field>
      </Form.Field>
      <Button type='submit'>Submit</Button>
      <Button onClick={this.hideModal}>Cancel</Button>
    </Form>
    </Modal.Content>
  </Modal>
      </Overlay>
    );
  };

  renderCard = () => {
    const { connectDragSource, id, onDelete, editing, content, heading } = this.props;
    return connectDragSource(
      // react-dnd doesn't like refs in outter div
      <div>
        <div
          ref={this.cardRef}
          className="card"
          onClick={() => this.props.onClick(id)}
        >
          <div className="card__labels">
            {/* <Label circular empty color="red" /> */}
          </div>
          <div className="card__header">{heading || "No Heading"}</div>
          <div className="card__content">
            <p>{content}</p>
          </div>
          <div className="card__close" onClick={() => onDelete(id)}>
            <Icon name="times" />
          </div>
          {editing && this.renderEditor()}
        </div>
      </div>
    );
  };

  render() {
    const { isDragging } = this.props;
    return isDragging ? null : this.renderCard();
  }
}

const mapStateToProps = state => ({
  cards: state.cards
})

export default connect(mapStateToProps, null)(DragSource(ItemTypes.CARD, cardSource, collect)(Card));
