import React, { useReducer, useState } from "react";

// state : 현재 상태, action : 이후 ...
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    default:
      throw new Error("Unhandled action");
  }
}

function reducer2(state, action) {
  switch (action.type) {
    case "PLUS":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      throw new Error("Unhandled action");
  }
}

function ReducerSample() {
  const [count, dispatch] = useReducer(reducer, 0);
  const [num, dispatch2] = useReducer(reducer2, 0);
  const [style, setColor] = useState(0);

  const counter = () => {
    dispatch({
      type: "ADD",
    });
  };

  const onIncrease = () => {
    dispatch2({
      type: "PLUS",
    });
  };

  const onDecrease = () => {
    dispatch2({
      type: "MINUS",
    });
  };

  return (
    <>
      <div>
        <p>you clicked {count} times</p>
        <button onClick={counter}>click me!</button>
      </div>
      <div>
        <h1>{num}</h1>
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
      <div>
        <p style={{ color: style }}>색상 바꾸기</p>
        <button onClick={() => setColor("red")}>빨간색</button>
        <button onClick={() => setColor("blue")}>파란색</button>
        <button onClick={() => setColor("green")}>초록색</button>
      </div>
    </>
  );
}

export default ReducerSample;
