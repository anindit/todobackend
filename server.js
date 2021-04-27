const express = require('express');
const cors = require('cors');
var session = require('express-session');
var UserRouter=require('./routes/admin/users');
var NoteRouter=require('./routes/admin/notes');
var SlotRouter=require('./routes/admin/slots');
require('dotenv').config();
const path=require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));


app.use('/admin/users/',UserRouter)
app.use('/admin/notes/',NoteRouter)
app.use('/admin/slot/',SlotRouter)


global.frontend_url = "http://localhost:8000";
global.backend_url = "http://localhost:8080";
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});