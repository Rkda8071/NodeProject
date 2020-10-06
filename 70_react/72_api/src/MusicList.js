import React, { useReducer, useEffect } from 'react';
import axios from "axios";
// LOADING, SUCCESS, ERROR
function reducer(state, action) {
    switch (action.type) {
        case "LOADING":
            return {
                //...state
                loading: true,
                data: null,
                error: null,
            };
        case "SUCCESS":
            return {
                loading: false,
                data: action.data,
                error: null,
            };
        case "ERROR":
            return {
                
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
function MusicList() {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null,
    });

    const fetchData = () => {
        dispatch({ type: "LOADING" });
        try {
            // GET: 조회, POST: 등록, PUT: 수정, DELETE: 삭제
            const response = axios.get("http://localhost:5000/musicList")
            dispatch({ type: "SUCCESS", data: response })
        } catch (e) {
            console.log(e.response.status);
            dispatch({ type: "ERROR", data: null })
        }
    };

    //화면에 마운트될 때 실행
    useEffect(() => {
        fetchData();

    }, []);
    const { loading, data: musicList, error } = state;
    if (loading) return <div>로딩중...</div>
    if (error) return <div>에러가 발생했습니다</div>
    
    // 다음 시간에 계속...
    return <> </>;
}


export default MusicList;
