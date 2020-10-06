import React from "react";
import PropTypes from "prop-types";
import Hello from "./Hello";

function Hello2({
  id = 0,
  name = "이름없음",
  color = "black",
  children = "별명없음",
}) {
  return (
    <div style={{ color }}>
      <div>학번 : {id}</div>
      <div>이름 : {name}</div>
      <div>별명 : {children}</div>
    </div>
  );
}

Hello.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Hello2;
