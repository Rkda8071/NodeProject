import React, { useState } from "react";

function StateSample() {
    const [style, setColor] = useState(0);
    
    return <>
        <div style={{ color:style }}>색상 바꾸기 </div>
        <button onClick={() => setColor("red")}>빨간색</button>
        <button onClick={() => setColor("blue")}>파란색</button>
        <button onClick={() => setColor("green")}>초록색</button>
    </>
    /*\let [count, setCount] = useState(0);

    const counter = () => {
        setCount(count + 1)
    }*/
    /*let [count, setCount] = useState(0);
    const onIncrease = () => {
        setCount(count + 1)
    }
    const onDecrease = () => {
        setCount(count - 1)
    }
    return <>
        
        <div>
            <h1>{count}</h1>
            <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button>
        </div>
    </>;*/
}
export default StateSample;