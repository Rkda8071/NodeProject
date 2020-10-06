import React from "react";
import PropTypes from "prop-types";

// 비 구조화 할당 활용
function Hello({ name, color, children, isLoggedin }) {
  return (
    <>
      <div>Hello React!</div>
      <div style={{ color }}>Hello! {name || "이름 없음"}님</div>
      <div>{children}</div>
      <div>{isLoggedin && "로그인 되었습니다"}</div>
      {/*스타일 자리에는 중괄호 두개*/}
    </>
  );
}

/*
Hello.defaultProps = {
  name: "이름 없음",
  color: "black",
  children: "내용 없음",
};
*/

Hello.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  children: PropTypes.string,
};
export default Hello;
