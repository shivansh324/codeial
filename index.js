const express = require('express');
const app = express();
const port = 8000;
const expressLayouts=require('express-ejs-layouts');

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