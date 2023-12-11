//index.js
const express = require('express');
const cors = require('cors')
const authRoute = require('./routes/authRoutes'); // Sesuaikan dengan path route Anda
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors())

app.use('/auth', authRoute);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
