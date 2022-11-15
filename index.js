const express = require('express');
const port = 2000;
const app = express();

app.listen(port,function(err){
    if(err){
        console.log(`We are geeting this error due to ${err}`);
        return;
    }

    console.log(`Server is up and running ${port}`);
})