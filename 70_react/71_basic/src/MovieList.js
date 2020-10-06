import React, { useEffect, useMemo, useContext } from "react";
import { MovieContext } from "./MovieReducerApp";

function Movie({ movie }) {
  const { id, title, director, year, active } = movie;
  const style = {
    color: active ? "blue" : "black",
    cursor: "Pointer",
  };
  useEffect(() => {
    console.log("컴포넌트가 화면에 나타남 || 업데이트 된 후에 나옴", movie);
    // REST API, 외부 라이브러리 호출 시
    return () => {
      // cleanup 함수 (호출 내용 정리)
      console.log("컴포넌트가 화면에서 사라짐 || 변경되기 직전에 나옴", movie); // 리턴 -> 언마운트 시 실행됨
    };
  }, [movie]); // 의존 값 배열 -> 빈 값이면 마운트 시에만

  const dispatch = useContext(MovieContext);

  const onRemove = (id) => {
    dispatch({
      type: "REMOVE",
      id,
    });
  };

  const onToggle = (id) => {
    dispatch({
      type: "TOGGLE",
      id,
    });
  };

  return (
    <>
      <div>
        <b onClick={() => onToggle(id)} style={style}>
          {title}
        </b>
        ({director}, {year})<button onClick={() => onRemove(id)}>삭제</button>
      </div>
    </>
  );
}

function MovieList({ movieList }) {
  const countActiveMovie = () => {
    console.log("Active 개수 세기");
    return movieList.filter((movie) => movie.active).length;
  };

  const count = useMemo(countActiveMovie, [movieList]);

  return (
    <>
      {movieList.map((movie) => (
        <Movie key={movie.id} movie={movie}></Movie>
      ))}
      <hr />
      <div>active 된 movie 개수 : {count}</div>
    </>
  );
}

export default MovieList;
