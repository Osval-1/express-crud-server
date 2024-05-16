const express = require("express");
const Message = require("../models/message.model");

const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    const messages = await Message.find({});
    if (!messages[0]) {
      res.send("no messages yet");
      return;
    }
    res.json({ messages });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
router.post("/create", async (req, res) => {
  try {
    console.log(req.body);
    const sentMessage = new Message({
      title: req.body.title,
      author: req.body.author,
      authorPicture: req.body.authorPicture,
      message: req.body.message,
    });
    await sentMessage.save();
    res.status(201).send("message saved successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
router.put("/edit/:messageId", async (req, res) => {
  const { messageId } = req.params;
  const { title, author, authorPicture, message } = req.body;
  try {
    const editedMessage = await Message.findByIdAndUpdate(
      messageId,
      { title, author, authorPicture, message },
      { new: true }
    );
    res.status(200).send(editedMessage);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
router.delete("/delete/:messageId", async (req, res) => {
  const { messageId } = req.params;
  try {
    const deleteMessage = await Message.findByIdAndDelete(messageId);
    res.status(200).send("message deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
