import { createApp } from "vinxi";
import { preact } from "@preact/preset-vite";
import { MyFileSystemRouter } from "./fsRouter";
import { ApiRoutesRouting } from "./apiRouter";
import path from "path";
import { serverFunctions } from "@vinxi/server-functions/plugin";

export const createFrameworkApp = () => {
  return createApp({
    routers: [
      {
        name: "public",
        type: "static",
        dir: "./app/public",
      },
      {
        name: "client",
        type: "client",
        handler: "./app/entry-client.tsx",
        routes: (router, app) => {
          return new MyFileSystemRouter(
            {
              dir: path.join(path.resolve(path.dirname('')), "./app/src/routes"),
              extensions: ["jsx", "tsx"],
            },
            router,
            app
          );
        },
        plugins: () => [preact(), serverFunctions.client()],
        target: "browser",
        base: "/_build",
      },
      serverFunctions.router(),
      {
        name: "api",
        type: "http",
        handler: "./framework/entry-api.ts",
        base: "/api",
        routes: (router, app) => {
          return new ApiRoutesRouting(
            {
              dir: path.join(path.resolve(path.dirname('')), "./app/src/routes/api"),
              extensions: ["ts", "js"],
            },
            router,
            app
          );
        },
        target: "server",
      },
      {
        name: "ssr",
        type: "http",
        handler: "./app/entry-server.tsx",
        routes: (router, app) => {
          return new MyFileSystemRouter(
            {
              dir: path.join(path.resolve(path.dirname('')), "./app/src/routes"),
              extensions: ["jsx", "tsx"],
            },
            router,
            app
          );
        },
        plugins: () => [preact()],
        target: "server",
      },
    ],
  })
}
