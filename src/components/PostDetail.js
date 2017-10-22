import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../flows/actions'
import {Button, Card, CardContent, CardHeader, LinearProgress, Typography,} from 'material-ui'
import Message from './Message'
import {subheader} from './Posts'
import CategoryList from './Categories'
import NewPostButton from './NewPostButton'
import EditPostDialog from './EditPostDialog'
import CommentList from './Comments'
import CommentForm from './CommentForm'
import PostVotes from './PostVotes'
import DeleteIcon from 'material-ui-icons/Delete'
import withRouter from 'react-router-dom/es/withRouter'

class PostDetail extends React.Component {
  componentDidMount() {
    const
      category = this.props.match.params.category || 'all',
      stateCategory = this.props.state.categories.current

    if (stateCategory !== category)
      this.props.changeCategory(category)

    const postId = this.props.match.params.postId,
      statePostId = this.props.state.postDetail.id

    if (postId !== statePostId)
      this.props.changePost(postId)
  }

  handleDelete = () => {
    const postDetail = this.props.state.postDetail
    this.props.deletePost(postDetail.id)
    const post = this.getCurrentPost(),
      history = this.props.history

    history.push(`/category/${post.category}`)
  }

  getCurrentPost = () => {
    let state = this.props.state
    const postId = state.postDetail.id
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

          <PostVotes post={post}/>

          <Button fab
                  aria-label="Delete"
                  style={{
                    position: "absolute",
                    right: 60,
                  }}
                  onClick={this.handleDelete}>
            <DeleteIcon style={{color: "tomato"}}/>
          </Button>
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

function mapStateToProps(state) {
  // subscribe to store changes - when they happen, put them in the component store
  return {state}
}


function mapDispatchToProps(dispatch) {
  return {
    changePost: (postId) => dispatch(
      actions.changePost(postId),
    ),
    changeCategory: (nextCategory) => dispatch(
      actions.changeCategory(nextCategory),
    ),
    deletePost: (postId) => dispatch(
      actions.deletePost(postId),
    ),
  }
}

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps,
)(PostDetail))
