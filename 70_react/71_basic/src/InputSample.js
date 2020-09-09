import React,{useState} from "react";

function InputSample() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const onChangeId = (e) => {
        //console.log(e.target.value);
        setId(e.target.value);
    }
    const onChangeName = (e) => {
        //console.log(e.target.value);
        setName(e.target.value);
    }
    const onReset = () => {
        setId("");
        setName("");
    };
    return (
        <>
            <input onChange={onChangeId} value={id}></input>
            <input onChange={onChangeName} value={name}></input>

            <button onClick={onReset}>초기화</button>
            <div>학번 : {id}</div>
            <div>이름 : {name}</div>
        </>
    )
}
export default InputSample;
