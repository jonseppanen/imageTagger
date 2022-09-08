import http from 'http';

export const imageSearch = async (req: http.IncomingMessage, res: http.ServerResponse, slugs: object) => {
    if(req.method !== "GET"){
        return false;
    }
    res.end("SEARCHING FOR IMAGES");
    return true
}