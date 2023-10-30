const http = require('http');
const fs = require('fs'); //filse system
const path = require('path');
const {port, host} = require('./config.json');

 
const palvelin = http.createServer( (req, res) => {
    const {pathname, searchParams} = new URL(`http://${host}:${port}${req.url}`);
    const reitti=decodeURIComponent(pathname);
    if(reitti==='/template1'){
        if(searchParams.has('kuva')) { 
            const templatepolku = path.join(__dirname, 'mallipohja1.html');
            fs.readFile(templatepolku, 'utf8', (err, data) => {
                if(err){
                    res.statusCode=404;
                    res.end(err.message);
                }
                else {
                    // lukeminen onnistui
                    data = data.replace('##kuva##', searchParams.get('kuva'));
                    res.writeHead(200,{
                        'Content-Type':'text/html',
                        'Content-Length':Buffer.byteLength(data,'utf8')
                    });
                    res.end(data);
                }
            });
        }
        else {
            res.writeHead(404, {'Content-Type' : 'text/plain;charset=utf-8'});
            res.end('Tuntematon parametri');
        }
    }
else if(reitti==='/template2'){
        if(searchParams.has('kuva')) { 
            const templatepolku = path.join(__dirname, 'mallipohja2.html');
            fs.readFile(templatepolku, 'utf8', (err, data) => {
                if(err){
                    res.statusCode=404;
                    res.end(err.message);
                }
                else {
                    // lukeminen onnistui
                    data = data.replace('##kuva##', searchParams.get('kuva'));
                    res.writeHead(200,{
                        'Content-Type':'text/html',
                        'Content-Length':Buffer.byteLength(data,'utf8')
                    });
                    res.end(data);
                }
            });
        }
        else {
            res.writeHead(404, {'Content-Type' : 'text/plain;charset=utf-8'});
            res.end('Tuntematon parametri');
        }
    }
    else if (reitti =='/tyyli.css'){ 
     const templatepolku = path.join(__dirname, 'tyyli.css');
        fs.readFile(templatepolku, 'utf8', (err, data) => {
            if(err){
                res.statusCode=404;
                res.end(err.message);
            }
            else {
                // lukeminen onnistui
                res.writeHead(200,{
                    'Content-Type':'text/css',
                    'Content-Length':Buffer.byteLength(data,'utf8')
                });
                res.end(data);
            }
        });
    }
    else {
          res.statusCode=404;
          res.end('Tuntematon parametri');
    }
});

palvelin.listen(port, host);
