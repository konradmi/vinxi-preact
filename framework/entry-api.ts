import fileRoutes from "vinxi/routes";
import { eventHandler } from "vinxi/http"
import { HTTPMethod } from "./types"

const handleApiRequests = eventHandler(async (event) => {
  const { node } = event;
  const { req, res } = node;

  const match = fileRoutes.find((route) => {
    return route.path === req.url;
  });

  if (match) {
    const mod = match[`$${req.method}`].import;
    const route = await mod();
    const handler = route[req.method as HTTPMethod]
    return handler(req, res);
  }

  res.statusCode = 404;
  res.end();
})

export default handleApiRequests
