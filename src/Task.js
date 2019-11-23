import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { ClickAwayListener } from "@material-ui/core";

const Container = styled.div`
  background-color: ${props => (props.isDragging ? "#f2fff5" : "#f2f2f2")};
  opacity: ${props => (props.isDragging ? 0.6 : 1)}
  transition: background-color 10s ease;
  display: flex
`;

const ContentSection = styled.div`
  width: 300px;
  padding: 8px;
  border: 2px solid white;
  display: flex;
`;
const OwnerSection = styled.div`
  width: 100px;
  padding: 8px;
  border: 2px solid white;
`;

// const draggableSnapshot = {
//   isDragging: true  //draggable being dragged
//   draggingOver: '1'   //droppable id under draggable    //null
// };

// const droppableSnapSshot = {
//   isDraggingOver:true,  //draggable is dragging over the dropabble
//   draggingOverWith: '1'   //draggable id draging over the dropabble
// }

class Task extends React.Component {
  state = {
    editMode: false,
    taskContent: this.props.task.content
  };
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClickAway = () => {
    this.setState({ editEnabled: false });
  };
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps} //part of item to be dragged from
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div
              style={{
                backgroundColor: this.props.color,
                height: 35,
                width: 8,
                position: "reative",
                border: "3px solid white",
                right: 10
              }}
            ></div>
            <ContentSection
              onMouseOver={() => this.setState({ editMode: true })}
              onMouseLeave={() => this.setState({ editMode: false })}
            >
              {this.state.editEnabled ? (
                <ClickAwayListener onClickAway={this.handleClickAway}>
                  <input
                    type="text"
                    name="taskContent"
                    style={{
                      position: "relative",
                      width: "50%"
                    }}
                    autoFocus={true}
                    placeholder="Edit Task"
                    value={this.state.taskContent}
                    onChange={this.changeHandler}
                  />
                </ClickAwayListener>
              ) : (
                <div
                  style={
                    this.state.editMode
                      ? {
                          color: "blue",
                          border: `${
                            this.state.editModeFocus ? "1px" : "0px"
                          } dotted lightgrey`,
                          height: 20
                        }
                      : null
                  }
                >
                  {this.state.taskContent}
                </div>
              )}

              <div
                onMouseOver={() => this.setState({ editModeFocus: true })}
                onMouseLeave={() => this.setState({ editModeFocus: false })}
                onClick={() => this.setState({ editEnabled: true })}
              >
                {" "}
                {this.state.editMode ? (
                  <img
                    src="https://cdn2.iconfinder.com/data/icons/education-2-45/48/71-512.png"
                    style={
                      this.state.editModeFocus
                        ? {
                            marginLeft: 17,
                            width: 10,
                            height: 10,
                            opacity: 1,
                            backgroundColor: "lightGrey",
                            padding: "6px",
                            position: "relative",
                            right: 17
                          }
                        : {
                            marginLeft: 17,
                            width: 10,
                            height: 10,
                            opacity: 0.5,
                            padding: "6px",
                            position: "relative",
                            right: 17
                          }
                    }
                  ></img>
                ) : null}
              </div>
            </ContentSection>
            <OwnerSection> {this.props.task.owner}</OwnerSection>
          </Container>
        )}
      </Draggable>
    );
  }
}
export default Task;
