/*const http = require('http');
const fs = require('fs');
const _ = require('lodash');


const server = http.createServer((req, res) => {
    

    //set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './Page/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301; //moved permait redirect
            res.setHeader('Location', '/about'); // redirecting
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }



    //read file
    fs.readFile(path, (e, data) => {
        if(e) {
            console.error(e);
            res.end();
        }
        else {
          //  res.write(data);
            res.end(data);
        }
    });

});

server.listen(3000, 'localhost', () => {
    
});*/