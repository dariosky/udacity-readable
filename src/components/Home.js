import React from 'react'
import PostList from './PostList'
import CategoryList from './CategoryList'
import {Typography} from 'material-ui'
import NewPostButton from './NewPostButton'
import EditPostDialog from './EditPostDialog'
import {connect} from 'react-redux'
import * as actions from '../flows/actions'

class Home extends React.Component {
  componentDidMount() {
    // setting the state category on component mount
    const
      category = this.props.match.params.category || 'all',
      stateCategory = this.props.categories.current

    if (stateCategory !== category) {
      console.log(`Changing category from ${stateCategory} to ${category}`)
      this.props.changeCategory(category)
    }
  }

  render() {
    return <div className="container">
      <Typography align="right">
        <NewPostButton/>
      </Typography>
      <CategoryList/>
      <PostList/>
      <EditPostDialog/>
    </div>
  }
}

function mapStateToProps({categories}) {
  return {categories}
}

function mapDispatchToProps(dispatch) {
  return {
    changeCategory: (nextCategory) => dispatch(
      actions.changeCategory(nextCategory),
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
