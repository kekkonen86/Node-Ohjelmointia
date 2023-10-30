const http = require('http');

const linkit = `<a href="./javascript">javascript</a>
<a href="./nodejs">nodejs</a>
<a href="./express">express</a>`
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
        res.end(htmlAlku + 'MOI PERUNA' + linkit  + htmlLoppu);
        

    }

    else if(reitti == '/javascript'){
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end(htmlAlku + '<p>JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for webpage behavior, often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the code on users devices.</p>' + htmlLoppu);

    }
    else if(reitti == '/nodejs'){ 
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end(htmlAlku + '<p>Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on a JavaScript Engine and executes JavaScript code outside a web browser, which was designed to build scalable network applications. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the users web browser. Consequently, Node.js represents a "JavaScript everywhere" paradigm, unifying web-application development around a single programming language, rather than different languages for server-side and client-side scripts.</p>' + htmlLoppu);

    }
    else if(reitti == '/express'){ 
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end(htmlAlku + '<p>Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.</p>' + htmlLoppu);

    }

    else {
        res.statusCode = 404;
        res.end(htmlAlku + 'Sivua ei löytynyt' + htmlLoppu);

    }
});

palvelin.listen(3000);