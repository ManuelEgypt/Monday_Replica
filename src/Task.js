import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { ClickAwayListener } from "@material-ui/core";

const Container = styled.div`
  background-color: #f2f2f2;
  opacity: ${props => (props.isDragging ? 0.6 : 1)}
  border:  ${props =>
    props.isDragging ? `0.5px solid ${props.color}` : "0px solid blue"}
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
  width: 45px;
  border: 2px solid white;
  height: 35px;
  height: 40px;
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
    taskContent: this.props.task.content,
    deleteMode: false
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
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            color={this.props.color}
          >
            <div
              style={{
                backgroundColor: this.props.color,
                height: 40,
                width: `${
                  this.state.deleteMode && !this.props.colorSelectMode
                    ? "30px"
                    : "12px"
                }`,
                position: "reative",
                border: "3px solid white",
                right: 5
              }}
            ></div>
            {!this.props.colorSelectMode ? (
              <img
                src="https://img.pngio.com/filestop-xpng-x-png-240_240.png"
                style={{
                  height: 20,
                  width: 20,
                  position: "absolute",
                  left: 22,
                  marginTop: 10,
                  opacity: `${this.state.deleteMode ? "1" : "0"}`
                }}
              ></img>
            ) : null}
            <div
              onClick={() =>
                this.props.removeTask(this.props.task.id, this.props.group)
              }
              onMouseOver={() => this.setState({ deleteMode: true })}
              onMouseLeave={() => this.setState({ deleteMode: false })}
              style={{
                position: "absolute",
                backgroundColor: "green",
                opacity: 0,
                width: 35,
                height: 40
              }}
            ></div>
            <ContentSection
              onMouseOver={() => this.setState({ editMode: true })}
              onMouseLeave={() => this.setState({ editMode: false })}
              {...provided.dragHandleProps} //part of item to be dragged from
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
                            width: 20,
                            height: 20,
                            opacity: 1,
                            backgroundColor: "lightGrey",
                            padding: "6px",
                            position: "relative",
                            right: 17,
                            bottom: 2
                          }
                        : {
                            marginLeft: 17,
                            width: 20,
                            height: 20,
                            opacity: 0.5,
                            padding: "6px",
                            position: "relative",
                            right: 17,
                            bottom: 2
                          }
                    }
                  ></img>
                ) : null}
              </div>
            </ContentSection>
            <OwnerSection>
              {" "}
              <img
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: 20,
                  border: "1px solid black",
                  position: "relative",
                  top: 3,
                  opacity: 0.8,
                  left: 6
                }}
                src={this.props.task.ownerPic}
              ></img>
            </OwnerSection>
          </Container>
        )}
      </Draggable>
    );
  }
}
export default Task;
