import { Router } from 'preact-router'
import { Suspense } from 'preact/compat'
import { RouteModule } from "vinxi/routes"
import lazyRoute from './lazyRoute'


type AppProps = {
  fileRoutes:RouteModule[],
  url?: string // url defined means SSR mode.
  serverManifest: any
  clientManifest: any
}
const App = ({ fileRoutes, url, clientManifest, serverManifest }: AppProps) => {
  return (
    <Suspense fallback='Loading.....'>
      <Router url={url}>
        {
          fileRoutes.map(route => {
            const Component = lazyRoute(route.$component, clientManifest, serverManifest )
            return <Component path={route.path} />
          })
        }
      </Router>
    </Suspense>
  )
}

export default App;
