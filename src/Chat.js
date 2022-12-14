import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import { useStatevalue } from "./StateProvider";
import { timestamp } from "./firebase";
function Chat() {
  const [randomString, setRandomString] = useState("");
  const [value, setValue] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStatevalue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setRandomString(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("message >>", value);
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: value,
      name: user.displayName,
      timestamp: timestamp,
    });

    setValue("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${randomString}.svg`}
        />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
