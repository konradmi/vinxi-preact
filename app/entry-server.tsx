import Counter from './Counter'
import { eventHandler } from "vinxi/http"
import { getManifest } from "vinxi/manifest"
import { render } from "preact-render-to-string"
import Document from "../framework/Document"

export default eventHandler(async (event) => {
  const clientManifest = getManifest("client");
  const clientHandler = clientManifest.inputs[clientManifest.handler]
  const scriptSrc = clientHandler.output.path;

  const renderedApp = render(
    <Document>
      <Counter />
      <script type="module" src={scriptSrc} />
    </Document>
  );

  event.node.res.setHeader("Content-Type", "text/html");
  return renderedApp;
})
