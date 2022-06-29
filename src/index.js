require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/authRoute');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/', authRouter);

app.listen(PORT, console.log(`server online on port ${PORT}`));
