// JSX 규칙
// 1. 여는 태그와 닫는 태그가 꼭 있어야 함 </>도 가능
// 2. 2개 이상의 태그는 반드시 부모 태그로 감싸져야 함
// 3. JSX 내부에서 자바스크립트 사용 시 {} 이용
// 4.
// 5.
// 6. 주석 작성

import React, { useRef, useState } from "react";
import Hello from "./Hello";
import Hello2 from "./Hello2";
import Hello3 from "./Hello3";
import "./App.css";

// 주석 처리 해도 됨 (이전 내용임) 사용하고 싶다면 App으로 이름 바꾸기!
function App() {
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

export default App;
