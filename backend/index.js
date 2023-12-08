//index.js
const express = require('express');
const authRoute = require('./routes/authRoutes'); // Sesuaikan dengan path route Anda

const app = express();
app.use(express.json());

app.use('/auth', authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
