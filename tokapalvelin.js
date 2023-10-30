const http = require('http');

const htmlAlku = `
<!DOCTYPE html>
<html lang="fi">
<head>
    <meta charset="utf-8">
    <title>Esimerkkisivu</title>
</head>
<body>
`;

const htmlLoppu = `
</body>
</html>
`;

// (req, res) => {} on sama kuin function(req, res) {}
const palvelin = http.createServer((req, res) => {
    // selvitetään, mitä sivua pyydetään
    const kokoUrl = new URL(`http://${req.hostname}${req.url}`);
    // dekoodataan, jotta ääkköset, välilyönnit ja muut tulevat oikein
    const reitti = decodeURIComponent(kokoUrl.pathname);
    

    if(reitti == '/') { // localhost:3000
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end(htmlAlku + 'Tervetuloa Node.js-palvelimelle' + htmlLoppu);

    }

    else if(reitti == '/kirjasto'){ // localhost:3000/kirjasto
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end(htmlAlku + '<p>Node ei ole kirjasto, vaan ajoympäristö.</p>' + htmlLoppu);

    }

    else {
        res.statusCode = 404;
        res.end(htmlAlku + 'Sivua ei löytynyt' + htmlLoppu);

    }
});

palvelin.listen(3000);