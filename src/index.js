require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/authRoute');
const groupsRoutes = require('./routes/groupsRoute');
const transactionsRoutes = require('./routes/transactionsRoute');
const balanceRoutes = require('./routes/balanceRoute');

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use('/auth/', authRoutes);
app.use('/groups/', groupsRoutes);
app.use('/transactions/', transactionsRoutes);
app.use('/balance/', balanceRoutes);
app.listen(PORT, console.log(`server online on port ${PORT}`));
