const http = require('http');
const url = require('url');

const port = process.env.PORT || 8080
data = [
    {
        "lugar": "L1",
        "nombre": "nom1",
        "id": "jj22"
    },
    {
        "lugar": "L2",
        "nombre": "nom2",
        "id": "zs81"
    },
    {
        "lugar": "L3",
        "nombre": "nom3",
        "id": "xx71"
    }
]

data2 = {
    url: 'https://localhost/nn'
}

data3 = {
    'nombre': 'xx',
    'lugar': 'yy',
    'url': 'xxx',
    'volumen': 28
}

const server = http.createServer((req, res) => {
    console.log("REQ START => " + req.url);

    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`)
    } else {
        if (req.url.match(/api\/\?[^/]*$/)) {
            console.log("GET /")
            res.end(JSON.stringify(data))
        }
        else if (req.url.match(/api\/[^/]*\/play$/)) {
            console.log("GET /play")
            res.end(JSON.stringify(data2))
        }
        else if (req.url.match(/api\/now_playing\/stop$/)) {
            console.log("GET /now_playing/stop")
            res.end(JSON.stringify(data3))
        }
        else if (req.url.match(/api\/now_playing\/volume$/)) {
            console.log("GET /now_playing/volume")
            res.end(JSON.stringify(data3))
        }
        else if (req.url.match(/api\/now_playing$/)) {
            console.log("GET /now_playing")
            res.end(JSON.stringify(data3))
        }
        
        else {
            res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
        }
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})