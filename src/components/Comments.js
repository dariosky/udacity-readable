import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../flows/actions'
import {
  Avatar,
  Card,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from 'material-ui'
import sortBy from 'sort-by'
import Message from './Message'
import FaceIcon from 'material-ui-icons/Face'
import DeleteIcon from 'material-ui-icons/Delete'
import moment from 'moment'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import EditCommentDialog from './EditCommentDialog'

function subheader(comment) {
  const date = new Date(comment.timestamp)
  return `by ${comment.author} - 
          ${moment(date).format("MMM Do YYYY")} - 
          ${comment.voteScore} votes`
}

class Comment extends React.Component {
  state = {editing: false}

  voteUp = () => {
    const {comment} = this.props
    this.props.voteComment(comment.id, actions.UP_VOTE)
  }

  voteDown = () => {
    const {comment} = this.props
    this.props.voteComment(comment.id, actions.DOWN_VOTE)
  }

  render() {
    const {comment} = this.props
    const {editing} = this.state
    const editForm = editing ? <EditCommentDialog
      id={comment.id} body={comment.body}
      handleCancel={() => this.setState({editing: false})}
    /> : ""
    return <ListItem>
      <Avatar>
        <FaceIcon/>
      </Avatar>
      <ListItemText primary={comment.body} secondary={subheader(comment)}/>

      <IconButton aria-label="Delete" onClick={() => this.props.deleteComment(comment.id)}>
        <DeleteIcon style={{color: "tomato"}}/>
      </IconButton>

      <IconButton aria-label="Edit" onClick={() => this.setState({editing: true})}>
        <ModeEditIcon/>
      </IconButton>

      <IconButton aria-label="VoteUp" onClick={this.voteUp}>
        <ThumbUp/>
      </IconButton>

      <IconButton aria-label="VoteDown" onClick={this.voteDown}>
        <ThumbDown/>
      </IconButton>

      {editForm}
    </ListItem>
  }
}

Comment = connect(
  null,
  {
    deleteComment: actions.deleteComment,
    voteComment: actions.voteComment,
    editComment: actions.editComment,
  },
)(Comment) // connect it

class CommentList extends React.Component {
  render() {
    let unsortedComments = this.props.comments
    if (!unsortedComments) return <LinearProgress/>
    if (unsortedComments.length === 0) return <Message
      type="subheading"
      message="There are no comments in this post yet"/>
    const comments = unsortedComments.sort(
      sortBy('-voteScore', '-timestamp'))
    return <Card>
      <Typography style={{padding: "15px"}}>
        {comments.length} comment{comments.length !== 1 ? "s" : ""}:
      </Typography>
      <List>
        {comments.map(comment => <Comment key={comment.id}
                                          comment={comment}/>)}
      </List>
    </Card>
  }
}

function mapStateToProps(state) {
  const postId = state.comments.id
  return {
    comments: state.comments[postId],
  }
}

export default connect(
  mapStateToProps,
)(CommentList)
