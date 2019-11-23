import React from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
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
      <Container open={this.state.open}>
        <Droppable droppableId={this.props.group.id}>
          {(provided, snapshot) => (
            <>
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
                  {this.state.showButton ? (
                    <div
                      style={{
                        padding: 5,
                        margin: "3px",
                        marginRight: "12px",
                        width: 10,
                        height: 10,
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
                  {!this.state.editTitle ? (
                    <div
                      onClick={this.handleTitleClick}
                      onMouseOver={() =>
                        this.setState({
                          showEdit: true
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
                        placeholder="Title Name"
                        value={this.state.titleName}
                        onChange={this.changeHandler}
                      />
                    </ClickAwayListener>
                  )}
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
                      onClick={() =>
                        this.setState({ showAdd: !this.state.showAdd })
                      }
                    >
                      {this.state.open ? (
                        <img
                          style={{ marginTop: 3, width: 20, height: 20 }}
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
                            bottom: 5
                          }}
                          placeholder="Add new Item"
                          value={this.state.itemName}
                          onChange={this.changeHandler}
                        />

                        {this.state.itemName ? (
                          <button
                            type="submit"
                            style={{
                              right: "45px",
                              height: 35,
                              position: "relative",
                              bottom: 5
                            }}
                            onClick={this.handleAdd}
                          >
                            ADD
                          </button>
                        ) : null}
                      </Form>
                    ) : null}
                  </>
                ) : null}
              </Head>
              {this.state.colorSelectMode ? (
                <ClickAwayListener onClickAway={this.handleClickAway2}>
                  <ColorSelection
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
                    />
                  ))}

                  {provided.placeholder}
                </TaskList>
              </Collapsible>
            </>
          )}
        </Droppable>
      </Container>
    );
  }
}

export default Group;
