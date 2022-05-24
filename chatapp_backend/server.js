//imporing
import express from "express";
import mongoose from "mongoose";
import Rooms from "./dbRooms.js";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";
//app config
const app = express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
  appId: "1412337",
  key: "14878ebb629ff55b4658",
  secret: "0e8133653850d7711850",
  cluster: "ap2",
  useTLS: true,
});

//middleware
app.use(express.json());
app.use(cors());

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Headers","*");
//     next();
// });

//DBconfig
const conection_url = process.env.DATABASE;
// "mongodb+srv://admin:pByDWj9dcCVnJwPj@cluster0.ijbqq.mongodb.net/chatappdb?retryWrites=true&w=majority";
mongoose.connect(conection_url, (err) => {
  if (err) throw err;
  // console.log('connected to MongoDB')
});
//

const db = mongoose.connection;

db.once("open", () => {
  console.log("rooms DB Connected");
  const roomCollection = db.collection("rooms");
  const changeStream = roomCollection.watch();
  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType == "insert") {
      const roomDetail = change.fullDocument;
      pusher.trigger("rooms", "inserted", {
        name: roomDetail.name,
      });
    } else {
      console.log("error triggering Pusher");
    }
  });
});

db.once("open", () => {
  console.log("message DB Connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType == "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        roomId: messageDetails.roomId,
        email: messageDetails.email,
        timestamp: messageDetails.timestamp,
      });
    } else {
      console.log("error triggering Pusher");
    }
  });
});

//api routes
// app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.get("/rooms/sync", (req, res) => {
  Rooms.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.post("/rooms/new", (req, res) => {
  const dbRooms = req.body;

  Messages.create(dbRooms, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//step 3 deploy
if ((process.env.NODE_ENV = "production")) {
  app.use(express.static("chatapp_mern/build"));
}
//listener
app.listen(port, () => console.log(`Listening on Localhost :${port}`));
