import React from "react";
class memberCircle extends React.Component {
  state = {
    focus: false
  };
  render() {
    return (
      <div
        onMouseOver={() => this.setState({ focus: true })}
        onMouseLeave={() => this.setState({ focus: false })}
        style={{
          width: this.state.focus ? "45px" : "30px",
          height: this.state.focus ? "45px" : "30px",
          borderRadius: 50,
          border: `1px solid ${this.props.member.color}`,
          position: "relative",
          top: 3,
          left: 150 - this.props.index * 20,
          opacity: 1,
          backgroundColor: this.props.member.color,
          fontSize: this.state.focus ? 12 : 20,
          textAlign: "center",
          textAlignVertical: "center",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          weight: "900",
          zIndex: this.state.focus ? 1000 : 0
        }}
      >
        {this.state.focus ? (
          <div style={{ textAlignVertical: "center", marginTop: 13 }}>
            {this.props.member.name}{" "}
          </div>
        ) : (
          this.props.member.name[0]
        )}
      </div>
    );
  }
}

export default memberCircle;
