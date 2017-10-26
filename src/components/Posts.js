import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../flows/actions'
import Card, {CardHeader} from 'material-ui/Card'
import moment from 'moment'
import {CircularProgress} from 'material-ui/Progress'
import {CardContent, Chip} from 'material-ui'
import sortBy from 'sort-by'
import SortBar from './SortBar'
import Message from './Message'
import {Link} from 'react-router-dom'
import PostSubBar from './PostSubBar'

const centerStyle = {
  margin: '20px auto',
  width: '50px',
  display: 'block',
}

export function subheader(post) {
  const date = new Date(post.timestamp)
  return `by ${post.author} - ${moment(date).format("MMM Do YYYY")}`
}

class Post extends React.Component {
  componentDidMount() {
    const {post, getPostComments, state} = this.props

    if (!state.comments[post.id]) {
      getPostComments(post.id)
    }
  }

  render() {
    const {post, category} = this.props

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
          <PostSubBar post={post}/>
        </CardContent>
      </Card>
    </div>
  }
}

Post = connect(
  (state) => {
    return {state}
  },
  {
    getPostComments: actions.getPostComments,
  })(Post)

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

export default connect(
  mapStateToProps,
  {
    fetchPosts: actions.fetchPosts,
  },
)(PostList)
