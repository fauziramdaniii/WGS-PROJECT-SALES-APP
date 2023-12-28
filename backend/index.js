//index.js
// Package
const express = require('express');
const cors = require('cors')
require('dotenv').config();
const bodyParser = require('body-parser')

// Utils
const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use('/uploads', express.static('../backend/uploads'))

// Routes Import
const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoute')
const productRoutes = require('./routes/productRoute')
const orderRoutes = require('./routes/orderRoutes')
const cartRoutes = require('./routes/cartRoutes')
const logRoutes = require('./routes/logRoutes')
const termConditionRoutes = require('./routes/termCondition')
// Routes Create
app.use('/auth',  authRoute);
app.use('/api', userRoute);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes)
app.use('/api', cartRoutes);
app.use('/api', logRoutes)
app.use('/api', termConditionRoutes);
// Listen Server
const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});