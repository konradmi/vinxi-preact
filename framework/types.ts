import { getManifest } from "vinxi/manifest"
import { NodeEventContext } from "vinxi/http"

export type Asset = {
  tag: 'script' | 'link' | 'style',
  attrs: {
    src?: string,
    type?: string,
    key?: string
    rel?: string
  },
  children: string
}

export type Manifest = ReturnType<typeof getManifest>

export type LazyComponent = {
  src: string;
  import: () => Promise<any>;
  require: () => any;
}

export class SSRRedirect extends Error {
  constructor(public to: string) {
    super(to)
  }
}

export type Loader = {
  src: string;
  require: () => { loader: () => Promise<any> };
}

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type Request = NodeEventContext["req"] & { params: Record<string, string>, query: URLSearchParams }
export type Response = NodeEventContext["res"]

