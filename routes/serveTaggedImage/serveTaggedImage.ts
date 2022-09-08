import http from 'http';

export const serveTaggedImage = async (req: http.IncomingMessage, res: http.ServerResponse, slugs: object) => {
    if(req.method !== "GET"){
        return false;
    }
    res.end("SERVING TAGGED IMAGE");
    return true
}