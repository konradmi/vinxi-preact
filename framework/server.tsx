import { eventHandler } from "vinxi/http"
import { getManifest } from "vinxi/manifest"
import fileRoutes from "vinxi/routes";
import { render } from "preact-render-to-string"
import Document from "./Document"

export const startServer = () => eventHandler(async (event) => {
  const clientManifest = getManifest("client");
  const clientHandler = clientManifest.inputs[clientManifest.handler]
  const scriptSrc = clientHandler.output.path;

  const routes = fileRoutes.map(route => {
    return {
      ...route,
      component: route.$component
    };
  });

  const routeToRender = routes.find(route => route.path === event.path);
  
  if (!routeToRender) {
    event.node.res.statusCode = 404;
    return event.node.res.end("404");
  }

  const ComponentToRender = (await routeToRender.component.import()).default

  const renderedApp = render(
    <Document>
      <ComponentToRender />
      <script type="module" src={scriptSrc} />
    </Document>
  );

  event.node.res.setHeader("Content-Type", "text/html");
  return renderedApp;
})
