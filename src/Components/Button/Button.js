import React from "react";
import "./Button.css";

function Button(props) {
  return (
    <button
      type={props.Type ? props.Type : "button"}
      style={{ padding: props.Padding }}
      className={`primary-btn ${props.setBackground && "bg"}`}
      onClick={props.Func}
    >
      {props.children}
    </button>
  );
}

export default Button;
