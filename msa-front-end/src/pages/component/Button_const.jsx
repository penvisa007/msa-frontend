import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Button_const(props) {
  function typeOfButton() {
    switch (props.style) {
      case 0:
        return "btn-primary";
        break;
      case 1:
        return "btn-secondary";
        break;
      case 2:
        return "btn-success";
        break;
      case 3:
        return "btn-danger";
        break;
      case 4:
        return "btn-warning";
        break;

      case 5:
        return "btn-info";
        break;

      case 6:
        return "btn-dark";
        break;

      case 7:
        return "btn-link";
        break;

      case 8:
        return "btn-outline-primary";
        break;

      case 9:
        return "btn-outline-secondary";
        break;

      case 10:
        return "btn-outline-success";
        break;

      case 11:
        return "btn-outline-danger";
        break;

      case 12:
        return "btn-outline-warning";
        break;

      case 13:
        return "btn-outline-info";
        break;

      case 14:
        return "btn-outline-light";
        break;

      case 15:
        return "btn-outline-dark";
        break;

      default:
        return "btn-light";
    }
  }
  return (
    <div>
      <div>
        <button
          onClick={props.event}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
          type="button"
          className={"btn " + typeOfButton()}
        >
          <img
            src={props.left_icon}
            style={{
              width: props.left_icon == null ? "0px" : "25px",
              height: "25px",
              objectFit: "contain",
              marginRight: "10px",
            }}
            alt=""
          />

          {props.title}

          <img
            src={props.left_icon}
            style={{
              width: props.right_icon == null ? "0px" : "25px",
              height: "25px",
              objectFit: "contain",
              marginRight: "10px",
            }}
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default Button_const;