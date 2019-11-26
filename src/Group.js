import React from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Collapsible from "react-collapsible";
import ColorSelection from "./ColorSelection";

import { AwesomeButton } from "react-awesome-button";
import { Form } from "react-bootstrap";

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

const TaskForm = styled.form`
  flex: 1;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 1s ease;
  background-color: ${props => (props.isDraggingOver ? "#e6e6e6" : "white")};
`;

class Group extends React.Component {
  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps.isDrag !== newProps.isDrag) {
      if (newProps.isDrag)
        this.setState({ open: !newProps.isDrag, isDrag: newProps.isDrag });
      else
        setTimeout(
          () => this.setState({ open: this.state.openOld, isDrag: false }),
          500
        );
    }
    console.log("STATE:::::", this.state);
  }
  state = {
    open: true,
    openOld: true,
    showButton: false,
    itemName: "",
    showAdd: "",
    showDelete: false,
    editTitle: false,
    titleName: this.props.group.title,
    showEdit: false,
    groupColor: this.props.group.color,
    inputExpand: false,
    colorSelectMode: false
  };

  handleMouseOver = dragg => {
    this.setState({ showButton: true });
    console.log(dragg);
  };

  handleMouseOver2 = () => {
    //if (!dragg) setTimeout(() => this.setState({ showAdd: true }), 500);
    this.setState({ showAdd: true });
  };
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
  };

  handleTitleClick = e => {
    if (!this.state.isDrag)
      this.setState({ editTitle: true, titleNameOld: this.props.group.title });
  };

  handleClickAway = () => {
    if (this.state.titleName) this.setState({ editTitle: false });
  };

  handleClickAway2 = () => {
    this.setState({ colorSelectMode: false });
  };

  handleClickAway3 = () => {
    this.props.UnSetDrag();
  };

  changeGroupColor = color => {
    this.setState({ groupColor: color, colorSelectMode: false });
  };

  handleAdd = () => {
    if (this.state.itemName) {
      this.props.addTask(this.props.group, this.state.itemName);
      this.setState({ itemName: "" });
    }
  };

  handleKeyDown = e => {
    if (this.state.inputExpand) {
      if (e.key === "Enter") {
        if (this.state.itemName)
          this.props.addTask(this.props.group, this.state.itemName);
        this.setState({ itemName: "" });
      }
      if (e.key === "Escape") {
        this.setState({ itemName: "" });
      }
    }

    if (this.state.editTitle) {
      if (e.key === "Enter") {
        this.handleClickAway();
      }
      if (e.key === "Escape") {
        this.setState({ editTitle: false, titleName: this.state.titleNameOld });
      }
    }
  };

  render() {
    const Trigger = () => null;

    const inputStyle = {
      width: `${
        this.state.inputExpand ? window.innerWidth * 0.975 + "px" : "100px"
      }`,
      opacity: `${this.state.inputExpand ? "1" : "0.4"}`,

      transitionProperty: "width",
      transitionDuration: "1s"
    };

    return (
      <Draggable
        draggableId={this.props.group.id}
        index={this.props.index}
        onMouseUp={() => this.props.UnSetDrag()}
      >
        {provided => (
          <Container
            onMouseUp={() => this.props.UnSetDrag()}
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
                style={{
                  color: this.state.groupColor
                }}
              >
                {this.state.showButton && !this.props.isDrag ? (
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
                  {this.state.showDelete && !this.props.isDrag ? (
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
                          this.state.showEdit && !this.props.isDrag
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
                        onKeyDown={this.handleKeyDown}
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
              {this.state.showButton && !this.props.isDrag ? (
                <>
                  <CollapseButton
                    onClick={() =>
                      this.setState({
                        openOld: !this.state.openOld,
                        open: !this.state.open
                      })
                    }
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
                </>
              ) : null}
              <CollapseButton
                //part of item to be dragged from
                {...provided.dragHandleProps}
                onMouseDown={() => this.props.setDrag()}
                onMouseUp={() => this.props.UnSetDrag()}
              >
                {this.props.isDrag ? (
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
                      onMouseOver={() => this.handleMouseOver2()}
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
                          colorSelectMode={this.state.colorSelectMode}
                        />
                      ))}

                      {provided.placeholder}
                    </TaskList>
                  </Collapsible>
                </>
              )}
            </Droppable>
            {this.state.open ? (
              <div style={{ display: "flex" }}>
                <Form.Group style={{ position: "relative", top: 10, left: 10 }}>
                  {!this.state.colorSelectMode ? (
                    <ClickAwayListener
                      onClickAway={() =>
                        this.setState({ inputExpand: false, itemName: "" })
                      }
                    >
                      <Form.Control
                        onKeyDown={this.handleKeyDown}
                        onClick={() => this.setState({ inputExpand: true })}
                        required
                        name="itemName"
                        onChange={this.changeHandler}
                        value={this.state.itemName}
                        type="text"
                        placeholder="+ ADD"
                        style={inputStyle}
                        inputExpand={this.state.inputExpand}
                      />
                    </ClickAwayListener>
                  ) : (
                    <div style={{ height: 38.5, width: 20 }}></div>
                  )}
                </Form.Group>
                {this.state.inputExpand ? (
                  <AwesomeButton
                    style={
                      this.state.itemName
                        ? { top: 10, marginBottom: 10, height: 38, right: 52 }
                        : { top: 10, marginBottom: 10, height: 38, right: 62 }
                    }
                    type="primary"
                    onPress={this.handleAdd}
                  >
                    {this.state.itemName ? "ADD" : "CLOSE"}
                  </AwesomeButton>
                ) : null}
              </div>
            ) : null}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Group;
