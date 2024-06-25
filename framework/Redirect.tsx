import { route } from 'preact-router'

import { SSRRedirect } from './types'

const Redirect = ({ to, replace = true }: { to: string, replace?: boolean }) => {
  if (import.meta.env.SSR) {
    throw new SSRRedirect(to)
  } else {
    route(to, replace)
  }

  return <div/>
}

export default Redirect
