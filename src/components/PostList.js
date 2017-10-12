import React from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from '../flows/actions'
import Card, {CardHeader} from 'material-ui/Card'
import moment from 'moment'
import {CircularProgress} from 'material-ui/Progress'
import Badge from 'material-ui/Badge'
import ThumbUp from 'material-ui-icons/ThumbUp'
import {CardContent} from 'material-ui'
import {withStyles} from 'material-ui/styles'

const centerStyle = {
  margin: '20px auto',
  width: '50px',
  display: 'block',
}

const badgeStyle = theme => ({
  badge: {
    right: "-24px",
  }
})

function Post(props) {
  const post = props.post,
    date = new Date(post.timestamp)

  function subheader(post) {
    return `by ${post.author} - ${moment(date).format("MMM Do YYYY")}`
  }
  const StyledBadge = withStyles(badgeStyle)(Badge)

  return <div>
    <Card className="post">
      <CardHeader
        title={post.title}
        subheader={subheader(post)}
      />
      <CardContent>
        <StyledBadge badgeContent={post.voteScore} color="primary">
          <ThumbUp/>
        </StyledBadge>
      </CardContent>
    </Card>
  </div>
}

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPosts(this.props.currentCategory)
  }

  render() {
    const {posts, status, message} = this.props.posts

    return (
      <div>
        {message ? <div className={[status, 'message']}>{message}</div> : ''}
        {status === 'downloading' ? <CircularProgress style={centerStyle} size={50}/> : ''}
        {posts ? posts.map(post => (
          <Post post={post} key={post.id}/>
        )) : ''}

      </div>

    )
  }
}

function mapStateToProps(state) {
  // subscribe to store changes - when they happen, put them in the component store
  return {
    posts: state.posts,
    currentCategory: state.categories.current,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(
      fetchPosts() // get all the posts
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostList)
