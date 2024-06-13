import preact from 'preact'
import { hydrate } from 'preact'

export const startClient = (app: preact.ComponentChildren) => {
  const root = document.getElementById('app')!
  hydrate(app, root);
}
