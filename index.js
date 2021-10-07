const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());

const uri =
  'mongodb+srv://seher12345:Zaq1@wsx@cluster0.14dw8.mongodb.net/sisVSsis?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connected');
});

const chatRouter = require('./routes/chat');
const userRouter = require('./routes/user');

app.use('/chat', chatRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
