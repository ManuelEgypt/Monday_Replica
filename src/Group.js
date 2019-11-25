import React from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Collapsible from "react-collapsible";
import ColorSelection from "./ColorSelection";

import { ClickAwayListener } from "@material-ui/core";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: ${props => (props.open ? "35px" : "5px")};
`;
const Title = styled.h3`
  padding: 8px;
  display: flex;
`;
const CollapseButton = styled.div`
  padding: 8px;
`;
const Head = styled.div`
  display: flex;
  background-color: ${props => (props.bg ? "white" : "#e6e6e6")};
`;

const Form = styled.form`
  flex: 1;
  opacity: ${props => (props.isDrag ? 0 : 1)};
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 1s ease;
  background-color: ${props => (props.isDraggingOver ? "#e6e6e6" : "white")};
`;

class Group extends React.Component {
  state = {
    open: true,
    showButton: false,
    itemName: "",
    showAdd: "",
    showDelete: false,
    editTitle: false,
    titleName: this.props.group.title,
    showEdit: false,
    groupColor: this.props.group.color
  };

  handleMouseOver = dragg => {
    this.setState({ showButton: true });
    console.log(dragg);
  };

  handleMouseOver2 = dragg => {
    //if (!dragg) setTimeout(() => this.setState({ showAdd: true }), 500);
    if (!this.props.isDrag) this.setState({ showAdd: true });
  };
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
  };

  handleTitleClick = e => {
    this.setState({ editTitle: true });
  };

  handleClickAway = () => {
    if (this.state.titleName) this.setState({ editTitle: false });
  };

  handleClickAway2 = () => {
    this.setState({ colorSelectMode: false });
  };

  changeGroupColor = color => {
    this.setState({ groupColor: color, colorSelectMode: false });
  };

  handleAdd = () => {
    this.props.addTask(this.props.group, this.state.itemName);
    this.setState({ itemName: "" });
  };

  render() {
    const Trigger = () => null;
    return (
      <Draggable draggableId={this.props.group.id} index={this.props.index}>
        {provided => (
          <Container
            open={this.state.open}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Head
              onMouseOver={() =>
                this.setState({
                  showButton: true
                })
              }
              onMouseLeave={() =>
                this.setState({ showButton: false, showEdit: false })
              }
              bg={this.state.open}
            >
              <Title
                {...provided.dragHandleProps}
                style={{
                  color: this.state.groupColor
                }}
              >
                {this.state.showButton ? (
                  <div
                    style={{
                      padding: 5,
                      margin: "3px",
                      marginRight: "12px",
                      width: 20,
                      height: 20,
                      backgroundColor: this.state.groupColor,
                      borderRadius: 6
                    }}
                    onClick={() =>
                      this.setState({
                        colorSelectMode: !this.state.colorSelectMode
                      })
                    }
                  ></div>
                ) : null}
                <div
                  style={{ display: "flex" }}
                  onMouseLeave={() => this.setState({ showDelete: false })}
                >
                  {this.state.showDelete ? (
                    <img
                      onClick={() =>
                        this.props.removeGroup(this.props.group.id)
                      }
                      src="https://img.pngio.com/filestop-xpng-x-png-240_240.png"
                      style={{
                        height: 20,
                        width: 20,
                        marginRight: 5,
                        marginTop: 3
                      }}
                    ></img>
                  ) : null}

                  {!this.state.editTitle ? (
                    <div style={{ display: "flex" }}>
                      <div
                        onClick={this.handleTitleClick}
                        onMouseOver={() =>
                          this.setState({
                            showEdit: true,
                            showDelete: true
                          })
                        }
                        onMouseLeave={() => this.setState({ showEdit: false })}
                        style={
                          this.state.showEdit
                            ? { border: "1px dotted grey", padding: 3 }
                            : null
                        }
                      >
                        {this.state.titleName}
                      </div>
                    </div>
                  ) : (
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                      <input
                        type="text"
                        name="titleName"
                        style={{
                          position: "relative",
                          width: "50%",
                          padding: "8px",
                          bottom: 5,
                          color: this.state.groupColor,
                          fontSize: 20,
                          fontWeight: "400"
                        }}
                        autoFocus={true}
                        placeholder="Group Name"
                        value={this.state.titleName}
                        onChange={this.changeHandler}
                      />
                    </ClickAwayListener>
                  )}
                </div>
              </Title>
              {this.state.showButton ? (
                <>
                  <CollapseButton
                    onClick={() => this.setState({ open: !this.state.open })}
                  >
                    {this.state.open ? (
                      <img
                        style={{ width: 25, height: 25 }}
                        src="https://icon-library.net/images/collapse-expand-icon/collapse-expand-icon-15.jpg"
                      ></img>
                    ) : (
                      <img
                        style={{ marginTop: 2, width: 25, height: 25 }}
                        src="https://cdn1.iconfinder.com/data/icons/navigation-arrows/512/arrow-twoside-updown-withoutbg-512.png"
                      ></img>
                    )}
                  </CollapseButton>

                  <CollapseButton
                  //part of item to be dragged from
                  >
                    {this.state.open ? (
                      <img
                        style={{
                          marginTop: 3,
                          width: 20,
                          height: 20
                        }}
                        src="https://png.pngtree.com/svg/20170817/drag_icon_633892.png"
                      ></img>
                    ) : null}
                  </CollapseButton>

                  <CollapseButton
                    onClick={() =>
                      this.setState({ showAdd: !this.state.showAdd })
                    }
                  >
                    {this.state.open ? (
                      <img
                        style={{
                          marginTop: 3,
                          width: 20,
                          height: 20
                        }}
                        src="https://cdn1.iconfinder.com/data/icons/ui-colored-1/100/UI__2-512.png"
                      ></img>
                    ) : null}
                  </CollapseButton>

                  {this.state.showAdd ? (
                    <Form
                      onSubmit={this.submitHandler}
                      isDrag={this.state.isDrag}
                    >
                      <input
                        type="text"
                        name="itemName"
                        style={{
                          position: "relative",
                          width: "50%",
                          padding: "8px",
                          bottom: 7
                        }}
                        placeholder="Add new Task"
                        value={this.state.itemName}
                        onChange={this.changeHandler}
                      />

                      {this.state.itemName ? (
                        <img
                          onClick={this.handleAdd}
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Fairytale_button_add.svg/1024px-Fairytale_button_add.svg.png"
                          style={{
                            height: 31,
                            width: 31,
                            position: "relative",
                            right: 40,
                            bottom: 7
                          }}
                        ></img>
                      ) : null}
                    </Form>
                  ) : null}
                </>
              ) : null}
            </Head>
            <Droppable droppableId={this.props.group.id} type="task">
              {(provided, snapshot) => (
                <>
                  {this.state.colorSelectMode ? (
                    <ClickAwayListener onClickAway={this.handleClickAway2}>
                      <ColorSelection
                        style={{ position: "relative", zIndex: 0 }}
                        changeGroupColor={color => this.changeGroupColor(color)}
                      />
                    </ClickAwayListener>
                  ) : null}

                  <Collapsible
                    trigger={<Trigger />}
                    open={this.state.open}
                    transitionTime={200}
                  >
                    <TaskList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      isDraggingOver={snapshot.isDraggingOver}
                      onMouseOver={() =>
                        this.handleMouseOver2(snapshot.isDraggingOver)
                      }
                      onMouseLeave={() => this.setState({ showAdd: false })}
                    >
                      {this.props.tasks.map((task, index) => (
                        <Task
                          color={this.state.groupColor}
                          key={task.id}
                          task={task}
                          index={index}
                          group={this.props.group}
                          removeTask={this.props.removeTask}
                        />
                      ))}

                      {provided.placeholder}
                    </TaskList>
                  </Collapsible>
                </>
              )}
            </Droppable>
            {/* <div
              style={{ width: 100, height: 100, backgroundColor: "red" }}
            ></div> */}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Group;
