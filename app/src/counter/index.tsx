import Counter from './Counter'

export const loader = async () => {
  const posts = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json() as {title: string, body: string }[]
  return {
    posts: posts.slice(2)
  }
}

export default Counter
