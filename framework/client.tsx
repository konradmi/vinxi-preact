import { hydrate } from 'preact'
import App from './App'
import fileRoutes from "vinxi/routes";
import { getManifest } from "vinxi/manifest";

const clientManifest = getManifest("client");
const serverManifest = getManifest("ssr");


export const startClient = () => {
  const root = document.getElementById('app')!

  hydrate(<App fileRoutes={fileRoutes} clientManifest={clientManifest} serverManifest={serverManifest}/>, root);
}
