
import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res)=>{
    fs.writeFile(__dirname+'\\header02.json', 
        JSON.stringify(req.headers),
        error=>{
            if(error){
                console.log(error);
            }else {
                res.end(`${__dirname+'\\header02.json'}`)
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