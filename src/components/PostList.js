import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../flows/actions'
import Card, {CardHeader} from 'material-ui/Card'
import moment from 'moment'
import {CircularProgress} from 'material-ui/Progress'
import Badge from 'material-ui/Badge'
import ThumbUp from 'material-ui-icons/ThumbUp'
import {CardContent} from 'material-ui'
import {withStyles} from 'material-ui/styles'
import sortBy from 'sort-by'
import SortBar from './SortBar'
import Message from './Message'

const centerStyle = {
  margin: '20px auto',
  width: '50px',
  display: 'block',
}

const badgeStyle = theme => ({
  badge: {
    top: 0,
    right: "-24px",
  },
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
    const {posts, status, message} = this.props.posts,
      {currentSort, currentSortDirection} = this.props
    let sortedPosts = []
    if (posts) {
      // sort the posts
      const sortField = currentSort === 'date' ? 'timestamp' : 'voteScore'
      const sortKey = (currentSortDirection === 'desc' ? '-' : '') + sortField
      sortedPosts = posts.sort(sortBy(sortKey))
    }
    const Sorted = posts ? <div>
      {sortedPosts.map(post => ( <Post post={post} key={post.id}/> ))}
      <SortBar/>
    </div> : ''

    return (
      <div>
        {message ? <Message status={status} message={message}/> : ''}
        {status === 'downloading' ? <CircularProgress style={centerStyle} size={50}/> : ''}
        {status === 'success' ? Sorted : ''}
      </div>
    )
  }
}

function mapStateToProps(state) {
  // subscribe to store changes - when they happen, put them in the component store
  return {
    posts: state.posts,
    currentCategory: state.categories.current,
    currentSort: state.options.sort,
    currentSortDirection: state.options.sortDirection,
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
)(PostList)
