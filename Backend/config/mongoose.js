const mongoose = require('mongoose');
mongoose.connect('mongodb://anonym:secret@localhost:27017/eduwork-mongoose?authSource=admin');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('Server connected to database'));