import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

import AddBox from "components/ui/AddBox";
import { openAddListBox, closeAddListBox } from "actions/ui";
import { createList } from "actions/lists";

const AddList = props => {
  const button = (
    <button
      className="board__content__add__button"
      onClick={props.openAddListBox}
    >
      <Icon name="plus" /> Add another list
    </button>
  );

  const box = (
    <AddBox
      placeholder="Enter list title..."
      onAdd={props.createList}
      onDismiss={props.closeAddListBox}
      buttonText="Add List"
    />
  );

  return props.open ? box : button;
};

export default connect(
  null,
  { openAddListBox, closeAddListBox, createList }
)(AddList);