const express = require('express');
const connectDB = require('./config/db');

//initialize app with express
const app = express();

//connect db
connectDB();

//initialize middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('Hello World!'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port:  ${PORT}`));