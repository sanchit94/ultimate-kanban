import React, { useState } from "react";
import { DragSource, DropTarget } from "react-dnd";
import { connect } from 'react-redux';
import { Icon, Image, Confirm, Ref } from "semantic-ui-react";

import _ from 'lodash';
import CardModal from '../ui/CardModal';
import { domain } from '../../constants';
import * as ItemTypes from "constants/ItemTypes";
import { uploadFileAsync } from '../../actions/cards';
import { detachFromListAsync, attachToListAsync, reorderCardAsync } from '../../actions/lists';
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

const cardDropTarget = {
  
  drop(props, monitor) {
    console.log(props, "Props");
    const cardId = monitor.getItem().id;
    const listId = monitor.getItem().listId;
    if (listId !== props.listId) {
      props.detachFromListAsync(listId, cardId);
      props.attachToListAsync(props.listId, cardId);
    } else {
      _.throttle((listId, cardId, id) => {
        props.reorderCardAsync(listId, cardId, id);
      }, 2000)(listId, cardId, props.id);
      
    }
    
  }
}

const targetCollect = (dndConnect, monitor) => {
  return {
    connectDropTarget: dndConnect.dropTarget(),
    isOver: monitor.isOver()
  };
}

//

//

const Card = (props, ref) => {
    const [opened, toggleOpen] = useState(false);
    const { isDragging } = props;
    // const cardRef = useRef(null);
    // connectDragSource(cardRef)
    // connectDropTarget(cardRef)
    // useImperativeHandle(ref, () => ({
    //   getNode: () => cardRef.current,
    // }));

    const handleDelete = e => {
      e.stopPropagation();
      props.onDelete(props.id);
    }

    const showConfirmModal = e => {
      e.stopPropagation();
      toggleOpen(!opened);
    }
  
    const hideConfirmModal = e => {
      e.stopPropagation();
      toggleOpen(!opened);
    }
  
    const cardImage = () => {
      return (
      <Image src={`${domain}/uploads/${props.cardImage}`} fluid alt="Cannot load" />
    )}
  
    const renderEditor = () => {
      // const location = this.getLocation();
      const { id, onUpdate, editing } = props;
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
      const {  id, onClick, editing, content, heading, priority } = props;
      return (
        // react-dnd doesn't like refs in outter div
          <div
            className="card"
            onClick={() => onClick(id)}
          >
            {props.cardImage && cardImage()}
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
            <Confirm open={opened} header='Delete this card?' onCancel={hideConfirmModal} onConfirm={handleDelete} />
            {editing && renderEditor()}
          </div>

      );
    };


    return (
      <div onDrop={(e) => console.log(e, "OnDrop")}>
        {isDragging ? null : renderCard()}
      </div>
      
    );
  }

//
//


const mapStateToProps = state => ({
  cards: state.cards
});

const DraggableItem = props => {
  const { connectDragSource, connectDropTarget } = props
  return (
    <Ref innerRef={instance => {
      connectDropTarget(instance);
      connectDragSource(instance)}}>
      <Card {...props} />
    </Ref>
  )
}

const App = _.flow([
  DropTarget(ItemTypes.CARD, cardDropTarget, targetCollect),
  DragSource(ItemTypes.CARD, cardSource, collect),
  connect(mapStateToProps,
    {
      uploadFileAsync,
      detachFromListAsync,
      attachToListAsync,
      reorderCardAsync
     })
])(DraggableItem);

export default App;

