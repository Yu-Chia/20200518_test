const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/',function(req, res){
    res.render('main', { name: 'Martin'});
});

app.get('/sales',function(req, res){
    const sales = require(__dirname + '/../data/sales');
    // res.json(data);
    res.render('sales-json',{ sales })
});

app.get('/pending',function(req, res){
    
});

app.use(express.static('public'));

app.use((req, res) => {
    res.type('text/html');
    res.status(404);
    res.send(`<h2>哭哭喔找不到頁面</h2>
              <img src="https://steamuserimages-a.akamaihd.net/ugc/922556414965608331/89469F0D2C98046C6748CFFFAA5920C5A601A1E3/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true">`);
})

app.listen(3000, function(){
    console.log("server started");
})