import http from 'http';

export const router = (path: string, routes: object, req: http.IncomingMessage, res: http.ServerResponse, slugs: object = {}) => {

    //Split the router path into segments
    const routeSegments = path.split("/").filter(v => v);

    //Get the first router segments
    let currentRouteSegment = routeSegments.shift();

    //Route path has been successfully exhausted, execute if possible
    if (!currentRouteSegment && routeSegments.length < 1) {
        if (typeof routes === "function") {
            //Found route function successfully, execute
            return routes(req, res, slugs)
        }
        else if (!routes["/"]) {
            //Did not find a valid route function or an index function, false out
            return false;
        }
        else {
            //Go to index function
            currentRouteSegment = "/"
        }
    }

    //Did not find a valid path, check for a slug
    if (!routes[currentRouteSegment]) {

        const slug = Object.keys(routes).find(key => key.startsWith("$"))
        //no valid slug, early exit
        if (!slug) return false;

        //Assign the slug to its slugged value, and change the current route to the slug identifier
        slugs[slug] = currentRouteSegment;
        currentRouteSegment = slug;
    }

    return router(routeSegments.join("/"), routes[currentRouteSegment], req, res, slugs)

}

