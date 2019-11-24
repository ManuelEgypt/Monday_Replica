import React from "react";
import ReactDOM from "react-dom";
import Group from "./Group";
import { DragDropContext } from "react-beautiful-dnd";
import { AwesomeButton } from "react-awesome-button";
import { Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "@atlaskit/css-reset";
import "react-awesome-button/dist/styles.css";

import initialData from "./data";

class App extends React.Component {
  state = { ...initialData, isDrag: false, groupName: "" };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = () => {
    if (this.state.groupName) this.addGroup(this.state.groupName);
  };

  addTask = (group, content) => {
    const newTaskIDs = Array.from(group.taskIDs);
    let id = 0;

    if (this.state.tasks.length) {
      id = String(
        parseInt(this.state.tasks[this.state.tasks.length - 1].id) + 1
      );
    } else id = String(1);

    newTaskIDs.splice(this.state.tasks.length, 0, id);

    const newTasks = Array.from(this.state.tasks);

    newTasks.splice(this.state.tasks.length, 0, {
      id: id,
      content: content,
      owner: "",
      status: "",
      dueDate: "",
      priority: ""
    });

    const newGroup = {
      ...group,
      taskIDs: newTaskIDs
    }; //create a new group with the right taskIDs array order

    const newGroupListMissing = this.state.groups.filter(
      grp => grp.id != group.id
    ); //remove old group containing the old taskIDs order from the groups array

    const newGroupList = newGroupListMissing.concat(newGroup); //insert the new group with the right taskIDs order

    const newState = {
      ...this.state,
      groups: newGroupList,
      tasks: newTasks
    }; //create a new state with the right groups array
    this.setState(newState);
  };

  addGroup = groupName => {
    const newGroupOrder = Array.from(this.state.groupOrder); // create a copy of groupOrder array

    let id = 0;

    if (this.state.groups.length) {
      id = String(
        parseInt(this.state.groups[this.state.groups.length - 1].id) + 1
      );
    } else id = String(1);

    newGroupOrder.splice(0, 0, id); // add new generated group ID to begining of groupOrder array

    const colorsArray = [
      "red",
      "blue",
      "green",
      "orange",
      "purple",
      "#e05aa8",
      "#a6abab",
      "#a6abab",
      "black"
    ];
    const num = Math.floor(Math.random() * 10) + 1 - 1;
    const newGroup = {
      taskIDs: [],
      title: groupName,
      color: colorsArray[num],
      id: id
    }; //create a new group

    const newGroups = Array.from(this.state.groups); // create a copy from groups array

    newGroups.splice(this.state.groups.length, 0, newGroup); // add new group to new groups array

    const newState = {
      ...this.state,
      groups: newGroups,
      groupOrder: newGroupOrder
    }; //create a new state with the new groupOrder and groups array
    this.setState(newState);
  };

  removeTask = (taskID, group) => {
    let newTaskIDs = Array.from(group.taskIDs); //create a copy of taskIDs array
    newTaskIDs = newTaskIDs.filter(taskId => taskId != taskID);

    const newGroup = {
      ...group,
      taskIDs: newTaskIDs
    }; //create a new group with the right taskIDs array

    const newGroupListMissing = this.state.groups.filter(
      grp => grp.id != group.id
    ); //remove old group containing the old taskIDs order from the groups array

    const newGroupList = newGroupListMissing.concat(newGroup); //insert the new group with the right taskIDs order

    let newTasks = Array.from(this.state.tasks); //create a copy from tasks array
    newTasks = newTasks.filter(task => task.id != taskID); //remove desired task from tasks array

    const newState = {
      ...this.state,
      groups: newGroupList,
      tasks: newTasks
    }; //create a new state with the new groups array and tasks array
    this.setState(newState);
  };

  removeGroup = groupID => {
    let newGroupOrder = Array.from(this.state.groupOrder); // create a copy of groupOrder array

    newGroupOrder = newGroupOrder.filter(groupId => groupId != groupID); // remove desired group from groupOrder array

    const group = this.state.groups.find(grp => groupID === grp.id); //find group related to groupID

    const tasksIDsCopy = Array.from(group.taskIDs); //make a copy of group's taskIDs array

    let newTasks = Array.from(this.state.tasks); // make a copy of tasks array

    if (tasksIDsCopy.length) {
      tasksIDsCopy.forEach(taskID => {
        newTasks = newTasks.filter(task => task.id != taskID);
      });
    } //if desired group has task delete all tasks from tasks array

    let newGroups = Array.from(this.state.groups); // create a copy from groups array

    newGroups = newGroups.filter(group => group.id != groupID); // remove desired group from groups array

    const newState = {
      ...this.state,
      groups: newGroups,
      groupOrder: newGroupOrder,
      tasks: newTasks
    }; //create a new state with the new groups array and groupOrder array
    this.setState(newState);

    console.log("NEW GROUP ORDER!!!!!!!!!!!", newGroupOrder);
    console.log("NEW GROUPS!!!!!!!!!!!", newGroups);
  };

  onDragEnd = result => {
    //   const result = {
    //     draggableId: '1',
    //     type: 'TYPE',
    //     reason: 'DROP' //OR CANCEL
    //     source: {
    //      droppableId: '1'
    //      index: 0,
    //     },
    //     destination: {       //destination: null  //drop outside list
    //      dropabbleId: '1',
    //      index:1
    // },
    // }

    const { destination, source, draggableId } = result;
    setTimeout(() => console.log("ISDRAG!!", this.state.isDrag), 2000);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      this.setState({ isDrag: false });
      return;
    }
    this.setState({ isDrag: false });
    const startGroup = this.state.groups.find(
      group => group.id === source.droppableId
    );
    const finishGroup = this.state.groups.find(
      group => group.id === destination.droppableId
    );

    if (startGroup === finishGroup) {
      this.setState({ isDrag: false });
      const newTaskIDs = Array.from(startGroup.taskIDs); //create a copy of the taskIDs array
      newTaskIDs.splice(source.index, 1); //remove the task from the taskIDs array
      newTaskIDs.splice(destination.index, 0, draggableId); //insert the task into the destination index (insert to rigth place)

      const newGroup = {
        ...startGroup,
        taskIDs: newTaskIDs
      }; //create a new group with the right taskIDs array order

      const newGroupListMissing = this.state.groups.filter(
        grp => grp.id != startGroup.id
      ); //remove old group containing the old taskIDs order from the groups array

      const newGroupList = newGroupListMissing.concat(newGroup); //insert the new group with the right taskIDs order

      const newState = {
        ...this.state,
        groups: newGroupList
      }; //create a new state with the right groups array
      this.setState(newState);
      return;
    }

    const newStartTaskIDs = Array.from(startGroup.taskIDs); //create a copy of the start Group taskIDs array
    newStartTaskIDs.splice(source.index, 1); //remove the task from the array

    const newStartGroup = {
      ...startGroup,
      taskIDs: newStartTaskIDs
    }; // create new Start group Id with the right taskIDs array

    const newfinishTaskIDs = Array.from(finishGroup.taskIDs); //create a copy of the finish Group taskIDs array
    newfinishTaskIDs.splice(destination.index, 0, draggableId); //insert the task into the destination index (insert to rigth place)

    const newFinishGroup = {
      ...finishGroup,
      taskIDs: newfinishTaskIDs
    }; // create new Finish group Id with the right taskIDs array

    const newGroupListMissing = this.state.groups.filter(
      grp => grp.id != startGroup.id && grp.id != finishGroup.id
    ); //remove old start group and finsish group containing the old taskIDs order from the groups array

    const newGroupList = newGroupListMissing.concat(
      newStartGroup,
      newFinishGroup
    ); //insert the new start group and finish group with the right taskIDs order

    const newState = {
      ...this.state,
      groups: newGroupList
    }; //create a new state with the right groups array
    this.setState(newState);
    this.setState({ isDrag: false });
    return;
  };
  render() {
    console.log(this.state);
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Form.Group style={{ position: "relative", top: 10, left: 90 }}>
            <Form.Control
              required
              name="groupName"
              onChange={this.handleChange}
              type="text"
              placeholder="Group Name"
              style={{ width: 400 }}
            />
          </Form.Group>

          <AwesomeButton
            style={{ top: 7, marginBottom: 10, height: 38, right: 78 }}
            type="primary"
            onPress={this.handleSubmit}
          >
            CREATE NEW GROUP
          </AwesomeButton>
        </div>
        <DragDropContext
          onDragStart={() => this.setState({ isDrag: true })}
          //onDragUpdate={() => this.setState({ isDrag: false })}
          onDragEnd={this.onDragEnd}
        >
          {this.state.groupOrder.map(groupId => {
            const group = this.state.groups.find(group => group.id === groupId);
            const tasks = group.taskIDs.map(taskID =>
              this.state.tasks.find(task => task.id === taskID)
            );
            return (
              <Group
                isDrag={this.state.isDrag}
                key={group.id}
                group={group}
                tasks={tasks}
                addTask={this.addTask}
                removeTask={this.removeTask}
                removeGroup={this.removeGroup}
              />
            );
          })}
        </DragDropContext>
      </>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
