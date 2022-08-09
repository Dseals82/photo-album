const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 8082;
const photos = require('./routes/api/photos')


//middleware
app.use(express.json())
app.use('/photos', photos)

//connect DB
connectDB();


app.get('/',(req, res)=> {
    res.send('Hello World')
})

app.listen(port, () => console.log(`Server running on port ${port}`));