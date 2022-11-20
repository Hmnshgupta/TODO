const express = require('express');
const port = 2000;
const app = express();

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.urlencoded());
app.use(express.static('assest'))

// app.get('/',function(req,res){
//     return res.render('home',{
//         title : "My TO DO Page"
//     })
// })

//array for storing the list items
var item =[];

//line this used for database for mongosse implemetation

const db = require('./config/mongoose');

//this line is used for importing the model folder
const todo = require('./models/TODO');

//defing the items for html page and creating a item list(in case of no database using)
// app.get('/',function(req,res){
//     return res.render('home',{
//         title : 'MY TODO List',
//         items : item,
//     })  
// })

//sending data to server
app.post('/add-item',function(req,res){
    // item.push(req.body);
    //Populatinf data into DB
    todo.create({
        describe : req.body.describe,
        category : req.body.category,
        date : req.body.date
    },function(err,newTask){
        if(err){
            console.log(`error in creating a contact ${err}`);return;
        }
        // console.log('****',newTask);
        return res.redirect('back');
    })
})

//Fteching data from Database(using in database)
app.get('/',function (req,res){
    todo.find({},function(err,todos){
        if(err){
            console.log(`Something woring in data fetching ${err}`); return;
        }
        return res.render('home',{
        title : 'MY TODO List',
        items : todos,
        })
    })
})

//detetion of item 
app.get('/delete-task',function(req,res){
    var id = req.query;

    // to check the number of tasks to be deleted
    var count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {
        //Deleting the task from the database by using their individual ids
        todo.findByIdAndDelete(Object.keys(id)[i], function(err) {
            if (err) {
                console.log("Error in deleting the task from DB");
            }
        });
        console.log("Task-Deleted");
    }
    return res.redirect('back');
    

});



app.listen(port,function(err){
    if(err){
        console.log(`We are geeting this error due to ${err}`);
        return;
    }

    console.log(`Server is up and running ${port}`);
});