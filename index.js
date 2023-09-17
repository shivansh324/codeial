const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts=require('express-ejs-layouts');
const db= require('./config/mongoose');

//reading through post requests
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//extract style and scripts from the sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(expressLayouts);

//use exp router
app.use('/',require('./routes'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Errorr in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});