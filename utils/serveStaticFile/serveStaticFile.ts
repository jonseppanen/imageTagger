import path from 'path';
import fs from 'fs/promises';
import { constants } from 'fs';
import mimeType from './mimeType.json'

export interface staticFileObject {
    err?: number;
    msg?: string;
    file?: Buffer;
    mimeType?: string
}

export const serveStaticFile = async (pathname: string) => {

    const staticFile: staticFileObject = {}

    //Error early if the file doesn't exist
    try {
        await fs.access(pathname, constants.R_OK);
    } catch {
        return { ...staticFile, err: 404, msg: `File ${pathname} not found!` };
    }

    //Reject if someone is trying to list a directory
    if ((await fs.stat(pathname)).isDirectory()) {
        return { ...staticFile, err: 403, msg: `You cannot list a directory here.` };
    }

    //Get file...
    const data = await fs.readFile(pathname);

    //Error out if there is a file read error. This is likely a super bad thing.
    if (!data) {
        return { ...staticFile, err: 500, msg: `Error retrieving file` };
    }

    const ext = path.parse(pathname).ext;

    //Return data and mime type
    return { ...staticFile, file: data, mimeType: (mimeType[ext] || 'text/plain') };


}


