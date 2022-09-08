import http from 'http';

export const uploadImage = async (req: http.IncomingMessage, res: http.ServerResponse, slugs: object) => {
    if (req.method !== "POST") {
        return false;
    }
    res.end("UPLOADING IMAGE");
    return true
}