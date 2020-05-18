const express = require('express');
const app = express();

app.get('/',function(req, res){
    res.send("STARBURST STREAM!!!");
});

app.listen(3000, function(){
    console.log("server started");
})