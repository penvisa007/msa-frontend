import React from 'react'
import { AiOutlineFrown } from "react-icons/ai";

function Loading_No_Data(props) {
    return (
        <div style={{ width: "100%", textAlign: "center" }}>
          <br />
          <AiOutlineFrown
            style={{ width: "80px", height: "80px", color: "lightgray" }}
          />
          <br />
          <label style={{ color: "lightgray" }}>{props.title}</label>
          <br />
          <br />
          <br />
        </div>
      );
}

export default Loading_No_Data
