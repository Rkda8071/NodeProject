import React, { useEffect, useMemo, useContext } from "react";
import { MusicContext } from "./MusicReducerApp";

function Music({ music }) {
  const { id, title, singer, active } = music;
  const style = {
    color: active ? "blue" : "black",
    cursor: "Pointer",
  };
  /* 렌더링 할 때마다 호출
  useEffect(() => {
    console.log("언제 찍힐까?");
  });*/

  useEffect(() => {
    console.log("컴포넌트가 화면에 나타남 || 업데이트 된 후에 나옴", music);
    // REST API, 외부 라이브러리 호출 시
    return () => {
      // cleanup 함수 (호출 내용 정리)
      console.log("컴포넌트가 화면에서 사라짐 || 변경되기 직전에 나옴", music); // 리턴 -> 언마운트 시 실행됨
    };
  }, [music]); // 의존 값 배열 -> 빈 값이면 마운트 시에만

  const dispatch = useContext(MusicContext);

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
        <b style={style} onClick={() => onToggle(id)}>
          {title}
        </b>
        ({singer})<button onClick={() => onRemove(id)}>삭제</button>
      </div>
    </>
  );
}

function MusicList({ musicList }) {
  const countActiveMusic = () => {
    console.log("Active 개수 세기");
    return musicList.filter((music) => music.active).length;
  };

  const count = useMemo(countActiveMusic, [musicList]);
  return (
    <>
      {musicList.map((music) => (
        <Music key={music.id} music={music}></Music>
      ))}
      <hr />
      <div>active 된 Music 개수 : {count}</div>
    </>
  );
}

export default MusicList;
