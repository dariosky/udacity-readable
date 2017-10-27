import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../flows/actions'
import {Card, CardContent, CardHeader, LinearProgress, Typography,} from 'material-ui'
import Message from './Message'
import {subheader} from './Posts'
import CategoryList from './Categories'
import NewPostButton from './NewPostButton'
import EditPostDialog from './EditPostDialog'
import CommentList from './Comments'
import CommentForm from './CommentForm'
import PostSubBar from './PostSubBar'
import withRouter from 'react-router-dom/es/withRouter'

class PostDetail extends React.Component {
  componentDidMount() {
    const
      category = this.props.match.params.category || 'all',
      stateCategory = this.props.state.categories.current

    if (stateCategory !== category)
      this.props.changeCategory(category)

    const postId = this.props.match.params.postId,
      statePostId = this.props.state.comments.id

    if (postId !== statePostId)
      this.props.changePost(postId)
    if (!this.props.state.comments[postId])
      this.props.getPostComments(postId)
  }

  redirectToCategory = () => {
    const post = this.getCurrentPost(),
      history = this.props.history
    history.push(`/category/${post.category}`)
  }

  getCurrentPost = () => {
    let state = this.props.state
    const postId = state.comments.id
    const {posts} = state.posts
    const currentPost = (posts || []).filter(post => post.id === postId)
    if (currentPost.length === 0)
      return null

    return currentPost[0]
  }

  render() {
    let state = this.props.state
    const {status} = state.posts
    if (status === 'downloading') return <LinearProgress/>
    const post = this.getCurrentPost()
    if (!post) return <Message status="error" message="Post not found"/>

    return <div className="container">
      <CategoryList/>
      <Card className="post">
        <CardHeader
          title={post.title}
          subheader={subheader(post)}
        />
        <CardContent>
          <Typography gutterBottom={true} paragraph={true}>
            {post.body}
          </Typography>

          <PostSubBar post={post}
                      redirect={this.redirectToCategory}/>
        </CardContent>
      </Card>

      <CommentForm/>

      <CommentList/>

      <EditPostDialog/>

      <Typography align="right">
        <NewPostButton post={post}/>
      </Typography>

    </div>
  }
}

export default withRouter(connect(
  state => {
    return {state}
  },
  {
    changePost: actions.changePost,
    changeCategory: actions.changeCategory,
    deletePost: actions.deletePost,
    getPostComments: actions.getPostComments,
  },
)(PostDetail))
