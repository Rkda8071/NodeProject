import React, { useRef, useReducer } from "react";

const initialState = {
  id: "",
  name: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "RESET":
      return initialState;
    default:
      throw new Error("Unhandled action");
  }
}

function ReducerSample2() {
  const inputId = useRef();
  const inputName = useRef();
  const [student, dispatch] = useReducer(reducer, initialState);
  const onChange = (e) => {
    dispatch({
      type: "CHANGE",
      name: e.target.name,
      value: e.target.value,
    });
  };
  const onReset = () => {
    dispatch({ type: "RESET" });
    //inputId.current.focus(); //input
    inputName.current.focus();
  };

  return (
    <>
      <input
        name="id"
        placeholder="학번"
        onChange={onChange}
        value={student.id}
      ></input>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={student.name}
        ref={inputName}
      ></input>
      <button onClick={onReset}>초기화</button>
      <div>학번 : {student.id}</div>
      <div>이름 : {student.name}</div>
    </>
  );
}
export default ReducerSample2;
