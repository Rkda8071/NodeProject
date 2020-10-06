import React, { useState } from "react";

function InputSample() {
  const [text, setText] = useState("");
  const onChange = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };
  const onReset = () => {
    setText("");
  };
  return (
    <>
      <input onChange={onChange} value={text}></input>
      <button onClick={onReset}>초기화</button>
      <div>값 : {text}</div>
    </>
  );
}

export default InputSample;
