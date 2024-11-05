import React, { useState, useRef, useEffect } from "react";
import "../component/Simple_Select.css";
import Select from "react-select";

function Simple_Select(prop) {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "white",
      // match with the menu
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      // borderColor: state.isFocused
      //   ? "lightgray"
      //   : prop.is_wrong == null
      //   ? "#dedede"
      //   : prop.is_wrong == true
      //   ? "red"
      //   : "#dedede",

      borderColor: "transparent",

      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "gray" : "gray",
      },
      borderRadius: 6,
      padding: "1px",
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
  };

  const [dataValue, setdataValue] = useState("false");
  const [is_Wrong, set_is_Wrong] = useState(false);
  function onChange(e) {
    if (prop.is_multi == true) {
      var list = "";
      var index = 0;
      for (let i of e) {
        if (e.length - 1 == index) {
          list += i.value;
        } else {
          list += i.value + ",";
        }

        index++;
      }
      setdataValue(list);
    } else {
      setdataValue(e.value);
    }

    document.getElementById(prop.id + "-error").style.display = "none";
    document.getElementById(prop.id + "border").style.borderColor = "black";
  }

  function checkSelectIndex() {
    var index = 0;
    if (prop.options) {
      for (let i of prop.options) {
        if (prop.select_index == index) {
          return i.value;
          break;
        }
        index++;
      }
    }
  }

  function valueMultiDefault() {
    var list = [];
    if (prop.select_index != undefined) {
      if (prop.select_index.length == 0) {
        //skip
        
      } else {
        for (let i of prop.select_index) {
          list.push(prop.options[i]);
        }
      }
    }

    return list;
  }

  return (
    <div style={{ width: "auto", height: '80px' }}>
      <div
        hidden={prop.title == null ? true : false}
        style={{ paddingBottom: "5px" }}
      >
        <label style={{fontSize:'14px'}}>{prop.title}</label>
        <label
          hidden={prop.required == null ? true : false}
          style={{ color: "red", paddingLeft: "5px", fontWeight: "bolder" }}
        >
          *
        </label>
      </div>

      <div>
        <label hidden id={prop.id + "update"}>
          {prop.select_index == null ? null : checkSelectIndex()}
        </label>

        <label hidden id={prop.id + "value"}>
          {dataValue}
        </label>

        <div
          id={prop.id + "border"}
          style={{
            borderWidth: "0.3px",
            borderStyle: "solid",
            borderRadius: "6px",
            borderColor: "lightgray",
          }}
        >
          <Select
            isMulti={
              prop.is_multi == null
                ? false
                : prop.is_multi == true
                ? true
                : false
            }
            isClearable={prop.is_clear}
            ref={prop.ref}
            id={prop.id}
            onChange={(e) => {
              onChange(e);
              prop.senderOnChange(e);
            }}
            classNamePrefix="select"
            placeholder={
              prop.placeholder == null ? "Choose options ..." : prop.placeholder
            }
            noOptionsMessage={({ inputValue }) =>
              !inputValue ? "No data found!" : "No data found!"
            }
            options={prop.options}
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              borderRadius: 6,
              colors: {
                ...theme.colors,
                text: "black",
                primary25: "lightgreen",
                primary: "green",
              },
            })}
            value={
              prop.select_index != null
                ? prop.is_multi == true
                  ? valueMultiDefault()
                  : prop.options[prop.select_index]
                : prop.options[prop.select_index]
            }
            inputValue={prop.input_value}
          />
        </div>

        <label
          id={prop.id + "-error"}
          style={{
            marginLeft: "10px",
            color: "red",
            marginTop: "5px",
            fontSize: "12px",
            display: "none",
          }}
        >
          {prop.error_text}
        </label>
      </div>
    </div>
  );
}

export default Simple_Select;
