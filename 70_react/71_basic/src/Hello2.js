import React from "react";
import PropTypes from "prop-types";
/*function Hello2({ messages }) {
  return <div>
    {messages.length > 0 && (
      <b>messages.length + '건의 메시지가 있습니다.'</b>
    )}</div>;
}*/
function Hello2({id = "0",name = "이름없음", color = "black",children = "내용없음"}) {
  return (
    <div style={{ color }}>
      <div >학번 : {id}</div>
      <div >이름 : {name}</div>
      <div >별명 : {children}</div>
    </div>
  );
}
Hello2.propTypes = { name: PropTypes.string.isRequired , id: PropTypes.string.isRequired }
export default Hello2;