import React from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../flows/actions'
import {Tab, Tabs} from 'material-ui'
import withRouter from 'react-router-dom/es/withRouter'
import {LinearProgress} from 'material-ui/Progress'
import Message from './Message'
import * as actions from '../flows/actions'

class CategoryList extends React.Component {
  componentDidMount() {
    if (this.props.categories.status !== 'success')
      this.props.fetchCategories()
  }

  changeTab = (event, nextCategory) => {
    this.props.history.push(`/category/${nextCategory}`)
    const currentCategory = this.props.categories.current
    if (currentCategory !== nextCategory)
      this.props.changeCategory(nextCategory)
  }

  render() {
    const {categories, status, message, current} = this.props.categories
    if (message) return <Message status={status} message={message}/>
    if (status === 'downloading') return <LinearProgress/>
    if (status !== 'success') return null
    return (
      <div>
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
    changeCategory: (category) => dispatch(
      actions.changeCategory(category),
    ),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryList))
