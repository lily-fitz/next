import { createClient, groq } from 'next-sanity'

const clientconfig = {
  projectId: 'lo0hknoz',
  dataset: 'production',
  apiVersion: '2023-11-14',
  useCDN: false,
}

export async function getPosts() {
  const client = createClient(clientconfig)
  const response = await client.fetch(
    groq`*[_type == "post"]{
            _id,
            _createdAt,
            title,
            "author": author->name,
            "image": mainImage.asset->url,
            "slug": slug.current
        }`
  )
  return response
}

export async function getPostData(slug) {
  const client = createClient(clientconfig)
  const response = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
            _createdAt,
            title,
            "image": mainImage.asset->url,
            "slug": slug.current,
            "content": body[].children[].text
        }`,
    { slug }
  )

  return response
}
