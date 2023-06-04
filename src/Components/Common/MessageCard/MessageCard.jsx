import React from "react";
import "./MessageCard.css";
import NameInitials from "../NameInitials/NameInitials";
import moment from "moment";

function MessageCard(props) {
  const { senderName, senderEmail, senderMessage, createdAt, senderPhone } =
    props;
  return (
    <div className="message__card">
      <div className="name__initials__wrapper">
        <NameInitials name={senderName} />
        <div>
          <p>{senderName}</p>
          <p>{moment(createdAt).format("MMMM D, YYYY")}</p>
        </div>
      </div>
      <div className="message__content">
        <p>
          <strong className="col-12 col-md-6 col-lg-6 px-0">
            <a href={`mailto:${senderEmail}`}>{senderEmail},</a>
          </strong>
          <strong className="col-12 col-md-6 col-lg-6 px-0">
            <a href={`tel:${senderPhone}`}>{senderPhone}</a>
          </strong>
        </p>
        <p>{senderMessage}</p>
      </div>
    </div>
  );
}

export default MessageCard;
