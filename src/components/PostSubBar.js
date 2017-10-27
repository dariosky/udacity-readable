import React from 'react'
import {connect} from 'react-redux'
import {Button, CircularProgress} from 'material-ui'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import * as actions from '../flows/actions'
import EditIcon from 'material-ui-icons/Edit'
import DeleteIcon from 'material-ui-icons/Delete'

const centerStyle = {
  minHeight: "36px",
  display: "inline-block",
  padding: "11px 5px",
  verticalAlign: "top",
}

class CommentCounts extends React.Component {
  render() {
    const {post} = this.props,
      comments = this.props.comments[post.id]

    if (!comments)
      return <CircularProgress style={centerStyle} size={10}/>
    else
      return <span style={centerStyle}>
    {comments.length} comments
    </span>
  }
}

CommentCounts = connect(
  state => {
    return {comments: state.comments}
  },
)(CommentCounts)

class PostSubBar extends React.Component {
  handleDelete = () => {
    this.props.deletePost(this.props.post.id)

    // callback after deletion
    if (this.props.redirect) this.props.redirect()
  }

  render() {
    const post = this.props.post

    return <div>
      <Button onClick={() => this.props.votePost(
        post.id, actions.UP_VOTE,
      )}><ThumbUp/></Button>
      <Button onClick={() => this.props.votePost(
        post.id, actions.DOWN_VOTE,
      )}><ThumbDown/></Button>
      <span style={centerStyle}>
        {post.voteScore} votes
      </span>
      <CommentCounts post={post}/>

      <Button aria-label="Delete" onClick={this.handleDelete}>
        <DeleteIcon style={{color: "tomato"}}/>
      </Button>

      <Button onClick={() => this.props.newPostModal(post)}>
        <EditIcon/>
      </Button>
    </div>
  }
}

export default connect(
  null,
  {
    votePost: actions.votePost,
    newPostModal: actions.newPostModal,
    deletePost: actions.deletePost,
  },
)(PostSubBar)
