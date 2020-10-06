import React, { useState } from "react";

function StateSample2() {
  const [number, setNumber] = useState(1); // 1,2,3,4
  const [items, setItems] = useState([]); // 비어있는 배열
  const addItem = () => {
    setItems([
      ...items,
      {
        id: number,
        value: number,
      },
    ]);
    setNumber(number + 1);
  };
  return (
    <>
      <button onClick={addItem}>add Item</button>
      <ul>
        {items.map((item) => {
          return <li key={item.id}>{item.value}</li>;
        })}
      </ul>
    </>
  );
}
export default StateSample2;
