import React from 'react'
import {Paper, Typography} from 'material-ui'

const style = {
  padding: 16,
}

class Message extends React.Component {
  render() {
    const {status, message} = this.props
    return <Paper elevation={4}>
      <Typography style={style} className={`message ${status}`}
                  type="headline" component="h3">
        {message}
      </Typography>
    </Paper>
  }
}

export default Message
