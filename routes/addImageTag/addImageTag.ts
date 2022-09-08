import http from 'http';

export const addImageTag = async (req: http.IncomingMessage, res: http.ServerResponse, slugs: object) => {
    if (req.method !== "POST") {
        return false;
    }

    let whole = ''
    req.on('data', (chunk) => {
        whole += chunk.toString()
    })

    req.on('end', () => {
        console.log(whole)
        res.writeHead(200, 'OK', { 'Content-Type': 'text/html' })
        res.end('ADDED IMG TAG.')
    })

    return true
}