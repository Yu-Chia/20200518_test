const http = require('http');

const fs = require('fs');

const server = http.createServer((req, res)=>{
    fs.writeFile(__dirname+'\\header01.json', 
        JSON.stringify(req.headers),
        error=>{
            if(error){
                console.log(error);
            }else {
                res.end(`${__dirname+'\\header01.json'}`)
            }
        }
    )
    // res.writeHead(200, {
    //     'Content-Type': 'text/html'
    // });
    // res.end(`<h2>${req.url}</h2>
    //          <p>123</p>`);
});
server.listen(3000);