const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // This is used instead of bodyParser.json()

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.log(err));

// Routes
const blogsRoutes = require('./routes/Blog'); // Adjust the path as necessary
app.use('/blogs', blogsRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the blogging server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
