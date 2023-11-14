import { getPostData } from '@/utils'

export default async function Post({ params }) {
  const slug = params.post
  const post = await getPostData(slug)
  console.log(post)

  return (
    <div>
      <img src={post.image} alt='' />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
