import React from "react";
import "./NameInitials.css";

export default function NameInitials(props) {
  return (
    <div className="name__initials">
      <span>{props.name?.substring(0, 1).toUpperCase()}</span>
    </div>
  );
}
