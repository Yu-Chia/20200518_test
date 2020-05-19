const express = require('express');
const app = express();

app.set('view engine', 'ejs');

//Top-level Middleware
app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.get('/',function(req, res){
    res.render('main', { name: 'Martin'});
});

app.get('/sales',function(req, res){
    const sales = require(__dirname + '/../data/sales');
    // res.json(data);
    res.render('sales-json',{ sales })
});


//middleware;

app.get('/try-post-form', (req, res)=>{
    res.render('try-post-form');
})

app.post('/try-post-form', (req, res)=>{
    res.render('try-post-form', req.body);
})

app.post('/try-json-post', (req, res)=>{
    req.body.contentType = req.get("Content-Type");
    res.json(req.body);
})

// app.get('/ok',(req, res)=>{
//     console.log(express);
//     res.send("ok");
// })

app.get('/try-qs',function(req, res){
    res.json(req.query);
})

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