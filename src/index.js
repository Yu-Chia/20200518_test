const express = require('express');
// const multer = require('multer');
const fs = require('fs');
const app = express();
const cors = require('cors');
// const uploads = multer({dest: 'tmp_uploads/'})
const session = require('express-session');
const MysqlStore = require('express-mysql-session')(session);
const db = require(__dirname+'/db_connect2');
const sessionStore = new MysqlStore({},db);
const uploads = require(__dirname + '/upload-module');
const moment = require('moment-timezone');


app.set('view engine', 'ejs');

//Top-level Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'asvzsef3DSLl!AS./',
    store: sessionStore,
    cookie:{
        maxAge: 1200000
    }
}))
app.use((req, res, next)=>{

    res.locals.sess = req.session || {};
    // res.locals.customData = {
    //     name: 'Kirito',
    //     skill: 'StarBurst Stream'
    // };
    next();
});
const whitelist = ['http://localhost:8080', undefined];
const corsOptions = {
    credentials: true,
    origin: function(origin, cb){
        console.log('origin:'+origin);
        if(whitelist.indexOf(origin) !== -1){
            cb(null, true);
        }else {
            cb(null, false);
        }
    }
}

app.use(cors(corsOptions));

app.get('/', function (req, res) {
    res.render('main', { name: 'Martin', pageTitle: '首頁' });
});

app.get('/sales', function (req, res) {
    const sales = require(__dirname + '/../data/sales');
    // res.json(data);
    res.render('sales-json', { sales, pageTitle: 'sales' })
});

app.get('/try-upload', (req, res) => {
    res.render('try-upload');
})
/*
app.post('/try-upload', uploads.single('avatar'), (req, res)=>{

    const output = {
        success : false,
        uploadImg : "",
        nickname : "",
        error : ""
    }

    // console.log(req.body);
    // console.log(req.file);
    // res.send('ok');
    if(req.file && req.file.originalname){
        output.nickname = req.body.nickname;
        switch(req.file.mimetype){
            case 'image/jpeg':
            case 'image/png':
                fs.rename(req.file.path, './public/img/'+req.file.originalname, error=>{
                    if(!error){
                        output.success = true;
                        output.uploadImg = '/img/'+req.file.originalname;
                    }
                    res.render('try-upload',output);
                });
                break;
            default:
                fs.unlink(req.file.path, error=>{
                    output.error = "檔案類型錯誤";
                    res.render('try-upload', output);
                });
        }
    }
})
*/

app.post('/try-upload2', uploads.single('avatar'), (req, res)=>{
    // console.log(req.file);
    // res.send('ok');
    res.json({
        filename: req.file.filename,
        body: req.body
    })
});

// const func2 = (req, res)=>{
//     res.json(req.params);
// }


app.get('/try-params1/*/*',(req,res)=>{
    res.json(req.params);
})//or func2

app.get(/^\/mobile\/09\d{2}-?\d{3}-?\d{3}/,(req,res)=>{
    let url = req.url.slice(8).split("?")[0];
    url = url.split("-").join("");
    res.send(`Before: ${req.url} <br>After: ${url}`);
})//or func2

app.get('/try-post-form', (req, res) => {
    res.render('try-post-form', { pageTitle: 'Try-post-form' });
})

app.post('/try-post-form', (req, res) => {
    res.locals.pageTitle = 'Try-post-form-posted';
    res.render('try-post-form', req.body);
})

app.post('/try-json-post', (req, res) => {
    req.body.contentType = req.get("Content-Type");
    res.json(req.body);
})

// app.get('/ok',(req, res)=>{
//     console.log(express);
//     res.send("ok");
// })

app.get('/try-qs', function (req, res) {
    res.json(req.query);
})

app.get('/pending', function (req, res) {

});

app.get('/try-session',(req, res)=>{
    req.session.my_var = req.session.my_var || 0;
    req.session.my_var++;
    res.json({
        my_var: req.session.my_var,
        session: req.session
    });
    
})
app.get('/login',(req, res)=>{
    res.render('login');
})

app.post('/login', uploads.none(),(req, res)=>{
    const user = {
        'Martin': {
            password: '1234',
            nickname: 'MT'
        },
        'Kirito': {
            password: 'c8763',
            nickname: 'BP'
        }
    }
    
    const output = {
        success: false,
        body: req.body
    };
    if(user[req.body.account] && user[req.body.account].password === req.body.password){
        output.success = true;
        req.session.user = {
            user: req.body.account,
            nickname: user[req.body.account].nickname
        };
        output.sess_user = req.session.user;
    }
    res.json(output);
});

app.get('/log-out',(req,res)=>{
    delete req.session.user;
    res.redirect('/login');
});

app.get('/try-moment',(req, res)=>{
    const fm = 'YYYY-MM-DD HH:mm:ss';
    const m1 = moment(new Date());
    const m2 = moment(req.session.cookie.expires);
    const m3 = moment("1996-06-14");

    res.json({
        m1: m1.format(fm),
        m2: m2.format(fm),
        m3: m3.format(fm),
        m1a: m1.tz('Europe/London').format(fm),
        m2a: m2.tz('Europe/London').format(fm),
        m3a: m3.tz('Europe/London').format(fm),
    })
});

app.use('/address-book',require(__dirname+'/address_book'));

const admin2Router = require(__dirname+'/admins/admin2');
app.use(admin2Router);
app.use('/my',admin2Router);

app.use(express.static('public'));

app.use((req, res) => {
    res.type('text/html');
    res.status(404);
    res.send(`<h2>哭哭喔找不到頁面</h2>
              <img src="https://steamuserimages-a.akamaihd.net/ugc/922556414965608331/89469F0D2C98046C6748CFFFAA5920C5A601A1E3/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true">`);
})

app.listen(3000, function () {
    console.log("server started");
})