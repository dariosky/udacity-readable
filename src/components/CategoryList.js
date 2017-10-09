import React from 'react'
import {connect} from 'react-redux'
import {changeCategory, fetchCategories, fetchPosts} from '../flows/actions'
import {Tab, Tabs} from 'material-ui'
import withRouter from 'react-router-dom/es/withRouter'
import {LinearProgress} from 'material-ui/Progress'

class CategoryList extends React.Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  changeTab = (event, nextCategory) => {
    this.props.history.push(`/category/${nextCategory}`)
    if (this.props.categories.current !== nextCategory) {
      this.props.changeCategory(nextCategory)
      this.props.fetchPosts(nextCategory)
    }
  }

  render() {
    const {categories, status, message, current} = this.props.categories
    return (
      <div>
        {message ? <div className={[status, 'message']}>{message}</div> : ''}
        {status === 'downloading' ? <LinearProgress/> : ''}
        <Tabs
          value={current || 'all'}
          indicatorColor="primary"
          textColor="primary"
          scrollable
          scrollButtons="auto"
          onChange={this.changeTab}
        >
          <Tab value="all" label="All Categories"/>
          {categories ? categories.map(category => (
            <Tab label={category.name} value={category.path}
                 key={category.path}/>
          )) : ""}

        </Tabs>
      </div>
    )

  }
}

function mapStateToProps({categories}) {
  // subscribe to store changes - when they happen, put them in the component store
  return {categories}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(
      fetchCategories() // get all the categories
    ),

    changeCategory: (nextCategory) => dispatch(
      changeCategory(nextCategory),
    ),

    fetchPosts: (nextCategory) => dispatch(
      fetchPosts(nextCategory),
    ),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryList))
