const express = require('express');
const app = express();
const port = 8000;



//use exp router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Errorr in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});