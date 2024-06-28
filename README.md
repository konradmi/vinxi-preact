# vinxi-preact

A small PoC Preact metaframework built on top of Vinxi.

## How to use

1. Clone the repository
2. Run `yarn install`
3. Include your routes in the `app/src/routes` folder
  - All `.tsx` files are exposed as routes
  - `/posts/index.tsx` and `/posts.tsx` are equivalent
  - route params are supported via `[param]` syntax in the folder name
  - to preload data, export a `loader` function in the route file. This function will be called both on the server and the client
4. Run `yarn start`
