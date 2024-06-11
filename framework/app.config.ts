import { createApp } from "vinxi";
import { preact } from "@preact/preset-vite";

export const createFrameworkApp = () => {
  return createApp({
    routers: [
      {
        name: "public",
        type: "static",
        dir: "./public",
      },
      {
        name: "ssr",
        type: "http",
        handler: "./app/entry-server.tsx",
        plugins: () => [preact()],
        target: "server",
      },
      {
        name: "client",
        type: "client",
        handler: "./app/entry-client.tsx",
        plugins: () => [preact()],
        target: "browser",
        base: "/_build",
      },
    ],
  })
}
