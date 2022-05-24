import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import { InsertEmoticon, Mic } from "@material-ui/icons";
import "./Chat.css";
import axios from "./Axios";
import { useStateValue } from "./StateProvider";
import { useParams } from "react-router-dom";

export default function Chat({ rooms, messages }) {
  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const { roomName, setRoomName } = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      roomId: roomId,
      message: input,
      name: user?.displayName,
      email: user?.email,
      // name: "ashish",
      // email: "ashihs@gmai.com",
      timestamp: new Date().toLocaleString(),
    });

    setInput("");
  };

  useEffect(() => {
    axios.get("/rooms/sync").then((respose) => {
      setRoomName(respose.data);
    });
  }, []);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/pixel-art/${seed}.svg`}
        />
        <div className="chat__headerInfo">
          <h3>{roomId}</h3>
          <p>Last Seen ...</p>
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
        {messages.map((messages) => {
          if (messages.roomId == roomId) {
            return (
              <>
                <p
                  className={`chat__message ${
                    messages.email == user.email && "chat__receiver"
                  }`}
                >
                  <span className="chat__name">{messages.name}</span>
                  {messages.message}
                  <span className="chat__timestamp">{messages.timestamp}</span>
                </p>
              </>
            );
          }
        })}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          {/* value={input}
           onChange={(e)=>SettingsInputAntenna(e.target.value)} */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}
