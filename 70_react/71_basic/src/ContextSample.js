import React, { createContext, useContext } from "react";

// 1. Context 생성하기
const Mycontext = createContext("아무개");

function Child() {
  // 3. useContext 사용
  const text = useContext(Mycontext);
  return <div>안녕하십니까 {text}님</div>;
}

function Parent() {
  return <Child></Child>;
}

function GrandParent() {
  return <Parent></Parent>;
}

// 2. useContext 값 셋팅
function ContextSample() {
  return (
    <>
      <Mycontext.Provider value="홍길동">
        <GrandParent></GrandParent>
      </Mycontext.Provider>
    </>
  );
}

export default ContextSample;
