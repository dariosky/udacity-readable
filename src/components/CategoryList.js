import React from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../flows/actions'
import {Tabs, Tab} from 'material-ui'
import withRouter from 'react-router-dom/es/withRouter'


class CategoryList extends React.Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  changeTab = (event, value) => {
    this.props.history.push(`/category/${value}`)
  }

  render() {
    const {categories, status, message, currentCategory} = this.props.categories
    return (
      <div>
        {message ? <div className={[status, 'message']}>{message}</div> : ''}
        <Tabs
          value={currentCategory || 'all'}
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
          )) : ''}

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
      fetchCategories() // dispatch the action
    ) // get all the categories
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryList))
