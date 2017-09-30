import React from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from '../flows/actions'


class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    console.log(this.props.posts)
    const {posts, status, message} = this.props.posts

    console.log(posts)
    return (
      <div>
        {message?<div className={[status, 'message']}>{message}</div>:''}
        {posts?posts.map(post => (
          <div className="post" key={post.id}>
            <h1>{post.title}</h1>
            by {post.author}
          </div>
        )):''}

      </div>

    )
  }
}

function mapStateToProps({posts}) {
  // subscribe to store changes - when they happen, put them in the component store
  return {posts}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(
      fetchPosts() // dispatch the action
    ) // get all the posts
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostList)
