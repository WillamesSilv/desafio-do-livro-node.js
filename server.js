const http = require('http');
const url = require('url');
const fs = require('fs');

function renderizaHtml(path, diretorio, res, fs) {
    fs.readFile(`${diretorio}${path}`, (err, html) => {
        res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(html);
    });
}

const server = http.createServer(async function(req, res) {
    res.writeHead(200, { "Content-type":"text/html; charset=uft-8"})
    const result = url.parse(req.url, true)
    await (result.pathname === '/') ? renderizaHtml('/index.html', __dirname, res, fs) : 
    renderizaHtml(result.pathname, __dirname, res, fs)
    /*if(result.pathname === '/' || result.pathname === '/index.html'){
        // A constante __dirname retorna o diretório raiz da aplicação.
        renderizaHtml('/index.html', __dirname, res, fs)
    }else if(result.pathname === '/contato.html'){
        renderizaHtml('/contato.html', __dirname, res, fs)
    }
    else {
        renderizaHtml('/erro.html', __dirname, res, fs)
    }*/
}) 

server.listen(3000, () => console.log("Servidor rodando na porta 3000..."))