import React from 'react'
import PostList from './PostList'
import CategoryList from './CategoryList'
import {Typography} from 'material-ui'
import NewPostButton from './NewPostButton'

export default function Home() {
  return <div className="container">
    <Typography align="right">
      <NewPostButton/>
    </Typography>
    <CategoryList/>
    <PostList/>
  </div>
}


