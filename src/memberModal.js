import React from "react";

class memberModal extends React.Component {
  state = {
    focus: false
  };

  handleMemberClick = () => {
    this.props.memberSelection();
  };
  render() {
    return (
      <div
        style={{
          position: "relative",
          marginLeft: 40,
          backgroundColor: "white",
          padding: 10,
          border: "1px solid lightgrey",
          borderRadius: 5,
          width: 200
        }}
      >
        {this.props.members.map(member => (
          <div
            style={{ display: "flex", marginBottom: 10 }}
            onMouseOver={() => this.setState({ focus: true })}
            onMouseLeave={() => this.setState({ focus: false })}
            onClick={this.handleMemberClick}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: 20,
                border: `1px solid ${member.name}`,
                position: "relative",
                top: 3,
                opacity: 1,
                backgroundColor: member.color,
                fontSize: 15,
                textAlign: "center",
                color: "white",
                weight: "900"
              }}
            >
              {member.name[0]}
            </div>

            <div
              style={
                this.state.focus
                  ? {
                      marginLeft: 5,
                      marginTop: 3,
                      cursor: "pointer"
                    }
                  : { marginLeft: 5, marginTop: 3 }
              }
            >
              {" "}
              {member.name}{" "}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default memberModal;
