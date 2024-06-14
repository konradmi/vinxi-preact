import { createElement } from 'preact'

import type { Asset } from './types.ts'

export const renderAssets = (assets: Asset[]) => {
  return assets.map(asset => {
    if (asset.tag === 'script') {
      return createElement('script', { src: asset.attrs.src, type: asset.attrs.type })
    } else if (asset.tag === 'link') {
      return createElement('link', { href: asset.attrs.src, type: asset.attrs.type })
    }
  })
}
