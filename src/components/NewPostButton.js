import React from 'react'
import {Button} from 'material-ui'
import {connect} from 'react-redux'
import {newPostModal, savePostModal} from '../flows/actions'

class NewPostButton extends React.Component {
  render() {
    return <Button onClick={this.props.newPostOpen}
                   raised color="primary">
      Add a new post
    </Button>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newPostOpen: () => {
      dispatch(newPostModal())
    },
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(NewPostButton)
