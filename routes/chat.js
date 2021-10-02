const router = require('express').Router();
let Chat = require('../models/chat.model');

router.route('/').get((req, res) => {
  Chat.find()
    .then((chat) => res.json(chat))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const chat = req.body.chat;

  const newChat = new Chat({
    name,
    chat,
  });

  newChat
    .save()
    .then(() => res.json('Chat added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Chat.findById(req.params.id)
    .then((chat) => res.json(chat))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Chat.findByIdAndDelete(req.params.id)
    .then(() => res.json('Chat deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
