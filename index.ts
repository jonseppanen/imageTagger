import http from 'http';
import url from 'url';
import path from 'path';
import { serveStaticFile } from './utils/serveStaticFile/serveStaticFile';
import { routes } from './routes/routes';
import { router } from './utils/router/router';

// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port: number = parseInt(process.argv[2]) || 9000;

const serverWorker = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    console.log(`${req.method} ${req.url}`);

    // Parse and Santize route path to prevent directory traversal
    const parsedUrl = url.parse(req.url);
    const sanitizedPath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');

    //Try run the route, and if successful, hand off to it.
    if (await router(sanitizedPath, routes, req, res)) {
        return;
    }

    //Fall back to static files within the public dir
    let pathname = path.join(__dirname, "/public", sanitizedPath);
    const staticFileObject = await serveStaticFile(pathname)
    if (staticFileObject.err) {
        res.statusCode = staticFileObject.err;
        res.end(staticFileObject.msg);
        console.error(staticFileObject.msg)
        return;
    }
    res.setHeader('Content-type', staticFileObject.mimeType);
    res.end(staticFileObject.file);

}

http.createServer(serverWorker).listen(port);

console.log(`Server listening on port ${port}`);

