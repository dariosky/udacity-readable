import React from 'react'
import PostList from './PostList'
import CategoryList from './CategoryList'
import {Typography} from 'material-ui'
import NewPostButton from './NewPostButton'
import EditPostDialog from './EditPostDialog'
import {connect} from 'react-redux'
import * as actions from '../flows/actions'

class Home extends React.Component {
  componentWillReceiveProps(nextProps) {
    const
      currentCategory = this.props.match.params.category,
      nextCategory = nextProps.match.params.category,
      stateCategory = this.props.categories.current

    if (stateCategory !== nextCategory) {
      // TODO: Fix: action is fired twice
      console.log("category", currentCategory, nextCategory,
        stateCategory)
      console.log("Changing to category", nextCategory)
      this.props.changeCategory(nextCategory)
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
