import React from "react";

function Hello3({ messages }) {
  return (
    <>
      <div>
        {messages.length > 0 && <b>{messages.length}건의 메시지가 있습니다.</b>}
      </div>
    </>
  );
}

export default Hello3;
