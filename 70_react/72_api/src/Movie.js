import React, { useReducer, useState, useEffect } from 'react';
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
                loading: false,
                data: null,
                error: action   
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
function Movie({ id }) {

    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null,
    });

    const fetchData = async(id) => {
        dispatch({ type: "LOADING" });
        try {
            // GET: 조회, POST: 등록, PUT: 수정, DELETE: 삭제
            const response = await axios.get(`http://localhost:5000/movieList/${id}`) //비동기
            
            dispatch({ type: "SUCCESS", data: response.data })
        } catch (e) {
            //console.log(e.response.status);
            dispatch({ type: "ERROR", error: e })
        }
    };

    //화면에 마운트될 때 실행
    useEffect(() => {
        fetchData(id);
    }, [id]);// id가 바뀔 때마다
    const { loading, data:movie, error } = state;

    if (loading) return <div>로딩중...</div>
    if (error) return <div>에러가 발생했습니다</div>
    if (!movie) return null;
        //return <button onClick={fetchData}>불러오기</button>
    
    return (
        <>
            <h3>{movie.title}</h3>
            <div>({movie.title},{movie.director},{movie.year})</div>
        </>
    );
}


export default Movie;
