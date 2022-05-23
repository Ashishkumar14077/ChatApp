import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import axios from "./Axios";
import { Link } from "react-router-dom";

function SidebarChat({ addNewChat, roomName, id }) {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async (e) => {
    const newroomName = prompt("Please enter name for chat");
    if (newroomName) {
      // do some clever databse stuff
      e.preventDefault();
      await axios.post("/rooms/new", {
        name: newroomName,
      });
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/pixel-art/${seed}.svg`}
        />
        <div className="sidebarChat__info">
          <h2>{roomName}</h2>
          <p>This is the last Message</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
