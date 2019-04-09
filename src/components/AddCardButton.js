import React from "react";
import { connect } from "react-redux";
import { Icon, Modal, Form, Button } from "semantic-ui-react";

import { openAddCardEditor, closeAddCardEditor } from "actions/ui";
import { createCardAsync } from "actions/cards";
import { attachToListAsync } from "actions/lists";

class AddCardButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: "",
      content: "",
      imageUrl: "",
      file: null,
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
    if (!content.heading && !content.content) {
      return this.hideModal();
    }
    this.props.onCreateCard(content);
    this.setState({
      showModal: false
    })
  }

  showModal = () => {
    this.setState({
      showModal: true
    })
  }

  hideModal = () => {
    this.setState({
      showModal: false
    })
  }

 
  
  button = (
    <button
      className="list__content__button"
      onClick={() => this.showModal()}
    >
      <Icon name="plus" />
      <span>Add another card</span>
    </button>
  );

 
  render() {
    return (
  <Modal size="tiny" open={this.state.showModal} trigger={this.button}>
    <Modal.Header>Create a new Card</Modal.Header>
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
      
      </Form.Field>
      <Button type='submit'>Submit</Button>
      <Button onClick={this.hideModal}>Cancel</Button>
    </Form>
    
    </Modal.Content>
  </Modal>
    )
  }

};

export default connect(
  null,
  { openAddCardEditor, closeAddCardEditor, createCardAsync, attachToListAsync }
)(AddCardButton);
