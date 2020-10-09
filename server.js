const express = require("express");
const app = express();
require("./database/db");
const Messages = require("./Message/Message.schema");
const Room = require("./Room/Room.schema");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const RoomSchema = require("./Room/Room.schema");
app.use(cors());
app.use(express.json());

app.post("/room", async (req, res) => {
  try {
    const request = req.body;
    const room = new Room(request);
    const roomAdd = await room.save();
    res.status(201).send(roomAdd);
  } catch (error) {
    res.status(500).send(error);
  }
}); 

app.get("/room/name/:name", async (req, res) => {
  try {
    const room = await Room.find({
      name: { $regex: `${req.params.name}`, $options: "i" },
    });
    res.status(200).send(room);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/room", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).send(rooms);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/messages", async (req, res) => {
  try {
    const request = req.body;
    const message = new Messages(request);
    const messageAdd = await message.save();
    res.status(201).send(messageAdd);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/message/:roomid", async (req, res) => {
  try {
    const messages = await Messages.find({ roomId: req.params.roomid }).sort({
      createdAt: -1,
    });
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/messages/:roomid", async (req, res) => {
  try {
    const roomName = await Room.findOne({ _id: req.params.roomid });
    const messages = await Messages.find({ roomId: req.params.roomid });
    res.status(200).send({ roomName, messages });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ` + PORT);
});
