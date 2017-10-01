import React from 'react'
import PostList from './PostList'

export function Home() {
  return <div className="container">
    <p>Welcome to readable!</p>
    <p>A React-redux place for post-comments-categories </p>
    <PostList/>
  </div>
}
