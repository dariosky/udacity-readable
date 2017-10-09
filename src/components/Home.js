import React from 'react'
import PostList from './PostList'
import CategoryList from './CategoryList'

export default function Home() {
  return <div className="container">
    <CategoryList/>
    <PostList/>
  </div>
}


