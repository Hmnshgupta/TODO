const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
            describe : {
            type : String,
            required : true
        },
        category : {
            type : String,
            required : true
        },
        date :{ 
            type : Date,
            required : true,
            default : Date.now
        }
})

const todo = mongoose.model('todo',TodoSchema);
module.exports = todo;