import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Chat, SearchOutlined } from "@mui/icons-material";
import { DonutLarge } from "@mui/icons-material";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStatevalue } from "./StateProvider";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStatevalue();

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input placeholder="Search or Start new Chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
