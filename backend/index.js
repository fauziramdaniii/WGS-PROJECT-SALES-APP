//index.js
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoute')
const productRoutes = require('./routes/productRoute')
require('dotenv').config();

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use('/auth',  authRoute);
app.use('/api', userRoute);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});