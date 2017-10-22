import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'material-ui'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import * as actions from '../flows/actions'


class PostVotes extends React.Component {
  render() {
    const post = this.props.post
    return <div>
      <Button onClick={() => this.props.votePost(
        post.id, actions.UP_VOTE,
      )}><ThumbUp/></Button>
      <Button onClick={() => this.props.votePost(
        post.id, actions.DOWN_VOTE,
      )}><ThumbDown/></Button>
      <span style={{
        minHeight: "36px",
        display: "inline-block",
        padding: "11px 5px",
        verticalAlign: "top",
      }}>{post.voteScore} votes</span>
    </div>
  }
}

export default connect(
  null,
  {votePost: actions.votePost},
)(PostVotes)
