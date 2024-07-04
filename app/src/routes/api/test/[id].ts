import { Request, Response } from '../../../../../framework/types'

export const GET = async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  const posts = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json() as {title: string, body: string }[]
  return {
    posts: posts.slice(2)
  }
}
