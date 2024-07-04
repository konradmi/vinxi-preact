import fileRoutes from "vinxi/routes";
import { createRouter } from 'radix3'
import { eventHandler } from "vinxi/http"
import { HTTPMethod } from "./types"

const router = createRouter()

for (const route of fileRoutes) {
  router.insert(route.path, route)
}

const formatQueryParams = (params?: Record<string, string>) => {
  if (!params) return {}
  return Object.keys(params).reduce((acc, key) => {
    acc[key] = params[key].split('?')[0]
    return acc
  }, {} as Record<string, string>)
}

const extractQueryParams = (params?: Record<string, string>) => {
  if (!params) return {}

  let queryParamsString = ''

  for (const key in params) {
    const qp = params[key].split('?')[1]
    if (qp) {
      queryParamsString = qp
      break
    }
  }

  return new URLSearchParams(queryParamsString);
}

const handleApiRequests = eventHandler(async (event) => {
  const { node } = event;
  const { req, res } = node;

  const match = router.lookup(req.url!);

  if (match) {
    const mod = match[`$${req.method}`].import;
    const route = await mod();
    const handler = route[req.method as HTTPMethod]
    console.log('match', match)
    const request = {
      ...req,
      params: formatQueryParams(match.params),
      query: extractQueryParams(match.params)
    }
    return handler(request, res);
  }

  res.statusCode = 404;
  res.end();
})

export default handleApiRequests
