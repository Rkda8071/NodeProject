// JSX 규칙
// 1. 여는 태그와 닫는 태그가 꼭 있어야 함 </>도 가능
// 2. 2개 이상의 태그는 반드시 부모 태그로 감싸져야 함
// 3. JSX 내부에서 자바스크립트 사용 시 {} 이용
// 4.
// 5.
// 6. 주석 작성

import React, { useRef, useState } from "react";
import MusicList from "./MusicList";
import MovieList from "./MovieList";
import CreateMusic from "./CreateMusic";
import CreateMovie from "./CreateMovie";

function App2() {
  const [movie, setMovie] = useState({ title: "", director: "", year: "" });
  const { title, director, year } = movie;
  const [movieList, setMovieList] = useState([
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
  ]);

  // nextId = {current : 4}
  const nextId = useRef(4);

  const onChange = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const onCreate = () => {
    setMovieList(
      movieList.concat({ id: nextId.current, title, director, year })
    );
    nextId.current += 1;
    setMovie({
      title: "",
      director: "",
      year: "",
      active: false,
    });
  };

  const onRemove = (id) => {
    setMovieList(movieList.filter((movie) => movie.id !== id));
  };

  const onToggle = (id) => {
    setMovieList(
      movieList.map((movie) =>
        movie.id === id ? { ...movie, active: !movie.active } : { ...movie }
      )
    );
  };

  return (
    <>
      <CreateMovie
        title={title}
        director={director}
        year={year}
        onChange={onChange}
        onCreate={onCreate}
      />
      <MovieList
        movieList={movieList}
        onRemove={onRemove}
        onToggle={onToggle}
      />
    </>
  );
}

function App() {
  const [music, setMusic] = useState({ title: "", singer: "" });
  const { title, singer } = music;
  const [musicList, setMusicList] = useState([
    { id: 1, singer: "아이즈원", title: "피에스타", active: false },
    { id: 2, singer: "지코", title: "아무노래", active: false },
    { id: 3, singer: "있지", title: "워너비", active: false },
  ]);

  // nextId = {current : 4}
  const nextId = useRef(4);

  const onChange = (e) => {
    // name = title, singer
    // value = 실제 입력 값 => 제목, 가수명
    const { name, value } = e.target;
    setMusic({ ...music, [name]: value });
  };

  const onCreate = () => {
    // 배열에 추가
    // 1. spread 연산자 ...musicList
    // 2. concat()

    /*setMusicList([
      ...musicList,
      {
        id: nextId.current,
        ...music,
      },
    ]);
  */
    setMusicList(musicList.concat({ id: nextId.current, title, singer }));
    nextId.current += 1;
    setMusic({
      title: "",
      singer: "",
    });
  };

  const onRemove = (id) => {
    setMusicList(musicList.filter((music) => music.id !== id));
  };

  const onToggle = (id) => {
    setMusicList(
      musicList.map((music) =>
        music.id === id ? { ...music, active: !music.active } : { ...music }
      )
    );
  };

  return (
    <>
      <CreateMusic
        title={title}
        singer={singer}
        onChange={onChange}
        onCreate={onCreate}
      />
      <MusicList
        musicList={musicList}
        onRemove={onRemove}
        onToggle={onToggle}
      />
    </>
  );
}

// 주석 처리 해도 됨 (이전 내용임) 사용하고 싶다면 App으로 이름 바꾸기!
function App2() {
  const name = "React";
  const style = {
    fontSize: 30,
    backgroundColor: "yellow",
    color: "blue",
  };

  return (
    <>
      <div style={style}>YEE</div>
      {name}
      <div class="box"></div> {/*warning 발생*/}
      <div className="box"></div>
      <Hello name="홍길동" color="red" isLoggedin>
        태그 안의 데이터 {/*children: "텍스트 내용"*/}
      </Hello>
      <Hello></Hello>
      <Hello2 id="3327" name="이주원" color="blue">
        한국사
      </Hello2>
      <Hello2></Hello2>
      <Hello3 messages={["메시지1", "메시지2", "메시지3"]}></Hello3>
    </>
  );
}

export default MusicStateApp;
