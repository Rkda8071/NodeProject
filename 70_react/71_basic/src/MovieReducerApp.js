// JSX 규칙
// 1. 여는 태그와 닫는 태그가 꼭 있어야 함 </>도 가능
// 2. 2개 이상의 태그는 반드시 부모 태그로 감싸져야 함
// 3. JSX 내부에서 자바스크립트 사용 시 {} 이용
// 4.
// 5.
// 6. 주석 작성

import React, { useRef, useReducer, createContext } from "react";
import MovieList from "./MovieList";
import CreateMovie from "./CreateMovie";

const initialState = {
  movie: {
    title: "",
    director: "",
    year: "",
    active: false,
  },
  movieList: [
    {
      id: 1,
      title: "스타워즈",
      director: "조지 루카스",
      year: "1977",
      active: false,
    },
    {
      id: 2,
      title: "아바타",
      director: "제임스 카메론",
      year: "2009",
      active: false,
    },
    {
      id: 3,
      title: "인터스텔라",
      director: "크리스토퍼 놀란",
      year: "2014",
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        movie: {
          ...state.movie,
          [action.name]: action.value,
        },
      };
    case "CREATE":
      return {
        movieList: state.movieList.concat({
          id: action.id,
          ...state.movie,
        }),
        movie: initialState.movie,
      };
    case "REMOVE":
      return {
        ...state,
        movieList: state.movieList.filter((movie) => movie.id !== action.id),
      };
    case "TOGGLE":
      return {
        ...state,
        movieList: state.movieList.map((movie) =>
          movie.id === action.id
            ? { ...movie, active: !movie.active }
            : { ...movie }
        ),
      };
    default:
      throw new Error("Unhandled action");
  }
}

export const MovieContext = createContext(null);

function MovieReducerApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { title, director, year } = state.movie;
  const { movieList } = state;

  return (
    <>
      <MovieContext.Provider value={dispatch}>
        <CreateMovie title={title} director={director} year={year} />
        <MovieList movieList={movieList} />
      </MovieContext.Provider>
    </>
  );
}

export default MovieReducerApp;
