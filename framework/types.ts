import { getManifest } from "vinxi/manifest"

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
