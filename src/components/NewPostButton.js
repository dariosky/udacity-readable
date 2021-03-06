import React from 'react'
import {Button} from 'material-ui'
import {connect} from 'react-redux'
import * as actions from '../flows/actions'
import AddIcon from 'material-ui-icons/Add'
import ModeEditIcon from 'material-ui-icons/ModeEdit'

const style = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
}

class NewPostButton extends React.Component {
  handleClick = () => {
    const post = this.props.post || {
      author: "",
      body: "",
      title: "",
      category: this.props.currentCategory, // new post with current
    }
    this.props.newPostModal(post)
  }

  render() {
    const isNew = !this.props.post
    return <Button fab
                   onClick={this.handleClick}
                   color="primary"
                   aria-label="add"
                   style={style}
    >
      {isNew ? <AddIcon/> : <ModeEditIcon/>}
    </Button>
  }
}

const mapStateToProps = state => {
  return {
    currentCategory: state.categories.current,
  }
}

export default connect(
  mapStateToProps,
  {newPostModal: actions.newPostModal},
)(NewPostButton)
