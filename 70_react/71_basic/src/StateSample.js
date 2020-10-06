import React, { useState } from "react";

function StateSample() {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);
  const [style, setColor] = useState(0);

  const counter = () => {
    // count += 1 // state값을 직접 수정하면 안됨
    setCount(count + 1); // setter를 이용해서 수정하면 된다!
  };

  const onIncrease = () => {
    //setNum(num + 1);
    setNum((prev) => prev + 1); // 업데이트 함수로 구현하기
  };

  const onDecrease = () => {
    setNum(num - 1);
  };
  return (
    <>
      <div>
        <p>you clicked {count} times</p>
        <button onClick={counter}>click me!</button>
      </div>
      <div>
        <h1>{num}</h1>
        <button onClick={() => onIncrease(num + 1)}>+</button>
        <button onClick={() => setNum(num - 1)}>-</button>
      </div>
      <div>
        <p style={{ color: style }}>색상 바꾸기</p>
        <button onClick={() => setColor("red")}>빨간색</button>
        <button onClick={() => setColor("blue")}>파란색</button>
        <button onClick={() => setColor("green")}>초록색</button>
      </div>
    </>
  );
}

export default StateSample;
