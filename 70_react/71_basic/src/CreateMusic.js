import React, { useRef, useContext } from "react";
import { MusicContext } from "./MusicReducerApp";

function CreateMusic({ title, singer }) {
  // nextId = {current : 4}
  const nextId = useRef(4);
  const dispatch = useContext(MusicContext);

  const onChange = (e) => {
    // name = title, singer
    // value = 실제 입력 값 => 제목, 가수명
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE",
      name,
      value,
    });
  };

  const onCreate = () => {
    dispatch({
      type: "CREATE",
      id: nextId.current,
    });
    nextId.current += 1;
  };

  return (
    <>
      <input
        name="title"
        placeholder="노래제목"
        onChange={onChange}
        value={title}
      ></input>
      <input
        name="singer"
        placeholder="가수명"
        onChange={onChange}
        value={singer}
      ></input>
      <button onClick={onCreate}>등록</button>
    </>
  );
}

export default CreateMusic;
