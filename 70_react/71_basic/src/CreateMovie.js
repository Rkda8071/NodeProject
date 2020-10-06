import React, { useRef, useContext } from "react";
import { MovieContext } from "./MovieReducerApp";

function CreateMovie({ title, director, year }) {
  // nextId = {current : 4}
  const nextId = useRef(4);
  const dispatch = useContext(MovieContext);

  const onChange = (e) => {
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
        placeholder="영화명"
        onChange={onChange}
        value={title}
      ></input>
      <input
        name="director"
        placeholder="감독명"
        onChange={onChange}
        value={director}
      ></input>
      <input
        name="year"
        placeholder="개봉연도"
        onChange={onChange}
        value={year}
      ></input>
      <button onClick={onCreate}>등록</button>
    </>
  );
}

export default CreateMovie;
