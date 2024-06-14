export type Asset = {
  tag: 'script' | 'link',
  attrs: {
    src: string,
    type: string,
  }
}
