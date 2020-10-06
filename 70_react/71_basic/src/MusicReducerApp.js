import React, { useRef, useReducer, createContext } from "react";
import MusicList from "./MusicList";
import CreateMusic from "./CreateMusic";

const initialState = {
  music: {
    title: "",
    singer: "",
    active: false,
  },
  musicList: [
    { id: 1, singer: "아이즈원", title: "피에스타", active: false },
    { id: 2, singer: "지코", title: "아무노래", active: false },
    { id: 3, singer: "있지", title: "워너비", active: false },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        music: { ...state.music, [action.name]: action.value },
      };
    case "CREATE":
      return {
        musicList: state.musicList.concat({
          id: action.id,
          ...state.music,
        }),

        music: initialState.music,
      };

    case "REMOVE":
      return {
        ...state,
        musicList: state.musicList.filter((music) => music.id !== action.id),
      };
    case "TOGGLE":
      return {
        ...state,
        musicList: state.musicList.map((music) =>
          music.id === action.id
            ? { ...music, active: !music.active }
            : { ...music }
        ),
      };
    default:
      throw new Error("Unhandled action");
  }
}

export const MusicContext = createContext(null);

function MusicReducerApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { title, singer } = state.music;
  const { musicList } = state;

  return (
    <>
      <MusicContext.Provider value={dispatch}>
        <CreateMusic title={title} singer={singer} />
        <MusicList musicList={musicList} />
      </MusicContext.Provider>
    </>
  );
}

export default MusicReducerApp;
