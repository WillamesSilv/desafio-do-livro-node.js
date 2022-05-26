const http = require('http');
const url = require('url');
const fs = require('fs');

function renderizaHtml(path, diretorio, res, fs) {
    fs.readFile(`${diretorio}${path}`, (err, html) => {
        res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(html);
    });
}

function renderizaCss(path, diretorio, res, fs){
    fs.readFile(`${diretorio}${path}`, (err, css) => {
        res.writeHeader(200, {'Content-Type': 'text/css; charset=utf-8'});
        res.end(css);
    });
}

const server = http.createServer(function(req, res) {
    res.writeHead(200, { "Content-type":"text/html; charset=uft-8"})
    const {pathname} = url.parse(req.url, true)
    
    if(pathname === '/' || pathname.slice(-4) === 'html'){
        // A constante __dirname retorna o diretório raiz da aplicação.
        let path = pathname === '/' ? '/index.html' : pathname.slice(pathname.indexOf('/'), pathname.length)
        renderizaHtml(path, __dirname, res, fs)

    }else if (pathname.slice(-3) === 'css') {
        
        renderizaCss(pathname.slice(pathname.indexOf('/'), pathname.length), __dirname, res, fs)

    }
    else {

        renderizaHtml('/erro.html', __dirname, res, fs)

    }
}) 

server.listen(3000, () => console.log("Servidor rodando na porta 3000..."))