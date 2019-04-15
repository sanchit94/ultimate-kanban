import React, { Component } from 'react';
import { connect } from 'react-redux';

import { uploadFileAsync, createCardAsync, updateCard } from '../../actions/cards';
import { Modal, Form, Dropdown, Button } from 'semantic-ui-react';

const options = [
    { key: 1, text: 'High', value: 1 },
    { key: 2, text: 'Medium', value: 2 },
    { key: 3, text: 'Low', value: 3 },
    { key: 4, text: 'No priority', value: 4}
  ];
  

class CardModal extends Component {
    constructor(props) {
        super(props);
        const index = this.props.cards.findIndex(
          card => card.id === this.props.id
        );
        console.log(this.props.id);
    
        this.state = {
          heading: this.props.cards[index].heading,
          content: this.props.cards[index].content,
          priority: this.props.cards[index].priority || 2
        };
        this.fileInputRef = React.createRef();
      }

      handleSubmit = e => {
        e && e.preventDefault();
        const content = this.state;
        this.props.onUpdate(this.props.id, content);
      }

      handleChange = e => {
        this.setState({
          [e.target.name] : e.target.value
        })
      }

      handlePriorityChange = (e, { value }) => {
        this.setState({
          priority: value
        })
      }

      hideModal = () => {
        this.props.updateCard({id: this.props.id, editing: false});
      }

      uploadFile = () => {
        this.fileInputRef.current.click();
      }

      fileChange = async e => {
        const file = e.target.files[0];
        const isUploaded = await this.props.uploadFileAsync(file, this.props.id);
        if (isUploaded) {
          alert("Image Uploaded");
        }
      }

    render() {
        return(
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
        );
    }
}

const mapStateToProps = state => ({
    cards: state.cards
  })
  
export default connect(mapStateToProps,
    {
    uploadFileAsync,
    createCardAsync,
    updateCard
    })(CardModal);