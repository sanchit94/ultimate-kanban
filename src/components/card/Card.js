import React from "react";
import { DragSource } from "react-dnd";
import { connect } from 'react-redux';
import { Icon, Image, Confirm } from "semantic-ui-react";

import CardModal from '../ui/CardModal';
import { domain } from '../../constants';
import * as ItemTypes from "constants/ItemTypes";
import { uploadFileAsync } from '../../actions/cards';
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

//

//

const Card = React.forwardRef(
  ({ isDragging, connectDragSource, connectDropTarget }, ref) => {
    const cardRef = useRef(null);
    connectDragSource(cardRef);
    connectDropTarget(cardRef);
    const opacity = isDragging ? 0 : 1;
    useImperativeHandle(ref, () => ({
      getNode: () => cardRef.current,
    }));

    const handleDelete = e => {
      e.stopPropagation();
      this.props.onDelete(this.props.id);
    }
  
    const showConfirmModal = e => {
      e.stopPropagation();
      this.setState({
        open: true
      });
    }
  
    const hideConfirmModal = e => {
      e.stopPropagation();
      this.setState({
        open: false
      });
    }
  
    const cardImage = () => {
      return (
      <Image src={`${domain}/uploads/${this.props.cardImage}`} fluid alt="Cannot load" />
    )}
  
    const renderEditor = () => {
      // const location = this.getLocation();
      const { id, onUpdate, editing } = this.props;
      return (
        <Overlay onDismiss={() => null}>
           <CardModal 
            id={id}
            onUpdate={onUpdate}
            editing={editing}
           />
        </Overlay>
      );
    };
  
    const renderCard = () => {
      const { connectDragSource, id, onClick, editing, content, heading, priority, cardImage } = this.props;
      console.log(this.props);
      return connectDragSource(
        // react-dnd doesn't like refs in outter div
        <div>
          <div
            ref={this.cardRef}
            className="card"
            onClick={() => onClick(id)}
          >
            {cardImage && cardImage()}
            <div className="mt-2"></div>
            <div className={`card__labels__${priority}`}>
            </div>
            <div className="card__header">{heading}</div>
            <div className="card__content">
              <p>{content}</p>
            </div>
            <div className="card__close" onClick={showConfirmModal}>
              <Icon name="times" />
            </div>
            <Confirm open={this.state.open} header='Delete this card?' onCancel={hideConfirmModal} onConfirm={handleDelete} />
            {editing && renderEditor()}
          </div>
        </div>
      );
    };


    return (
      isDragging ? null : renderCard()
    )
  },
)
//
//


const mapStateToProps = state => ({
  cards: state.cards
})

export default connect(mapStateToProps,
   {
     uploadFileAsync
    })(DragSource(ItemTypes.CARD, cardSource, collect)(Card));
