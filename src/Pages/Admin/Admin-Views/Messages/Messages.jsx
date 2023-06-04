import React, { useState } from "react";
import "./Messages.css";
import useFetchMessages from "../../../../hooks/useFetchMessages";
import MessageCard from "../../../../Components/Common/MessageCard/MessageCard";
import MySpinner from "../../../../Components/Spinner/Spinner";
import { MdOutlineFeed } from "react-icons/md";

function Messages() {
  const [filterParam, setFilterParam] = useState("all");
  const { isLoading, messages } = useFetchMessages(filterParam);

  const handleFilterChange = (e) => {
    const filterParam = e.target.value;
    filterParam === "last10days"
      ? setFilterParam("last10days")
      : filterParam === "today"
      ? setFilterParam("today")
      : setFilterParam("all");
  };

  return (
    <div className="message">
      <div className="message__header">
        <h2>
          <MdOutlineFeed />
          Messages
        </h2>
        <div className="message-drop__down">
          <strong>Filter: </strong>
          <select onChange={(e) => handleFilterChange(e)}>
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="last10days">Last 10 days</option>
          </select>
        </div>
      </div>
      <div className="message__wrapper">
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <MySpinner spinnerSize="lg" />
          </div>
        ) : messages?.length > 0 ? (
          messages?.map((msg) => {
            return (
              <MessageCard
                key={msg?._id}
                senderName={msg?.senderName}
                senderEmail={msg?.senderEmail}
                senderMessage={msg?.senderMessage}
                senderPhone={msg?.senderPhone}
                createdAt={msg?.createdAt}
              />
            );
          })
        ) : (
          <p style={{ textAlign: "center" }}>No Messages Received!</p>
        )}
      </div>
    </div>
  );
}

export default Messages;
