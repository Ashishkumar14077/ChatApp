import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import Pusher from "pusher-js";
import axios from "./Axios";
import { useStateValue } from "./StateProvider";

function Sidebar({ rooms }) {
  //datalayer fetch
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="sidebar">
      {/* <h1>Sidebar</h1> */}
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {rooms.map((rooms) => (
          <p>
            <SidebarChat key={rooms._id} roomName={rooms.name} id={rooms._id} />
          </p>
        ))}
        {/* <SidebarChat /> */}
        {/* <SidebarChat rooms={rooms}/> */}
      </div>
    </div>
  );
}

export default Sidebar;
