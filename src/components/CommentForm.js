import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../flows/actions'
import {Card, CardContent, CardActions, Typography, TextField, Button} from 'material-ui'

class CommentForm extends React.Component {
  state = {author: "", body: ""}

  handleChange = (e) => {
    const field = e.target.name,
      value = e.target.value
    this.setState({[field]: value})
  }

  postComment = () => {
    const {author, body} = this.state
    this.props.postComment({
      parentId: this.props.postId,
      author, body,
    })
    this.setState({ //reset the state
      author: "",
      body: "",
    })
  }

  render() {
    const {author, body} = this.state
    return <Card style={{margin: "15px 0"}}>
      <CardContent>
        <Typography type="body1">
          Add a new comment
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            id="author"
            name="author"
            label="Author"
            value={author}
            onChange={this.handleChange}
            margin="normal"
            fullWidth
          />

          <TextField
            id="body"
            name="body"
            label="Comment"
            value={body}
            onChange={this.handleChange}
            margin="normal"
            fullWidth
          />
        </form>
      </CardContent>
      <CardActions>
        <Button onClick={this.postComment}>
          Post Comment
        </Button>
      </CardActions>
    </Card>
  }
}

function mapStateToProps(state) {
  return {postId: state.postDetail.id}
}

function mapDispatchToProps(dispatch) {
  return {
    postComment: (comment) => dispatch(
      actions.postComment(comment),
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
