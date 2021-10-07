const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    name: { type: String, required: false },
    chat: { type: String, required: false },
    creator: String,
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
