import React from 'react'
import PostList from './Posts'
import CategoryList from './Categories'
import {Typography} from 'material-ui'
import NewPostButton from './NewPostButton'
import EditPostDialog from './EditPostDialog'
import {connect} from 'react-redux'
import * as actions from '../flows/actions'

class Home extends React.Component {
  componentWillReceiveProps(props) {
    const
      category = props.match.params.category || 'all',
      stateCategory = props.categories.current

    if (stateCategory !== category) {
      // console.debug(`Willprop change category from ${stateCategory} to ${category}`)
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
