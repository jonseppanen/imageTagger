import http from 'http';

export const removeImageTag = async (req: http.IncomingMessage, res: http.ServerResponse, slugs: object) => {
    if(req.method !== "POST"){
        return false;
    }
    res.end("REMOVING IMAGE TAG");
    return true
}