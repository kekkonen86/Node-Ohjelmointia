const http = require('http');
const fs = require('fs');
const url = require('url');

const {port, host} = require('./config.json');



const palvelin = http.createServer((req, res) => {
    const {pathname, searchParams} = new URL(`http://${host}:${port}${req.url}`);
    const reitti = decodeURIComponent({pathname, searchParams}.pathname);

    if(reitti == '/template1') {
        if(searchParams.has('kuva')) {
            if(searchParams.get('kuva').toLowerCase() == 'javascript') {
        fs.readFile( "mallipohja1.html", + "css/tyyli.css",  function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    
        }
       
    }


}

});

palvelin.listen(port, host);
