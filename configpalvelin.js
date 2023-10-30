const http = require('http');

const {port, host} = require('./config.json');

const palvelin = http.createServer((req, res) => {
    const {pathname, searchParams} = new URL(`http://${host}:${port}${req.url}`);

    if(searchParams.has('kieli')) {
        if(searchParams.get('kieli').toLowerCase() == 'javascript') {
              res.writeHead(200, {'Content-Type':'text/plain;charset=utf-8'});
              res.end('Javascript on näppärä kieli');
        }
        else {
            res.writeHead(404, {'Content-Type' : 'text/plain;charset=utf-8'});
            res.end('Tuntematon parametri');
        }
    }

    else {
        res.writeHead(404, {'Content-Type' : 'text/plain;charset=utf-8'});
        res.end('Käytä parametria "kieli".')
    }
});

palvelin.listen(port, host);
