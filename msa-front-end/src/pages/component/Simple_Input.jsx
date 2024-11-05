import React, { useState } from "react";
import "./Simple_Input.css";
import { PopoverPaper } from "@mui/material";
const Simple_Input = (prop) => {
  function changeborder(e) {
    document.getElementById(prop.id + "-holder").style.borderColor = "#dedede";
    document.getElementById(prop.id + "-error").style.display = "none";

   

    

    if(prop.allow_change_background_while_change_value == true){

       // Change Color Background Color
      var input = document.getElementById(prop.id);
      if (input.value.length > 0) {
        document.getElementById(prop.id + "-holder").style.backgroundColor =
          "#f5f5f4";
      } else {
        document.getElementById(prop.id + "-holder").style.backgroundColor =
          "white";
      }

    }
   
  }

  /*
   How to user Prop
           id={"input_name"}
                title={"ឈ្មោះស្ថាប័ន ឬអង្គភាព"}
                error_text={"សូមបំពេញឈ្មោះស្ថាប័ន ឬអង្គភាព"}
                required={true}

     
  */
  return (
    <div style={{ height: "80px" , marginTop : prop.marginTop }}>
      <div
        hidden={prop.title == null ? true : false}
        style={{ paddingBottom: "5px", textAlign: "left" }}
      >
        <label style={{ fontSize: "14px" }}>{prop.title}</label>
        <label
          hidden={prop.required == null ? true : false}
          style={{ color: "red", paddingLeft: "5px", fontWeight: "bolder" }}
        >
          *
        </label>
      </div>
      <div
        className="simple-input-main"
        id={prop.id + "-holder"}
        style={{
          backgroundColor:
            prop.backgroundcolor == null ? "white" : prop.backgroundcolor,
          borderWidth: "0.3px",
          borderColor: "#dedede",
        }}
      >
        <img
          src={prop.icon_left}
          alt=""
          style={{
            display: prop.icon_left == null ? "none" : "block",
            width: prop.icon_left == null ? "0px" : "25px",
            height: "25px",
            objectFit: "contain",
          }}
        />

        <input
          onChange={(e) => {
            changeborder(e);
          }}
          readOnly={
            prop.readonly == null ? false : prop.readonly == true ? true : true
          }
          id={prop.id}
          placeholder={prop.placeholder}
          defaultValue={prop.value}
          type={prop.type == null ? "text" : prop.type}
          style={{
            color:
              prop.readonly == null
                ? "black"
                : prop.readonly == true
                ? "black"
                : "gray",
          }}
        />

        <label style={{ paddingTop: "1px" }}>{prop.suffix}</label>
        <img
          onClick={() => prop.senderIconClick()}
          src={prop.icon}
          alt=""
          style={{
            width: prop.icon == null ? "0px" : "25px",
            height: "25px",
            objectFit: "contain",
          }}
        />
      </div>

      <label
        id={prop.id + "-error"}
        style={{
          textAlign: "left",
          marginLeft: "0px",
          color: "red",
          marginTop: "5px",
          fontSize: "10px",
          display: "none",
        }}
      >
        {prop.error_text}
      </label>
    </div>
  );
};

export default Simple_Input;