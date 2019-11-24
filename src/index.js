import React from "react";
import ReactDOM from "react-dom";
import Group from "./Group";
import { DragDropContext } from "react-beautiful-dnd";

import "@atlaskit/css-reset";

import initialData from "./data";

class App extends React.Component {
  state = { ...initialData, isDrag: false };

  addTask = (group, content) => {
    const newTaskIDs = Array.from(group.taskIDs);

    newTaskIDs.splice(
      this.state.tasks.length,
      0,
      String(parseInt(this.state.tasks[this.state.tasks.length - 1].id) + 1)
    );

    const newTasks = Array.from(this.state.tasks);

    newTasks.splice(this.state.tasks.length, 0, {
      id: String(
        parseInt(this.state.tasks[this.state.tasks.length - 1].id) + 1
      ),
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

    newGroupOrder.splice(
      0,
      0,
      String(
        parseInt(this.state.groupOrder[this.state.groupOrder.length - 1]) + 1
      )
    ); // add new generated group ID to begining of groupOrder array

    const newGroup = {
      taskIDs: [],
      title: groupName,
      color: "black",
      id: String(
        parseInt(this.state.groupOrder[this.state.groupOrder.length - 1]) + 1
      )
    }; //create a new group

    const newGroups = Array.from(this.state.groups); // create a copy from groups array

    newGroups.splice(0, 0, newGroup); // add new group to new groups array

    const newState = {
      ...this.state,
      groups: newGroups,
      groupOrder: newGroupOrder
    }; //create a new state with the new groupOrder and groups array
    this.setState(newState);
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

    this.addGroup("Test");
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
            />
          );
        })}
      </DragDropContext>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
