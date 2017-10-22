import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../flows/actions'
import {Avatar, IconButton, LinearProgress, List, ListItem, ListItemText} from 'material-ui'
import sortBy from 'sort-by'
import Message from './Message'
import FaceIcon from 'material-ui-icons/Face'
import DeleteIcon from 'material-ui-icons/Delete'
import moment from 'moment'

function subheader(comment) {
  const date = new Date(comment.timestamp)
  return `by ${comment.author} - ${moment(date).format("MMM Do YYYY")}`
}

class Comment extends React.Component {
  render() {
    const {comment} = this.props

    return <ListItem>
      <Avatar>
        <FaceIcon/>
      </Avatar>
      <ListItemText primary={comment.body} secondary={subheader(comment)}/>
      <IconButton aria-label="Delete" onClick={() => this.props.deleteComment(comment.id)}>
        <DeleteIcon/>
      </IconButton>
    </ListItem>
  }
}

Comment = connect(
  null,
  dispatch => {
    return {
      deleteComment: id => dispatch(actions.deleteComment(id)),
    }
  },
)(Comment) // connect it

class CommentList extends React.Component {
  render() {
    let unsortedComments = this.props.comments
    if (unsortedComments === null) return <LinearProgress/>
    if (unsortedComments.length === 0) return <Message
      type="subheading"
      message="There are no comments in this post yet"/>
    const comments = unsortedComments.sort(
      sortBy('-voteScore', '-timestamp'))
    return <div>
      <List>
        {comments.map(comment => <Comment key={comment.id}
                                          comment={comment}/>)}
      </List>
    </div>
  }
}

function mapStateToProps(state) {
  // subscribe to store changes - when they happen, put them in the component store
  return {
    comments: state.postDetail.comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(
      actions.fetchPosts() // get all the posts
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentList)
