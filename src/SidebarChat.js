import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import "./SidebarChat.css";

function SidebarChat({ addNewChat }) {
  const [randomString, setRandomString] = useState("");

  const createChat = () => {
    const roomName = prompt("please enter room name for chat");

    if (roomName) {
    }
  };

  useEffect(() => {
    setRandomString(Math.floor(Math.random() * 5000));
  }, []);
  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar
        src={`https://avatars.dicebear.com/api/human/${randomString}.svg`}
      />
      <div className="sidebarChat__info">
        <h2>Room Name</h2>
        <p>Last Message...</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
