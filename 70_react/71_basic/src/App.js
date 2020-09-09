// JSX 규칙
// 1. 여는 태그와 닫는 태그가 꼭 있어야 함 </>도 가능
// 2. 2개 이상의 태그는 반드시 부모 태그로 감싸져야 함
// 3. JSX 내부에서 자바스크립트 사용 시 {} 이용
// 4.
// 5.
// 6. 주석 작성

import React, { Children } from "react";
import StateSample2 from "./StateSample2";
import Hello from "./Hello";
import Hello2 from "./Hello2";
import "./App.css";
import InputSample from "./InputSample";
import InputSample2 from "./InputSample2";

function App() {
  //StateSample.js
  //return <StateSample2 />;
  return <InputSample2 />;

  // Hello.js
  /*const id = "0"; 
  const name = "이름없음";
  const nickname = "별명없음";
  const color = "black";
  const style = {
    backgroundColor: "yellow",
    color: "blue",
    fontSize: 30,
  };

  return (
    <>
      {name}
      <Hello />
      <div style={style}>
        <Hello />
        {name}
      </div>
      
      <div className="box"></div>
      <Hello name={"손강민"} color="blue" isLoggedIn={true}>
        태그 안의 데이터
      </Hello>
      <Hello2 messages={["메시지1", "메시지2", "메시지3"]}></Hello2>

      <Hello2 id="3314" name="손강민" color="Yellow" >우끼끼</Hello2>
      <Hello2></Hello2>
      
    </>
  );*/
}

export default App;