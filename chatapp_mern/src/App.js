import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "./Axios";
import { useStateValue } from "./StateProvider";

function App() {
  const [messages, setMessages] = useState([]);

  // const [rooms, setRooms] = useState([]);
  // useEffect(() => {
  //   axios.get("/messages/sync").then((respose) => {
  //     setRooms(respose.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   const pusher = new Pusher("14878ebb629ff55b4658", {
  //     cluster: "ap2",
  //   });
  //   const channel = pusher.subscribe("rooms");
  //   channel.bind("inserted", function (newRooms) {
  //     // alert(JSON.stringify(newMessage));
  //     //append new message to the current messages
  //     setRooms([...rooms, newRooms]);
  //   });

  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   };
  // }, [rooms]);

  // console.log(rooms);

  // fetch initial  data
  useEffect(() => {
    axios.get("/messages/sync").then((respose) => {
      setMessages(respose.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("14878ebb629ff55b4658", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      // alert(JSON.stringify(newMessage));
      //append new message to the current messages
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  // show login screen if no user is connected
  // const [user, setUser] = useState(null);
  // fetch from data layer google auth

  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Chat messages={messages} />
          {/* <Chat /> */}
        </div>
      )}
    </div>
  );
}

export default App;
