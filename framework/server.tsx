// import preact from 'preact'
// import { eventHandler } from "vinxi/http"
// import { getManifest } from "vinxi/manifest"
// import { render } from "preact-render-to-string"
// import Document from "./Document"

// export const startServer = (app: preact.ComponentChildren) => {
//   return eventHandler(async (event) => {
//     const clientManifest = getManifest("client");
//     const clientHandler = clientManifest.inputs[clientManifest.handler]
//     const scriptSrc = clientHandler.output.path;

//     const renderedApp = render(
//       <Document>
//         {app}
//         <script type="module" src={scriptSrc} />
//       </Document>
//     );

//     event.node.res.setHeader("Content-Type", "text/html");
//     return renderedApp;
//   })
// }
