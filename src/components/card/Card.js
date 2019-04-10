import React from "react";
import { DragSource } from "react-dnd";
import { connect } from 'react-redux';
import { Icon, Modal, Form, Button, Image, Confirm, Dropdown } from "semantic-ui-react";

import { domain } from '../../constants';
import * as ItemTypes from "constants/ItemTypes";
import { uploadFileAsync } from '../../actions/cards'
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

const options = [
  { key: 1, text: 'High', value: 1 },
  { key: 2, text: 'Medium', value: 2 },
  { key: 3, text: 'Low', value: 3 },
];

class Card extends React.Component {
  cardRef = React.createRef();

  constructor(props) {
    super(props);
    const index = this.props.cards.findIndex(
      card => card.id === this.props.id
    );
    console.log(this.props.id);

    this.state = {
      heading: this.props.cards[index].heading,
      content: this.props.cards[index].content,
      cardImage: this.props.cards[index].cardImage,
      open: false,
      showModal: false,
      priority: this.props.cards[index].priority || 2
    };
    this.fileInputRef = React.createRef();
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

  uploadFile = () => {
    this.fileInputRef.current.click();
    // this.showModal();

  }
  
  fileChange = async e => {
    const file = e.target.files[0];
    const isUploaded = await this.props.uploadFileAsync(file, this.props.id);
    this.setState({
      cardImage: file.name
    });

    if (isUploaded) {
      alert("Image Uploaded");
    }
  }

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

  hideModal = () => {
    const content = this.state;
    this.props.onUpdate(this.props.id, content, false);
  }

  handlePriorityChange = (e, { value }) => {
    this.setState({
      priority: value
    })
  }

  cardImage = () => {
    return (
    <Image src={`${domain}/uploads/${this.state.cardImage}`} fluid alt="Cannot load" />
  )}

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
              <input name='heading' value={this.state.heading} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <textarea name='content' value={this.state.content} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
            <label>Priority</label>
            <Dropdown
            onChange={this.handlePriorityChange}
            options={options}
            placeholder='Choose an option'
            selection
            value={this.state.priority}
          />
            </Form.Field>
            <Button type='submit'>Submit</Button>
            <Button onClick={this.hideModal}>Cancel</Button>
          </Form>
          <div className="mt-2"></div>
          <Button
            content="Choose Image"
            labelPosition="left"
            icon="file"
            onClick={this.uploadFile}
          />
          <input
            ref={this.fileInputRef}
            type="file"
            hidden
            onChange={this.fileChange}
          />
          </Modal.Content>
        </Modal>
      </Overlay>
    );
  };

  renderCard = () => {
    const { connectDragSource, id, onClick, onDelete, editing, content, heading } = this.props;
    return connectDragSource(
      // react-dnd doesn't like refs in outter div
      <div>
        <div
          ref={this.cardRef}
          className="card"
          onClick={() => onClick(id)}
        >
          {this.state.cardImage && this.cardImage()}
          <div className="mt-2"></div>
          <div className={`card__labels__${this.state.priority}`}>
          </div>
          <div className="card__header">{heading}</div>
          <div className="card__content">
            <p>{content}</p>
          </div>
          <div className="card__close" onClick={this.showConfirmModal}>
            <Icon name="times" />
          </div>
          <Confirm open={this.state.open} header='Delete this card?' onCancel={this.hideConfirmModal} onConfirm={() => onDelete(id)} />
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

export default connect(mapStateToProps,
   {
     uploadFileAsync
    })(DragSource(ItemTypes.CARD, cardSource, collect)(Card));
