import http from 'http';

export const listImageTags = async (req: http.IncomingMessage, res: http.ServerResponse, slugs: object) => {
    if(req.method !== "GET"){
        return false;
    }
    res.end("LISTING IMAGE TAGS");
    return true
}