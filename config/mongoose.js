const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/firstdb');
const db = mongoose.connection;

db.on('error',console.error.bind('console','We did Something worng'));

db.once('open',function(){
    console.log('Our server is Up and running');
});

module.exports = db;