import { addImageTag } from "./addImageTag/addImageTag";
import { imageSearch } from "./imageSearch/imageSearch";
import { listImageTags } from "./listImageTags/listImageTags";
import { removeImageTag } from "./removeImageTag/removeImageTag";
import { serveTaggedImage } from "./serveTaggedImage/serveTaggedImage";
import { uploadImage } from "./uploadImage/uploadImage";

export const routes = {
    "img": {
        "upload": uploadImage,
        "$id": {
            "/": serveTaggedImage,
            "tags": listImageTags,
            "tag": {
                "add": addImageTag,
                "remove": removeImageTag,
            }
        }
    },
    "search": imageSearch
}