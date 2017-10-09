const api = "http://localhost:3001"


// Generate a unique token for authenticating with the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

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
