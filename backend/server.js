const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


// Подключение к базе данных MongoDB
mongoose.connect("mongodb://localhost:27017/LoginApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.log(err));

// Модель полльзователя
const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
});
const User = mongoose.model('User', UserSchema);

// Маршрут для логина
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', email, password);
    const user = await User.findOne({ email, password });
    if(user) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = new User({ email, password });
  await newUser.save();
  res.json({ message: 'User registered successfully' });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});