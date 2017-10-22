import React from 'react'
import {connect} from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui'
import * as actions from '../flows/actions'
import {withResponsiveFullScreen} from 'material-ui/Dialog'
import PostForm from './PostForm'


class EditPostDialog extends React.Component {

  handleSave = (post) => {
    console.log('Saving post', post)

    this.props.savePost(post)
  }

  handleCancel = () => {
    this.props.cancelPost()
  }

  submit = () => {
    const form = this.form.getWrappedInstance()
    form.submit()
  }

  render() {
    const {post} = this.props
    const title = post && post.id ? 'Edit Post' : 'New Post'
    return <Dialog open={this.props.open}
                   onRequestClose={this.handleRequestClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          this project should be called Writeble
        </DialogContentText>
        <PostForm
          ref={(node) => {
            this.form = node
          }}
          post={post}
          onSubmit={this.handleSave}
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleCancel}>
          Cancel
        </Button>
        <Button onClick={this.submit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.edit,
    open: !!state.posts.edit,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    savePost: (post) => dispatch(
      actions.savePostModal(post),
    ),
    cancelPost: () => dispatch(
      actions.cancelPostModal(),
    ),
  }
}

export default withResponsiveFullScreen()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EditPostDialog))

