import { eventHandler } from "vinxi/http"
import { getManifest } from "vinxi/manifest"
import { renderToStringAsync } from "preact-render-to-string"
import Document from "./Document"
import App from "./App"
import { createAssets } from './assets' 
import type { Asset } from "./types";

export const startServer = () => eventHandler(async (event) => {
  const clientManifest = getManifest("client");

  const clientHandler = clientManifest.inputs[clientManifest.handler]
  const scriptSrc = clientHandler.output.path;

  const manifest = await clientManifest.json()
  
  const Assets = createAssets(
    getManifest("client").handler,
    clientManifest,
  )

  const renderedApp = await renderToStringAsync(
    <Document manifest={manifest} assets={<Assets/>}>
      <App url={event.node.req.url}/>
      <script type="module" src={scriptSrc} />
    </Document>
  );

  event.node.res.setHeader("Content-Type", "text/html");
  return renderedApp;
})
