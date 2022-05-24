import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "./Axios";
import { useStateValue } from "./StateProvider";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Switch } from "react-router-dom";

function App() {
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  // fetch initial  data
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get("/rooms/sync").then((respose) => {
      setRooms(respose.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("14878ebb629ff55b4658", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("rooms");
    channel.bind("inserted", function (newRooms) {
      // alert(JSON.stringify(newMessage));
      //append new message to the current messages
      setRooms([...rooms, newRooms]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [rooms]);

  // console.log(rooms);

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

  // console.log(messages);

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
          <BrowserRouter>
            <Sidebar rooms={rooms} />
            <Routes>
              <Route
                path="/rooms/:roomId"
                element={
                  <>
                    <Chat rooms={rooms} messages={messages} />
                  </>
                }
              />
              <Route
                path="/"
                element={<Chat rooms={rooms} messages={messages} />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      )}

      {/* {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Routes>
              <Route path="/app">
                <Sidebar rooms={rooms} />
                <Chat messages={messages} />
              </Route>
              <Route path="/">
                <h1>Home screen</h1>
              </Route>
            </Routes>
          </Router>
        </div>
      )} */}
    </div>
  );
}

export default App;
