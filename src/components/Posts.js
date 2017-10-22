import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../flows/actions'
import Card, {CardHeader} from 'material-ui/Card'
import moment from 'moment'
import {CircularProgress} from 'material-ui/Progress'
import Badge from 'material-ui/Badge'
import {CardContent, Chip} from 'material-ui'
import {withStyles} from 'material-ui/styles'
import sortBy from 'sort-by'
import SortBar from './SortBar'
import Message from './Message'
import {Link} from 'react-router-dom'
import PostVotes from './PostVotes'

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

export const StyledBadge = withStyles(badgeStyle)(Badge)

export function subheader(post) {
  const date = new Date(post.timestamp)
  return `by ${post.author} - ${moment(date).format("MMM Do YYYY")}`
}

function Post(props) {
  const {post, category} = props

  return <div>
    <Card className="post">
      <Link to={`/category/${category}/${post.id}`}
            style={{'color': '#333', 'textDecoration': 'none'}}>
        <CardHeader
          style={{paddingBottom: 0}}
          title={post.title}
          subheader={[subheader(post), <Chip key="cat" label={post.category}/>]}
        />
      </Link>
      <CardContent style={{padding: "0 0 10px 0"}}>
        <PostVotes post={post}/>
      </CardContent>
    </Card>
  </div>
}

class PostList extends React.Component {
  render() {
    const {posts, status, message} = this.props.posts,
      {currentSort, currentSortDirection} = this.props
    if (status === 'downloading')
      return <CircularProgress style={centerStyle} size={50}/>
    if (message)
      return <Message status={status} message={message}/>
    if (!posts) return null

    // sort the posts
    const sortField = currentSort === 'date' ? 'timestamp' : 'voteScore'
    const sortKey = (currentSortDirection === 'desc' ? '-' : '') + sortField
    const sortedPosts = posts.sort(sortBy(sortKey))
    if (!posts.length)
      return <Message status="ok" message="There are no posts, create one"/>

    const Sorted = posts ? <div>
      {sortedPosts.map(post => ( <Post post={post}
                                       category={this.props.currentCategory}
                                       key={post.id}/> ))}
      <SortBar/>
    </div> : ''

    return (
      <div>
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
