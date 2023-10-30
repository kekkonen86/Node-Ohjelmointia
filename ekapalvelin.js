const http = require('http');

const palvelin = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Moi maailma!');
    res.end();
});

palvelin.listen(3000);
