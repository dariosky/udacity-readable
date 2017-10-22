import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../flows/actions'
import {Card, CardContent, CardHeader, Typography} from 'material-ui'
import {LinearProgress} from 'material-ui/Progress'
import Message from './Message'
import {StyledBadge, subheader} from './Posts'
import {ThumbUp} from 'material-ui-icons'
import CategoryList from './Categories'
import NewPostButton from './NewPostButton'
import EditPostDialog from './EditPostDialog'
import CommentList from './Comments'
import CommentForm from './CommentForm'

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

  render() {
    let state = this.props.state
    const {status, posts} = state.posts
    if (status === 'downloading') return <LinearProgress/>
    const postId = state.postDetail.id
    const currentPost = (posts || []).filter(post => post.id === postId)
    if (currentPost.length === 0)
      return <Message status="error" message="Post not found"/>

    const post = currentPost[0]
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

          <StyledBadge badgeContent={post.voteScore} color="primary">
            <ThumbUp/>
          </StyledBadge>
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
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps,
)(PostDetail)
