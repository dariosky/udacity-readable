import React from 'react'
import {connect} from 'react-redux'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,} from 'material-ui'
import * as actions from '../flows/actions'


class EditCommentDialog extends React.Component {
  constructor(props) {
    super()
    this.state = {body: props.body}
  }

  handleSave = () => {
    console.log('Saving comment', this.state.body)

    this.props.editComment(this.props.id, this.state.body)
    this.props.handleCancel()
  }

  handleChange = (event) => {
    // change a the field in the state
    this.setState(
      {[event.target.name]: event.target.value},
    )
  }


  render() {
    const {id} = this.props
    const {body} = this.state

    return <Dialog open={true}
                   onRequestClose={this.handleRequestClose}>
      <DialogTitle>Edit comment</DialogTitle>
      <DialogContent>
        <TextField
          name="body"
          label="Comment"
          value={body}
          onChange={this.handleChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={this.props.handleCancel}>
          Cancel
        </Button>
        <Button onClick={() => this.handleSave(id, body)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  }
}

export default connect(null, {editComment: actions.editComment})(EditCommentDialog)
