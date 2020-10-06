import React, { Component } from "react";

// render() 메소드가 필요함
class Music2 extends Component {
  render() {
    const { music, onRemove, onToggle } = this.props;
    const { id, title, singer, active } = music;
    const style = {
      color: active ? "blue" : "black",
      cursor: "Pointer",
    };
    return (
      <>
        <div>
          <b style={style} onClick={() => onToggle(id)}>
            {title}
          </b>
          ({singer})<button onClick={() => onRemove(id)}>삭제</button>
        </div>
      </>
    );
  }
  componentDidMount() {
    console.log("component mounted");
  }

  componentDidUpdate() {
    console.log("component updated");
  }

  componentWillUnmount() {
    console.log("component unmounted");
  }
}

export default Music2;
