import { createApp } from "vinxi";
import { preact } from "@preact/preset-vite";
import { MyFileSystemRouter } from "./router";
import path from "path";

export const createFrameworkApp = () => {
  return createApp({
    routers: [
      {
        name: "public",
        type: "static",
        dir: "./public",
      },
      {
        name: "lazy",
        type: "static",
        dir: "./_build/@fs",
      },
      {
        name: "client",
        type: "client",
        handler: "./app/entry-client.tsx",
        routes: (router, app) => {
          return new MyFileSystemRouter(
            {
              dir: path.join(path.resolve(path.dirname('')), "./app/src"),
              extensions: ["jsx", "js", "tsx", "ts"],
            },
            router,
            app
          );
        },
        plugins: () => [preact()],
        target: "browser",
        base: "/_build",
      },
      {
        name: "ssr",
        type: "http",
        handler: "./app/entry-server.tsx",
        routes: (router, app) => {
          return new MyFileSystemRouter(
            {
              dir: path.join(path.resolve(path.dirname('')), "./app/src"),
              extensions: ["jsx", "js", "tsx", "ts"],
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
