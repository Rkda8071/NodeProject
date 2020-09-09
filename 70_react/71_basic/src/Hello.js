import React from "react";

function Hello({ name, color = "black", children = "내용없음", isLoggedIn }) {
  return (
    <>
      
      <div style={{ color }}>Hello! {name}</div>
      <div>{children}</div>
      <div>{isLoggedIn && "로그인되었습니다"}</div>
    </>
  );
}

export default Hello;