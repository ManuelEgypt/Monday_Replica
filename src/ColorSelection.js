import React from "react";

class ColorSelection extends React.Component {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          marginLeft: 30,
          backgroundColor: "white",
          padding: 10,
          border: "1px solid lightgrey",
          borderRadius: 5
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            onClick={() => this.props.changeGroupColor("red")}
            style={{
              backgroundColor: "red",
              borderRadius: 20,
              width: 20,
              height: 20,
              marginRight: 3,
              cursor: "pointer"
            }}
          ></div>

          <div
            onClick={() => this.props.changeGroupColor("blue")}
            style={{
              backgroundColor: "blue",
              borderRadius: 20,
              width: 20,
              height: 20,
              marginRight: 3,
              cursor: "pointer"
            }}
          ></div>

          <div
            onClick={() => this.props.changeGroupColor("green")}
            style={{
              backgroundColor: "green",
              borderRadius: 20,
              width: 20,
              height: 20,
              marginRight: 3,
              cursor: "pointer"
            }}
          ></div>
        </div>

        <div style={{ display: "flex", marginTop: 3 }}>
          <div
            style={{
              backgroundColor: "orange",
              borderRadius: 20,
              width: 20,
              height: 20,
              marginRight: 3,
              cursor: "pointer"
            }}
            onClick={() => this.props.changeGroupColor("orange")}
          ></div>

          <div
            style={{
              backgroundColor: "purple",
              borderRadius: 20,
              width: 20,
              height: 20,
              marginRight: 3,
              cursor: "pointer"
            }}
            onClick={() => this.props.changeGroupColor("purple")}
          ></div>

          <div
            style={{
              backgroundColor: "#e05aa8",
              borderRadius: 20,
              width: 20,
              height: 20,
              marginRight: 3,
              cursor: "pointer"
            }}
            onClick={() => this.props.changeGroupColor("#e05aa8")}
          ></div>
        </div>

        <div style={{ display: "flex", marginTop: 3 }}>
          <div
            style={{
              backgroundColor: "#a6abab",
              borderRadius: 20,
              width: 20,
              height: 20,
              marginRight: 3,
              cursor: "pointer"
            }}
            onClick={() => this.props.changeGroupColor("#929696")}
          ></div>

          <div
            style={{
              backgroundColor: "#a6abab",
              borderRadius: 20,
              width: 20,
              height: 20,
              marginRight: 3,
              cursor: "pointer"
            }}
            onClick={() => this.props.changeGroupColor("#5c5c5c")}
          ></div>

          <div
            style={{
              backgroundColor: "black",
              borderRadius: 20,
              width: 20,
              height: 20,
              marginRight: 3,
              cursor: "pointer"
            }}
            onClick={() => this.props.changeGroupColor("black")}
          ></div>
        </div>
      </div>
    );
  }
}

export default ColorSelection;
