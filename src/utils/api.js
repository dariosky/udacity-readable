const api = "http://localhost:3001"


// Generate a unique token for authenticating with the backend server.
let token = localStorage.token
let getRandomString = function (length) {
  return Math.random().toString(36).substr(-length)
}

if (!token)
  token = localStorage.token = getRandomString(8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
}

export const allPosts = () =>
  fetch(`${api}/posts`, {headers})
    .then(res => res.json())

const getCategoryPosts = (category) =>
  fetch(`${api}/${category}/posts`, {headers})
    .then(res => res.json())


export const getPosts = (category) => {
  if (category === 'all') return allPosts()
  else {
    return getCategoryPosts(category)
  }
}

export const allCategories = () =>
  fetch(`${api}/categories`, {headers})
    .then(res => res.json())

export const savePost = (post) => {
  const isNew = !post.id,
    url = isNew ? '/posts' : `/posts/${post.id}`,
    method = isNew ? 'post' : 'put'
  const payload = isNew ? {
      id: getRandomString(5),
      timestamp: Date.now(),
      ...post// give the whole post for creation
    } :
    {
      title: post.title,
      body: post.body,
    }

  return fetch(`${api}${url}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    method,
    body: JSON.stringify(payload),
  })
    .then(async res => {
      const json = await res.json()
      return {
        ...payload, ...json  // return the post we built with the server answer
      }
    })
}

export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, {headers})
    .then(res => res.json())

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'DELETE',
  })
    .then(res => res.json())

export const postComment = (comment) =>
  fetch(`${api}/comments`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({
      id: getRandomString(5),
      timestamp: Date.now(),
      ...comment
    }),
  })
    .then(res => res.json())

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'DELETE',
  })
    .then(res => res.json())

export const votePost = (postId, vote) =>
  fetch(`${api}/posts/${postId}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({
      option: vote,
    }),
  })
    .then(res => res.json())

export const voteComment = (commentId, vote) =>
  fetch(`${api}/comments/${commentId}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({
      option: vote,
    }),
  })
    .then(res => res.json())
