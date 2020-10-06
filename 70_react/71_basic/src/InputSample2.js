import React, { useState, useRef } from "react";

function InputSample2() {
  const inputId = useRef();
  const inputName = useRef();
  const [student, setStudent] = useState({
    id: "",
    name: "",
  });
  const onChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };
  const onReset = () => {
    setStudent({
      id: "",
      name: "",
    });
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
export default InputSample2;
