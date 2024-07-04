import fileRoutes from "vinxi/routes";
import { createRouter } from 'radix3'
import { eventHandler } from "vinxi/http"
import { HTTPMethod } from "./types"

const router = createRouter()

for (const route of fileRoutes) {
  router.insert(route.path, route)
}

const handleApiRequests = eventHandler(async (event) => {
  const { node } = event;
  const { req, res } = node;

  const match = router.lookup(req.url!);

  if (match) {
    const mod = match[`$${req.method}`].import;
    const route = await mod();
    const handler = route[req.method as HTTPMethod]
    const request = {
      ...req,
      params: match.params || {}
    }
    return handler(request, res);
  }

  res.statusCode = 404;
  res.end();
})

export default handleApiRequests
